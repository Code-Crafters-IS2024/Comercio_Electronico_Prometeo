#!/bin/bash

# Ejecutar los archivos SQL en MariaDB
mysql -u usuario -p contraseña < archivo1.sql
mysql -u usuario -p contraseña < archivo2.sql
mysql -u usuario -p contraseña < archivo3.sql

# Eliminar la carpeta node_modules
rm -rf node_modules

# Instalar las dependencias npm
npm install

# Ejecutar npm start en una nueva terminal
gnome-terminal --tab --title="NPM Start" -- bash -c "npm start; bash"

# Exportar variables de entorno para Flask
export FLASK_APP=app
export FLASK_ENV=development

# Ejecutar Python Flask en otra terminal
gnome-terminal --tab --title="Flask" -- bash -c "python app.py; bash"
