# Framework maquetación

Base para crear un framework a medida del proyecto. Se recomienda usarlo solo para proyectos grandes y que tengan prevista una escalabilidad bastante grande.

## Instalación

Antes de poder instalar lo necesario para el proyecto, es obligatorio realizar los siguientes requisitos.

### Requisitos

Para poder usar la maqueta tienes que tener instalados en el ordenador:

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
npm install 'gulpjs/gulp.git#4.0'
```

##### Posibles errores

Si a la hora de instalar o ejecutar Gulp sale algún error referente a `/usr/local/share/man/man1/gulp.1` ejecutamos:

***Nota:*** *Puede que la ruta cambie dependiendo del sistema operativo.*

```bash
rm /usr/local/share/man/man1/gulp.1
```

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
