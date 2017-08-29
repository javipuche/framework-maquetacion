/* jshint node: true */
/* jshint esversion: 6 */

'use strict';

/* =============================================================================
PLUGINS
============================================================================= */

const gulp = require('gulp'); // Gulp
const del = require('del'); // Borra archivos
const imagemin = require('gulp-imagemin'); // Optimizar imágenes
const uglify = require('gulp-uglify'); // Minificar JS
const concat = require('gulp-concat'); // Concatena ficheros
const plumber = require('gulp-plumber'); // Evita que gulp para de ejecutarse cuando tiene un error
const browser = require('browser-sync').create(); // Servidor local, refresco automático del navegador
const panini = require('panini'); // Simple html template engine generator
const prettify = require('gulp-jsbeautifier'); // Ordena el HTML final
const gulpif = require('gulp-if'); // Condicional if en pipes
const argv = require('yargs').argv; // Pasar variables por consola
const compression = require('compression'); // Gzip
const babelify = require('babelify'); // Nueva sintaxis js
const browserify = require('browserify'); // Para crear modulos
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

// CSS
const sassToCSS = require('gulp-sass'); // Compilador de SASS
const sourcemaps = require('gulp-sourcemaps'); // Sourcemaps de SASS
const cssunit = require('gulp-css-unit'); // Convierte unidades
const postcss = require('gulp-postcss'); // Libreria necesaria para otros plugins
const autoprefixer = require('autoprefixer'); // Añade los prefijos necesarios a las propiedades CSS
const cssmqpacker = require('css-mqpacker'); // Junta las Mediaqueries y las mueve al final
const cssnano = require('cssnano'); // Minifica el CSS

/* =============================================================================
TASKS
============================================================================= */

gulp.task('build',
    gulp.series(clean, gulp.parallel(pages, scripts, images, copy, sass))
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
function clean() {
    return del('dist/**/*');
}

// Compila el HTML
function pages() {
    return gulp.src('src/html/pages/**/*.{html,hbs,handlebars,php}')
    .pipe(panini({
        root: 'src/html/pages/',
        layouts: 'src/html/layouts/',
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

// Compila el Sass a CSS
function sass() {

    let pluginsPostcss = [
        autoprefixer({
            browsers: ['last 4 versions']
        }),
        cssmqpacker({
            sort: true
        })
    ];

    if (argv.production) {
        let pluginsPostcssProduction = [
            cssnano({
                discardUnused: {
                    fontFace: false
                }
            })
        ];

        pluginsPostcss = pluginsPostcss.concat(pluginsPostcssProduction);
    }

    return gulp.src([
        'src/assets/scss/main.scss'
    ])
    .pipe(gulpif(!argv.production, sourcemaps.init()))
    .pipe(sassToCSS()
    .on('error', sassToCSS.logError))
    .pipe(postcss(pluginsPostcss))
    .pipe(gulpif(!argv.production, sourcemaps.write('.', { sourceRoot: '/' })))
    .pipe(plumber())
    .pipe(gulp.dest('dist/assets/css/'))
    .pipe(browser.reload({ stream: true }));
}

// Concatena y minifica los Scripts
function scripts() {
    return browserify({
        entries: ['src/assets/js/main.js'],
    }).transform(babelify, {presets: ["es2015", "es2016"]})
    .bundle()
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(gulpif(argv.production, uglify()))
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
        'src/assets/**/*.*',
        '!src/assets/{img,scss,js}{,/**}'
    ])
    .pipe(gulp.dest('dist/assets/'));
}

// Lanza el servidor con BrowserSync
function server(done) {
    browser.init({
        server: {
            baseDir: 'dist/',
            middleware: function(req, res, next) {
                if (argv.production) {
                    let gzip = compression();
                    gzip(req, res, next);
                } else {
                    next();
                }
            }
        }
    });
    done();
}

// Detecta los cambios en vivo y llama a las funciones
function watch(done) {
    gulp.watch('src/html/pages/**/*.{html,hbs,handlebars,php}').on('all', gulp.series(pages, reloadBrowser));
    gulp.watch([
        'src/html/{layouts,partials}/**/*.{html,hbs,handlebars}',
        'src/html/data/**/*.{json,yml}'
    ]).on('all', gulp.series(resetPages, pages, reloadBrowser));
    gulp.watch(['src/assets/scss/**/*.scss']).on('all', gulp.series(sass));
    gulp.watch('src/assets/img/**/*.{jpg,jpeg,png,gif,svg}').on('all', gulp.series(images, reloadBrowser));
    gulp.watch([
        'src/assets/**/*',
        '!src/assets/{img,scss,js}{,/**}'
    ]).on('all', gulp.series(copy, reloadBrowser));
    gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(scripts, reloadBrowser));
    done();
}