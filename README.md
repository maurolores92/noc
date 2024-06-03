# NOC

## Instalacion

1. npm -i

### Instalacion como sitio estatico

1. npm install -g http-server
   Este comando instala http-server globalmente en tu máquina. http-server es un servidor HTTP de línea de comandos simple y sin configuración.

2. npm run export
   Este comando es específico de Next.js y se utiliza para crear una versión estática de tu aplicación.

3. http-server -a 192.168.0.202 ./out
   Este comando inicia el http-server en tu máquina y sirve los archivos estáticos desde el directorio ./out.

### Instalacion como un sitio renderizado por servidor utilziando el servidor incorporado de Next.Js

1. npm run build
   Este comando se utiliza para construir tu aplicación Next.js para producción.

2. npx next start -H 192.168.0.202 -p 3001
   Este comando inicia el servidor Next.js en tu máquina y sirve tu aplicación.
