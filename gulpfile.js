/* jshint node: true */
/* jshint esversion: 6 */

'use strict';

/* =============================================================================
PLUGINS
============================================================================= */

const gulp = require('gulp'); // Gulp
const sassToCSS = require('gulp-sass'); // Compilador de SASS
const cssnano = require('gulp-cssnano'); // Minifica el CSS
const combinemq = require('gulp-combine-mq'); // Combina las Mediaqueries repetidas en una
const autoprefixer = require('gulp-autoprefixer'); // Autoprefixer para SASS
const del = require('del'); // Borra archivos
const critical = require('critical').stream; // Separa el CSS critico de la web y lo incrusta inline;
const imagemin = require('gulp-imagemin'); // Optimizar imágenes
const uglify = require('gulp-uglify'); // Minificar JS
const concat = require('gulp-concat'); // Concatena ficheros
const plumber = require('gulp-plumber'); // Evita que gulp para de ejecutarse cuando tiene un error
const browser = require('browser-sync').create(); // Servidor local, refresco automatico del navegador
const panini = require('panini'); // Simple html template engine generator
const sourcemaps = require('gulp-sourcemaps'); // Sourcemaps de Sass
const prettify = require('gulp-jsbeautifier'); // Ordena el HTML final
const markdownToHTML = require('gulp-markdown'); // Convierte Markdown en HTML
const replace = require('gulp-replace'); // Reemplaza strings, etc.
const gulpif = require('gulp-if'); // Condicional if en pipes
const argv = require('yargs').argv; // Pasar variables por consola

/* =============================================================================
TASKS
============================================================================= */

gulp.task('build',
    gulp.series(clean, markdown, gulp.parallel(pages, images, copy, scripts, documentationScripts), sass)
);

gulp.task('default',
    gulp.series('build', server, watch, function(done) {
        done();
    }
));

/* =============================================================================
FUNCTIONS
============================================================================= */

// Refresca el navegador
function reloadBrowser(done) {
  browser.reload();
  done();
}

// Elimina todo el contenido de dist y la documentacion de src
function clean(done) {
    del('dist/**/*');
    del('src/html/pages/documentation/**/*');
    done();
}

// Compila el HTML
function pages() {
    return gulp.src('src/html/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
        root: 'src/html/pages/',
        layouts: 'src/html/layouts/',
        pageLayouts: {
            'documentation': 'documentation'  // Se puede especificar el layout por carpetas
        },
        partials: 'src/html/partials/',
        helpers: 'src/html/helpers/',
        data: 'src/html/data/'
    })).pipe(prettify({
        max_preserve_newlines: 0
    }))
    .pipe(gulp.dest('dist/'));
}

// Carga las actualizaciones de los templates y los partials del HTML
function resetPages(done) {
    panini.refresh();
    done();
}

// Compila la documentación en Markdown a HTML
function markdown() {
    return gulp.src('docs/**/*.md')
    .pipe(markdownToHTML())
    .pipe(replace('&quot;', '"'))
    .pipe(replace('&#39;', "'"))
    .pipe(replace('<p>---', "---"))
    .pipe(replace('---</p>', "---"))
    .pipe(replace('<pre><code>', '<pre class="language-none"><code class="language-none">'))
    .pipe(replace(/<code class="(.*?)">/, function(match) {
            return match + '\n';
     }))
    .pipe(gulp.dest('src/html/pages/documentation/'));
}

// Compila el Sass a CSS
function sass() {
    return gulp.src([
        'src/assets/scss/main.scss',
        'src/assets/documentation/scss/documentation.scss'
    ])
    .pipe(gulpif(!argv.production, sourcemaps.init()))
    .pipe(sassToCSS()
    .on('error', sassToCSS.logError))
    .pipe(autoprefixer({
        browsers: ['last 10 versions']
    }))
    .pipe(gulpif(argv.production, combinemq({
        beautify: false
    })))
    .pipe(gulpif(argv.production, cssnano()))
    .pipe(gulpif(!argv.production, sourcemaps.write('.', { sourceRoot: '/' })))
    .pipe(plumber())
    .pipe(gulp.dest('dist/assets/css/'))
    .pipe(browser.reload({ stream: true }));
}

// Concatena y minifica los Scripts
function scripts() {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'src/assets/js/vendor/**/*.js',
        'src/assets/js/custom.js'
    ])
	.pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js/'));
}

// Concatena y minifica los Scripts de documentation
function documentationScripts() {
    return gulp.src([
        'bower_components/prism/prism.js',
        'bower_components/prism/plugins/toolbar/prism-toolbar.min.js',
        'bower_components/prism/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js',
        'bower_components/prism/plugins/normalize-whitespace/prism-normalize-whitespace.min.js',
        'bower_components/prism/components/prism-bash.min.js',
        'bower_components/prism/components/prism-scss.min.js',
        'bower_components/prism/components/prism-handlebars.min.js',
        'bower_components/prism/components/prism-markdown.min.js',
        'src/assets/documentation/js/documentation.js'
    ])
	.pipe(concat('documentation.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js/'));
}

// Optimiza las imágenes y las mueve a dist
function images() {
    return gulp.src('src/assets/img/**/*')
    .pipe(gulpif(argv.production, imagemin({
        progressive: true
    })))
    .pipe(gulp.dest('dist/assets/img/'));
}

// Copia todos los assets a dist, menos los que empiezan por !
function copy() {
    return gulp.src([
        'src/assets/**/*',
        '!src/assets/{img,scss,js,documentation}{,/**}'
    ])
    .pipe(gulp.dest('dist/assets/'));
}

// Lanza el servidor con BrowserSync
function server(done) {
    browser.init({
        server: {
            baseDir: 'dist/'
        }
    });
    done();
}

// Detecta los cambios en vivo y llama a las funciones
function watch(done) {
    gulp.watch([
        'src/html/pages/**/*.{html,hbs,handlebars}',
        '!src/html/pages/documentation/**/*'
    ]).on('all', gulp.series(pages, reloadBrowser));
    gulp.watch('src/html/{layouts,partials}/**/*.{html,hbs,handlebars}').on('all', gulp.series(resetPages, pages, reloadBrowser));
    gulp.watch('docs/**/*.md').on('all', gulp.series(markdown, pages, reloadBrowser));
    gulp.watch([
        'src/assets/scss/**/*.scss',
        'src/assets/documentation/scss/**/*.scss',
    ]).on('all', gulp.series(sass));
    gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, reloadBrowser));
    gulp.watch([
        'src/assets/**/*',
        '!src/assets/{img,scss,js,documentation}{,/**}'
    ]).on('all', gulp.series(copy, reloadBrowser));
    gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(scripts, reloadBrowser));
    gulp.watch('src/assets/documentation/js/**/*.js').on('all', gulp.series(documentationScripts, reloadBrowser));
    done();
}