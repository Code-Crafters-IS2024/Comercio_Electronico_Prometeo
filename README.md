# Ingeniería de Software 2024-2
Repositorio oficial de la materia de Ingenieria de Software de la Facultad de Ciencias de la UNAM del semestre 2024-2

## Profesores:

- Francisco Valdes Souto
- Valeria Garcia Landa
- Fernando Fong
- Erick Martínez Piza
- Adriana Hernandez Gasca

## Ejecucion

La aplicacion de login se ejecuta como un servidor de backend usando la libreria Flask de Python, un servidor de frontend usando React, y un servidor SQL.

El usuario para el login es "12345" y su contraseña "12345".

### Base de datos
Ejecutar el script ```tianguisfc.sql``` para levantar la base de datos y crear el esquema de la misma. Posteriormente ejecutar ```insert_user.sql``` que inserta un registro de usuario a usar como usuario de login de ejemplo.

### Backend
El back end se ejecuta como un servidor flask de python. Para ejecutarlo, ejecutar ```app.py``` en la raiz.

Se requiere la libreria Flask.

### Front end
El front end se ejecuta como una aplicacion de react. Para ejecutarlo, dentro del directorio ```tianguis-fc``:
- ejecutar ```npm install``` y ```npm install react-router-dom``` para instalar las paqueterias requeridas, si no estan ya instaladas.

- ejecutar ```npm start```para iniciar la aplicacion.

Se puede acceder a la aplicacion en un navegador web accediendo a  la dirección ```localhost:3000/``.

Se requiere el modulo de react-router-dom.
