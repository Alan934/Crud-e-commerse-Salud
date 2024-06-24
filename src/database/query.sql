CREATE DATABASE ecommerseSalud;

USE ecommerseSalud;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    dni VARCHAR(20) NOT NULL
);

CREATE TABLE empleado (
    id INT PRIMARY KEY,
    salario FLOAT,
    puesto VARCHAR(255),
    FOREIGN KEY (id) REFERENCES usuario(Id)
);

CREATE TABLE cliente (
    id INT PRIMARY KEY,
    historialCompra TEXT,
    FOREIGN KEY (id) REFERENCES usuario(id)
);

CREATE TABLE producto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    precio FLOAT NOT NULL,
    descripcion TEXT,
    stock INT NOT NULL,
    imagenUrl VARCHAR(255),
    fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    clienteId INT,
    total FLOAT NOT NULL,
    fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clienteId) REFERENCES cliente(Id)
);

CREATE TABLE pedidoProducto (
    pedidoId INT,
    productoId INT,
    cantidad INT NOT NULL,
    FOREIGN KEY (pedidoId) REFERENCES pedido(id),
    FOREIGN KEY (productoId) REFERENCES producto(id),
    PRIMARY KEY (pedidoId, productoId)
);
