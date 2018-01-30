# Framework maquetación

Base para crear un framework a medida del proyecto. Se recomienda usarlo sólo para proyectos medianos/grandes y que tengan prevista una escalabilidad a lo largo del tiempo.

## Características

- Sistema de Templates para el HTML.
- Sistema de Arquitectura CSS.
- Babel para el JS.
- Optimización automática de imágenes.
- Minificado del CSS y JS.
- Ordena el HTML final.
- Pasa los px a rem.
- Autoprefixer para el CSS.
- Junta las Mediaqueries repetidas y las pone al final del archivo CSS.
- Abre un servidor con autorefresco cuando haces cambios.
- Puede simular que el servidor tiene gzip activado.

## Instalación

Antes de poder instalar lo necesario para el proyecto, es obligatorio realizar los siguientes requisitos.  

### Requisitos

- Node
- Gulp (Versión 4)

#### Node

Para instalar Node puedes descargarlo para los diferentes sistemas operativos aquí: [www.nodejs.org](https://nodejs.org/es/download/). Una vez descargado solo tienes que seguir el proceso de instalación de propio launcher.

#### Gulp

***Nota*** *Recuerda estar en el directorio del proyecto antes de hacer estos pasos.*

Si tenemos en nuestro ordenador la versión 3 de Gulp es necesario desinstalarla. Para comprobar si lo tenemos instalado usamos:

```bash
gulp -v
```

Si lo tenemos instalado aparecerá la versión de Gulp, en ese caso usamos los siguientes comandos:

```bash
npm rm -g gulp
```
```bash
npm uninstall gulp
```

Una vez eliminado, podemos proceder a instalar Gulp 4 mediante los siguientes comandos:

```bash
npm install -g gulp-cli
```
```bash
npm install gulpjs/gulp.git#4.0
```

##### Posibles errores

Si a la hora de instalar o ejecutar Gulp sale algún error referente a `/usr/local/share/man/man1/gulp.1` ejecutamos:

***Nota:*** *Puede que la ruta cambie dependiendo del sistema operativo.*

```bash
rm /usr/local/share/man/man1/gulp.1
```

También pueden aparecer otros errores como que alguna librería es antigua etc. En ese caso solo queda leer la consola e ir arreglando lo que pida.

### Librerías

Instalados los requisitos es necesario instalar todas las librerías que necesita el proyecto. Para ello debemos ejecutar en la terminal:

```bash
npm install
```

### Comandos básicos

Una vez instalado todo lo necesario podemos compilar y lanzar el servidor mediante:

**Entorno de Desarrollo**

```bash
gulp
```

**Entorno de Producción**

```bash
gulp --production
```

Si solo queremos compilar y no lanzar el servidor podemos usar:

**Entorno de Desarrollo**

```bash
gulp build
```

**Entorno de Producción**

```bash
gulp build --production
```

Podemos simular que el servidor tiene gzip activado con:

```bash
gulp --gzip
```

## HTML

Para el html usa un sistema de templates llamado Panini de ZURB, creadores de Foundation. Este a su vez se basa en el sistema de templates handlebars. Digamos que es un "añadido" que nos aporta muchas cosas útiles. Podemos hacer bucles, condicionales, usar diferentes layouts, etc. Puedes leer más en las [Referencias](#referencias).

## SCSS

### Estructura de archivos

**Settings**: Funciones y variables de configuración.
**Foundations**: Variables del proyectos.
**Tools**: Mixins de sass.
**Vendor**: SCSS/CSS de terceros y/o los estilos para sobreescribir a estos.
**Generic**: Estilos genéricos como las fuentes, resets, etc.
**Elements**: Estilos de los elementos html, las etiquetas en si. Ej: ```h1, p, a {...}```.
**Animations**: Animaciones CSS reutilizables.
**Objects**: Estilos abstractos que se podrían reutilizar en diferentes proyectos. Ej: ```.o-table {...}```.
**Componentes**: Estilos específicos de los componentes del proyecto. Ej: ```.c-btn {...}```.
**Scopes**: Estilos para elementos generados dinámicamente como un post de un blog. Ej: ```.s-cms {...}```.
**Utilities**: Clases de ayuda. Ej: ```.u-align-center```.

### Nomenclatura

#### Archivos

- Cada archivo que vaya a ser importado tiene que empezar un un guión bajo ```_```.
- Cuando se crea un archivo tiene que empezar por lo que es (normalmente el nombre del directorio) seguido de un punto (ej. ```_settings.```).
- Siempre en minúsculas y los espacios separados por un guión medio ```-```.
- Los nombres tienen que ser descriptivos de lo que contienen. Es recomendable usar el nombre de la clase css, a menos que haya más de una (ej. ```_components.buttons.scss```).

#### Prefijos

El proyecto usa un sistema de prefijos en las clases para poder saber que es ese elemento con un simple vistazo, así sabemos donde ir a buscar el archivo después.

- ```a-```: Animations
- ```o-```: Objects
- ```c-```: Components
- ```u-```: Utilities
- ```t-```: Themes
- ```s-```: Scopes
- ```is-```, ```has-```: Se utilizan para aplicar estilos concretos cuando se cumple un estado o una condición. Ej: ```.is-active {}, .has-icon {}```.
- ```js-``` Significa que este elemento es afectado por el javascript. Nunca se tienen que dar estilos a estas clases, son solo para identificar los elementos en el JS.
- ```_``` Prefijo de la vergüenza, se utiliza al principio de una clase cuando tienes que hacer alguna chapuza.

#### BEM

Todo lo anterior explicado se va a usar conjuntamente con la nomenclatura BEM (Bloque, Elemento, Modificador).

```css
.c-persona {} /* Seria el bloque */
.c-persona__mano {} /* Seria el elemento */
.c-persona__mano--derecha {} /* Seria el modificador */
```

Con este simple ejemplo queda claro que el bloque es la clase en si. El elemento se escribe con doble guión bajo ```__``` y el modificador se escribe con doble guión medio ```--```.

#### OOCSS

OOCSS es una metodología basada en objetos CSS. Resumiéndodolo mucho se trata de abstraer todo lo máximo posible para poder reaprovechar todo el código posible.

### Clases

#### Clases de Utilidad

Las clases de utilidad tienen la finalidad de ayudarte en momentos concretos donde no es necesario crear un componente pero necesitas colocar/modificar/etc algún componente. Es importante usarlas con moderación.

##### Widths

| __Nombre__          | __Propiedad CSS__        | __Descripción__       |
| ------------------- | ------------------------ | --------------------- |
| ```.u-[fraction]``` | ```width: [fraction];``` | Ejemplo: ```.u-1/5``` |

**Enable**: true
**Responsive**: true
**Default Fractions**: 1 2 3 4 5

##### Alignments

| __Nombre__            | __Propiedad CSS__         | __Descripción__ |
| --------------------- | ------------------------- | --------------- |
| ```.u-align-left```   | ```text-align: left;```   | -               |
| ```.u-align-center``` | ```text-align: center;``` | -               |
| ```.u-align-right```  | ```text-align: right;```  | -               |

**Enable**: true
**Responsive**: true

##### Colors

| __Nombre__                     | __Propiedad CSS__                      | __Descripción__                    |
| ------------------------------ | -------------------------------------- | ---------------------------------- |
| ```.u-color-[color-name]```    | ```color: [color-value];```            | Ejemplo: ```.u-color-primary```    |
| ```.u-bg-color-[color-name]``` | ```background-color: [color-value];``` | Ejemplo: ```.u-bg-color-primary``` |

**Enable**: true
**Responsive**: null

##### Borders

| __Nombre__                          | __Propiedad CSS__                             | __Descripción__                               |
| ----------------------------------- | --------------------------------------------- | --------------------------------------------- |
| ```.u-border-[color-name]```        | ```border: 1px solid [color-value];```        | Ejemplo: ```.u-border-primary```              |
| ```.u-border-top-[color-name]```    | ```border-top: 1px solid [color-value];```    | Ejemplo: ```.u-border-top-color-primary```    |
| ```.u-border-right-[color-name]```  | ```border-right: 1px solid [color-value];```  | Ejemplo: ```.u-border-right-color-primary```  |
| ```.u-border-bottom-[color-name]``` | ```border-bottom: 1px solid [color-value];``` | Ejemplo: ```.u-border-bottom-color-primary``` |
| ```.u-border-left-[color-name]```   | ```border-left: 1px solid [color-value];```   | Ejemplo: ```.u-border-left-color-primary```   |
| ```.u-border-color-[color-name]```  | ```border-color: [color-value];```            | Ejemplo: ```.u-border-color-primary```        |

**Enable**: true
**Responsive**: null

##### Display

| __Nombre__                    | __Propiedad CSS__            | __Descripción__ |
| ----------------------------- | ---------------------------- | --------------- |
| ```.u-display-none```         | ```display: none;```         | -               |
| ```.u-display-block```        | ```display: block;```        | -               |
| ```.u-display-inline-block``` | ```display: inline-block;``` | -               |

**Enable**: true
**Responsive**: true

##### Flex

| __Nombre__                   | __Propiedad CSS__                     | __Descripción__                                |
| ---------------------------- | ------------------------------------- | ---------------------------------------------- |
| ```.u-flex```                | ```display: flex;```                  | -                                              |
| ```.u-flex-inline```         | ```display: inline-flex;```           | -                                              |
| ```.u-flex-wrap```           | ```flex-wrap: wrap;```                | -                                              |
| ```.u-flex-wrap-reverse```   | ```flex-wrap: wrap-reverse;```        | Comentado por defecto, para usarlo descomentar |
| ```.u-flex-nowrap```         | ```flex-wrap: nowrap;```              | Comentado por defecto, para usarlo descomentar |
| ```.u-flex-column```         | ```flex-direction: column;```         | Comentado por defecto, para usarlo descomentar |
| ```.u-flex-column-reverse``` | ```flex-direction: column-reverse;``` | Comentado por defecto, para usarlo descomentar |
| ```.u-flex-row```            | ```flex-direction: row;```            | Comentado por defecto, para usarlo descomentar |
| ```.u-flex-row-reverse```    | ```flex-direction: row-reverse;```    | Comentado por defecto, para usarlo descomentar |
| ```.u-flex-left```           | ```justify-content: flex-start;```    | -                                              |
| ```.u-flex-center```         | ```justify-content: center;```        | -                                              |
| ```.u-flex-right```          | ```justify-content: flex-end;```      | -                                              |
| ```.u-flex-between```        | ```justify-content: space-between;``` | -                                              |
| ```.u-flex-around```         | ```justify-content: around;```        | Comentado por defecto, para usarlo descomentar |
| ```.u-flex-top```            | ```align-items: flex-start;```        | -                                              |
| ```.u-flex-middle```         | ```align-items: center;```            | -                                              |
| ```.u-flex-bottom```         | ```align-items: flex-end;```          | -                                              |
| ```.u-flex-baseline```       | ```align-items: baseline;```          | Comentado por defecto, para usarlo descomentar |
| ```.u-flex-self-start```     | ```align-self: flex-start;```         | -                                              |
| ```.u-flex-self-end```       | ```align-self: flex-end;```           | -                                              |
| ```.u-flex-self-stretch```   | ```align-self: stretch;```            | Comentado por defecto, para usarlo descomentar |
| ```.u-flex-self-center```    | ```align-self: center;```             | -                                              |
| ```.u-flex-grow-1```         | ```flex-grow: 1;```                   | -                                              |
| ```.u-flex-first```          | ```order: -1;```                      | -                                              |
| ```.u-flex-last```           | ```order: 999;```                     | -                                              |

**Enable**: true
**Responsive**: true

##### Font Families

| __Nombre__                  | __Propiedad CSS__          | __Descripción__                       |
| --------------------------- | -------------------------- | ------------------------------------- |
| ```.u-font-family-[name]``` | ```font-family: [name];``` | Ejemplo: ```.u-font-family-primary``` |

**Enable**: false
**Responsive**: null

##### Font Sizes

| __Nombre__                | __Propiedad CSS__        | __Descripción__                |
| ------------------------- | ------------------------ | ------------------------------ |
| ```.u-font-size-[size]``` | ```font-size: [size];``` | Ejemplo: ```.u-font-size-xl``` |

**Enable**: false
**Responsive**: null

##### Font Weight

| __Nombre__                    | __Propiedad CSS__            | __Descripción__                   |
| ----------------------------- | ---------------------------- | --------------------------------- |
| ```.u-font-weight-[weight]``` | ```font-weight: [weight];``` | Ejemplo: ```.u-font-weight-700``` |

**Enable**: true
**Responsive**: null

##### Line Height

| __Nombre__                  | __Propiedad CSS__          | __Descripción__                  |
| --------------------------- | -------------------------- | -------------------------------- |
| ```.u-line-height-[size]``` | ```line-height: [size];``` | Ejemplo: ```.u-line-height-xl``` |

**Enable**: false
**Responsive**: null

##### Margins

| __Nombre__          | __Propiedad CSS__                                      | __Descripción__          |
| ------------------- | ------------------------------------------------------ | ------------------------ |
| ```.u-mr-[size]```  | ```margin: [size];```                                  | Ejemplo: ```.u-mr-xl```  |
| ```.u-mrt-[size]``` | ```margin-top: [size];```                              | Ejemplo: ```.u-mrt-xl``` |
| ```.u-mrr-[size]``` | ```margin-right: [size];```                            | Ejemplo: ```.u-mrr-xl``` |
| ```.u-mrb-[size]``` | ```margin-bottom: [size];```                           | Ejemplo: ```.u-mrb-xl``` |
| ```.u-mrl-[size]``` | ```margin-left: [size];```                             | Ejemplo: ```.u-mrl-xl``` |
| ```.u-mrv-[size]``` | ```margin-top: [size];``` ```margin-bottom: [size];``` | Ejemplo: ```.u-mrv-xl``` |
| ```.u-mrh-[size]``` | ```margin-left: [size];``` ```margin-right: [size];``` | Ejemplo: ```.u-mrh-xl``` |

**Enable**: true
**Responsive**: true

##### Paddings

| __Nombre__          | __Propiedad CSS__                                        | __Descripción__          |
| ------------------- | -------------------------------------------------------- | ------------------------ |
| ```.u-pd-[size]```  | ```padding: [size];```                                   | Ejemplo: ```.u-pd-xl```  |
| ```.u-pdt-[size]``` | ```padding-top: [size];```                               | Ejemplo: ```.u-pdt-xl``` |
| ```.u-pdr-[size]``` | ```padding-right: [size];```                             | Ejemplo: ```.u-pdr-xl``` |
| ```.u-pdb-[size]``` | ```padding-bottom: [size];```                            | Ejemplo: ```.u-pdb-xl``` |
| ```.u-pdl-[size]``` | ```padding-left: [size];```                              | Ejemplo: ```.u-pdl-xl``` |
| ```.u-pdv-[size]``` | ```padding-top: [size];``` ```padding-bottom: [size];``` | Ejemplo: ```.u-pdv-xl``` |
| ```.u-pdh-[size]``` | ```padding-left: [size];``` ```padding-right: [size];``` | Ejemplo: ```.u-pdh-xl``` |

**Enable**: true
**Responsive**: true

##### Radiuses

| __Nombre__             | __Propiedad CSS__            | __Descripción__                 |
| ---------------------- | ---------------------------- | ------------------------------- |
| ```.u-radius-[name]``` | ```border-radius: [name];``` | Ejemplo: ```.u-radius-circle``` |

**Enable**: false
**Responsive**: null

##### Shadows

| __Nombre__             | __Propiedad CSS__         | __Descripción__                  |
| ---------------------- | ------------------------- | -------------------------------- |
| ```.u-shadow-[name]``` | ```box-shadow: [name];``` | Ejemplo: ```.u-shadow-distant``` |

**Enable**: false
**Responsive**: null

##### Text Transforms

| __Nombre__          | __Propiedad CSS__                 | __Descripción__ |
| ------------------- | --------------------------------- | --------------- |
| ```.u-lowercase```  | ```text-transform: lowercase;```  | -               |
| ```.u-uppercase```  | ```text-transform: uppercase;```  | -               |
| ```.u-capitalize``` | ```text-transform: capitalize;``` | -               |

**Enable**: true
**Responsive**: null

## Referencias

- [Documentación de SASS](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
- [Inuitcss](https://github.com/inuitcss/inuitcss)
- [Haiticss](https://github.com/haiticss/haiticss)
- [Harry Roberts](https://csswizardry.com/)
- [CSS Guide Lines](http://cssguidelin.es/)
- [More transparent UI code with Namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)
- [Documentación de BEM](https://en.bem.info/methodology/)
- [Panini](https://foundation.zurb.com/sites/docs/panini.html)
- [Handlebars](http://handlebarsjs.com/)
- ["Una introducción a Object Oriented CSS (OOCSS)"](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)