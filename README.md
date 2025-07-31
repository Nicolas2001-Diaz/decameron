## Instalación del proyecto

Para poder realizar la instalaciónn correctamente se necesita PHP 8.1, composer y Node.js.

1. Descargar el proyecto (o clonarlo usando GIT)
2. Copie el archivo `.env.example` en su archivo `.env` y configure las credenciales de la base de datos
3. Navegue al directorio raíz del proyecto usando la terminal
4. Ejecute el comonado `composer install`
5. Establezca la clave de cifrado ejecutando el comando `php artisan key:generate --ansi`
6. Ejecute las migraciones con el comando `php artisan migrate`
7. Inicie el servidor local de laravel con el comando `php artisan serve`
8. Abra una nueva terminal y navegue a la carpeta `react`
9. Ejecute el comando `npm install`
10. Ejecute el comando `npm run dev` para iniciar el servidor de vite para React
