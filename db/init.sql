DROP DATABASE IF EXISTS db_healthtone;
CREATE DATABASE db_healthtone;
\c db_healthtone;


CREATE TABLE CONTENIDO (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    autor VARCHAR(100),
    url_texto VARCHAR(255) NOT NULL,
    url_portada VARCHAR(255),
    fecha_subida DATE DEFAULT NOW(),
    fecha_publicacion DATE,
    type_mime VARCHAR(50) DEFAULT 'application/epub+zip'
);

CREATE TABLE CATEGORIA (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE R_CONTENIDO_CATEGORIA (
    id_contenido INT NOT NULL,
    id_categoria INT NOT NULL,
    PRIMARY KEY (id_contenido, id_categoria),
    FOREIGN KEY (id_contenido) REFERENCES CONTENIDO(id),
    FOREIGN KEY (id_categoria) REFERENCES CATEGORIA(id)
);



-- FUNCTIONS
CREATE OR REPLACE FUNCTION buscar_contenido_por_nombre_o_autor(pattern TEXT)
RETURNS TABLE(id INT, nombre VARCHAR) AS $$
BEGIN
    RETURN QUERY
    SELECT c.id, c.nombre
    FROM CONTENIDO c
    WHERE c.nombre ~* pattern OR c.autor ~* pattern;
END;
$$ LANGUAGE plpgsql;



-- DATA
INSERT INTO CATEGORIA (nombre, descripcion) VALUES
    ('Medicina General', 'Información sobre diversas áreas de la medicina general'),
    ('Neurología', 'Estudio de los trastornos del sistema nervioso'),
    ('Cardiología', 'Estudio del corazón y del sistema circulatorio'),
    ('Pediatría', 'Atención médica para niños y adolescentes'),
    ('Medicina Preventiva', 'Prácticas para prevenir enfermedades'),
    ('Oncología', 'Estudio y tratamiento del cáncer'),
    ('Psiquiatría', 'Salud mental y tratamientos relacionados'),
    ('Geriatría', 'Medicina para personas mayores'),
    ('Fisioterapia', 'Rehabilitación y tratamiento físico'),
    ('Nutrición', 'Alimentación y su impacto en la salud');

INSERT INTO CONTENIDO (nombre, autor, url_texto, url_portada, fecha_publicacion) VALUES
    ('La salud de los ancianos', 'Dr. Juan Pérez', 'http://ejemplo.com/salud-ancianos', 'http://ejemplo.com/portada-ancianos.jpg', '2022-03-01'),
    ('Neurología moderna', 'Dra. Ana López', 'http://ejemplo.com/neurologia-moderna', 'http://ejemplo.com/portada-neurologia.jpg', '2021-07-15'),
    ('Enfermedades cardíacas', 'Dr. Luis Gómez', 'http://ejemplo.com/enfermedades-cardiacas', 'http://ejemplo.com/portada-cardiacas.jpg', '2020-11-20'),
    ('La pediatría en el siglo XXI', 'Dra. María Torres', 'http://ejemplo.com/pediatria-siglo-21', 'http://ejemplo.com/portada-pediatria.jpg', '2022-01-10'),
    ('Prevención de enfermedades', 'Dr. Carlos Ruiz', 'http://ejemplo.com/prevencion-enfermedades', 'http://ejemplo.com/portada-prevencion.jpg', '2023-05-05'),
    ('Tratamientos oncológicos', 'Dra. Rosa Martínez', 'http://ejemplo.com/tratamientos-oncologicos', 'http://ejemplo.com/portada-oncologicos.jpg', '2021-09-30'),
    ('Salud mental y bienestar', 'Dr. Pedro Fernández', 'http://ejemplo.com/salud-mental', 'http://ejemplo.com/portada-mental.jpg', '2023-04-12'),
    ('Medicina geriátrica', 'Dra. Laura Sánchez', 'http://ejemplo.com/medicina-geriatica', 'http://ejemplo.com/portada-geriatra.jpg', '2022-06-20'),
    ('Fisioterapia y rehabilitación', 'Dr. Javier Martínez', 'http://ejemplo.com/fisioterapia', 'http://ejemplo.com/portada-fisioterapia.jpg', '2023-02-14'),
    ('Nutrición y salud', 'Dra. Elena Gómez', 'http://ejemplo.com/nutricion-salud', 'http://ejemplo.com/portada-nutricion.jpg', '2023-03-09'),
    ('Tratamiento del Alzheimer', 'Dr. Alberto López', 'http://ejemplo.com/alzheimer', 'http://ejemplo.com/portada-alzheimer.jpg', '2021-12-05'),
    ('Cardiopatías y su tratamiento', 'Dr. Enrique Salas', 'http://ejemplo.com/cardiopatias', 'http://ejemplo.com/portada-cardiopatias.jpg', '2020-10-16'),
    ('Cuidados paliativos', 'Dra. Teresa Bravo', 'http://ejemplo.com/cuidados-paliativos', 'http://ejemplo.com/portada-paliativos.jpg', '2021-08-18'),
    ('Ejercicio y salud', 'Dr. Manuel Castro', 'http://ejemplo.com/ejercicio-salud', 'http://ejemplo.com/portada-ejercicio.jpg', '2022-02-28'),
    ('Trastornos alimenticios', 'Dra. Sara Martín', 'http://ejemplo.com/trastornos-alimenticios', 'http://ejemplo.com/portada-alimenticios.jpg', '2020-09-10'),
    ('Diabetes y su manejo', 'Dr. Vicente Ramírez', 'http://ejemplo.com/diabetes', 'http://ejemplo.com/portada-diabetes.jpg', '2023-01-15'),
    ('Enfermedades respiratorias', 'Dr. Joaquín Torres', 'http://ejemplo.com/enfermedades-respiratorias', 'http://ejemplo.com/portada-respiratorias.jpg', '2021-05-25'),
    ('Nuevos avances en medicina', 'Dra. Patricia Morales', 'http://ejemplo.com/avances-medicina', 'http://ejemplo.com/portada-avances.jpg', '2023-07-07'),
    ('Medicina y tecnología', 'Dr. Tomás Herrera', 'http://ejemplo.com/medicina-tecnologia', 'http://ejemplo.com/portada-tecnologia.jpg', '2022-04-20'),
    ('Cuidado infantil', 'Dra. Beatriz García', 'http://ejemplo.com/cuidado-infantil', 'http://ejemplo.com/portada-cuidado.jpg', '2023-06-01');

INSERT INTO CONTENIDO (nombre, autor, url_texto, url_portada) VALUES
    ('Mujeres', 'Charles Bukowski', 'http://localhost:4000/uploads/MUJERES.epub', 'https://firebasestorage.googleapis.com/v0/b/is--healthtone.appspot.com/o/mujeres_portada.jpeg?alt=media&token=4fa1e9ea-e9f8-415d-a7be-9fa845700969');

INSERT INTO R_CONTENIDO_CATEGORIA (id_contenido, id_categoria) VALUES
    (1, 9),  -- La salud de los ancianos (Geriatría)
    (1, 4),
    (2, 2),  -- Neurología moderna (Neurología)
    (3, 3),  -- Enfermedades cardíacas (Cardiología)
    (4, 4),  -- La pediatría en el siglo XXI (Pediatría)
    (5, 5),  -- Prevención de enfermedades (Medicina Preventiva)
    (6, 6),  -- Tratamientos oncológicos (Oncología)
    (7, 7),  -- Salud mental y bienestar (Psiquiatría)
    (8, 8),  -- Medicina geriátrica (Geriatría)
    (9, 9),  -- Fisioterapia y rehabilitación (Fisioterapia)
    (10, 10), -- Nutrición y salud (Nutrición)
    (11, 2),  -- Tratamiento del Alzheimer (Neurología)
    (12, 3),  -- Cardiopatías y su tratamiento (Cardiología)
    (13, 5),  -- Cuidados paliativos (Medicina Preventiva)
    (14, 9),  -- Ejercicio y salud (Fisioterapia)
    (15, 10), -- Trastornos alimenticios (Nutrición)
    (16, 5),  -- Diabetes y su manejo (Medicina Preventiva)
    (17, 3),  -- Enfermedades respiratorias (Cardiología)
    (18, 1),  -- Nuevos avances en medicina (Medicina General)
    (19, 2);  -- Medicina y tecnología (Neurología)
