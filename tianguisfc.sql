CREATE DATABASE IF NOT EXISTS TianguisFC;

CREATE USER IF NOT EXISTS 'usertianguis'@'localhost' IDENTIFIED BY 'Developer123!';

GRANT ALL PRIVILEGES ON TianguisFC.* TO 'usertianguis'@'localhost' WITH GRANT OPTION;

USE TianguisFC;

DROP TABLE IF EXISTS encuentro;
DROP TABLE IF EXISTS resena;
DROP TABLE IF EXISTS compra;
DROP TABLE IF EXISTS producto;
DROP TABLE IF EXISTS vendedor;
DROP TABLE IF EXISTS comprador;

-- primero definimos las tablas sin referencias

CREATE TABLE vendedor(
    numero_cuenta varchar(50),
    id_vendedor INT AUTO_INCREMENT PRIMARY KEY,
    nombres varchar(50) NOT NULL,
    ap_pat varchar(50) NOT NULL,
    ap_mat varchar(50) NOT NULL,
    num_telefono varchar(20) NOT NULL,
    correo varchar(255) NOT NULL,
    genero varchar(15) NOT NULL,
    foto BLOB,
    password varchar(255) NOT NULL
);

CREATE TABLE comprador(
    numero_cuenta INT,
    id_comprador INT AUTO_INCREMENT PRIMARY KEY,
    nombres varchar(50) NOT NULL,
    ap_pat varchar(50) NOT NULL,
    ap_mat varchar(50) NOT NULL,
    num_telefono varchar(20) NOT NULL,
    correo varchar(255) NOT NULL,
    genero varchar(15) NOT NULL,
    foto BLOB,
    password varchar(255) NOT NULL
);

-- ahora las tablas que tienen llaves foráneas fuera de la llave


CREATE TABLE producto(
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    id_vendedor INT NOT NULL,
    descripcion varchar(300) NOT NULL,
    costo DECIMAL(6,2) NOT NULL,
    categoria varchar(100) NOT NULL,
    imagen BLOB,
    unidades SMALLINT NOT NULL,
    FOREIGN KEY (id_vendedor) REFERENCES vendedor(id_vendedor)
);

CREATE TABLE compra(
    id_compra INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_producto INT NOT NULL,
    id_vendedor INT NOT NULL,
    id_comprador INT NOT NULL,
    total DECIMAL(7,2) NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    FOREIGN KEY (id_vendedor) REFERENCES vendedor(id_vendedor),
    FOREIGN KEY (id_comprador) REFERENCES comprador(id_comprador)
);

CREATE TABLE resena(
    id_resena INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    id_comprador INT NOT NULL,
    comentario varchar(300) NOT NULL,
    calificacion tinyint NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    FOREIGN KEY (id_comprador) REFERENCES comprador(id_comprador)
);

-- finalmente creamos la tabla con referencias en su llave compuesta

CREATE TABLE encuentro(
    id_comprador INT NOT NULL,
    id_vendedor INT NOT NULL,
    id_compra INT NOT NULL,
    lugar varchar(100) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    FOREIGN KEY (id_comprador) REFERENCES comprador(id_comprador),
    FOREIGN KEY (id_vendedor) REFERENCES vendedor(id_vendedor),
    FOREIGN KEY (id_compra) REFERENCES compra(id_compra)
);

CREATE TABLE productos(
    id_compra INT NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY (id_compra) REFERENCES compra(id_compra),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);
