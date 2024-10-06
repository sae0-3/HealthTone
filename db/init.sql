DROP DATABASE IF EXISTS db_healthtone;
CREATE DATABASE db_healthtone;
\c db_healthtone;


CREATE TABLE CONTENIDO (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    autor VARCHAR(100),
    url_texto VARCHAR(255) NOT NULL,
    url_portada VARCHAR(255),
    url_audio VARCHAR(255),
    fecha_subida DATE DEFAULT NOW(),
    fecha_publicacion DATE
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

CREATE TABLE ESTRENO (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    autor VARCHAR(100),
    url_portada VARCHAR(255),
    publicado BOOLEAN DEFAULT FALSE
);

CREATE TABLE R_ESTRENO_CATEGORIA (
    id_estreno INT NOT NULL,
    id_categoria INT NOT NULL,
    PRIMARY KEY (id_estreno, id_categoria),
    FOREIGN KEY (id_estreno) REFERENCES ESTRENO(id),
    FOREIGN KEY (id_categoria) REFERENCES CATEGORIA(id)
);

CREATE TABLE VISUALIZACION (
    id_contenido INT NOT NULL,
    fecha DATE DEFAULT NOW(),
    FOREIGN KEY (id_contenido) REFERENCES CONTENIDO(id)
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
INSERT INTO CONTENIDO (nombre, autor, url_texto, url_portada, url_audio, fecha_publicacion) VALUES
    ('Importancia de la vacunación', 'Ministerio de Salud', 'http://ejemplo.com/vacunacion', 'http://ejemplo.com/portada_vacunacion.jpg', NULL, '2023-01-15'),
    ('Hábitos saludables para prevenir enfermedades crónicas', 'Dr. Juan Pérez', 'http://ejemplo.com/habitos_saludables', 'http://ejemplo.com/portada_habitos.jpg', NULL, '2023-02-10'),
    ('Detección temprana de cáncer', 'Fundación Cáncer', 'http://ejemplo.com/deteccion_temprana', 'http://ejemplo.com/portada_deteccion.jpg', NULL, '2023-03-05'),
    ('Alimentación balanceada', 'Nutricionista Ana Gómez', 'http://ejemplo.com/alimentacion_balanceada', 'http://ejemplo.com/portada_alimentacion.jpg', NULL, '2023-04-20'),
    ('La salud mental y su prevención', 'Psicóloga María López', 'http://ejemplo.com/salud_mental', 'http://ejemplo.com/portada_salud_mental.jpg', NULL, '2023-05-25'),
    ('Prevención del VIH/SIDA', 'ONG Salud', 'http://ejemplo.com/prevencion_vih', 'http://ejemplo.com/portada_vih.jpg', NULL, '2023-06-15'),
    ('La importancia del ejercicio físico', 'Entrenador Carlos Ruiz', 'http://ejemplo.com/ejercicio', 'http://ejemplo.com/portada_ejercicio.jpg', NULL, '2023-07-30'),
    ('Control del estrés', 'Terapeuta Laura Martínez', 'http://ejemplo.com/control_estres', 'http://ejemplo.com/portada_estres.jpg', NULL, '2023-08-12'),
    ('Prevención de enfermedades respiratorias', 'Dr. Miguel Torres', 'http://ejemplo.com/enfermedades_respiratorias', 'http://ejemplo.com/portada_respiratorias.jpg', NULL, '2023-09-22'),
    ('Vacunas recomendadas para adultos', 'Ministerio de Salud', 'http://ejemplo.com/vacunas_adultos', 'http://ejemplo.com/portada_vacunas_adultos.jpg', NULL, '2023-10-10'),
    ('Impacto de la higiene en la salud', 'Instituto de Salud', 'http://ejemplo.com/higiene_salud', 'http://ejemplo.com/portada_higiene.jpg', NULL, '2023-11-05'),
    ('Prevención del cáncer de mama', 'Asociación de Mujeres', 'http://ejemplo.com/cancer_mama', 'http://ejemplo.com/portada_cancer_mama.jpg', NULL, '2023-12-01'),
    ('Alimentos que ayudan a prevenir enfermedades', 'Nutricionista Ana Gómez', 'http://ejemplo.com/alimentos_preventivos', 'http://ejemplo.com/portada_alimentos.jpg', NULL, '2023-12-15'),
    ('Importancia del chequeo médico regular', 'Clínica Salud', 'http://ejemplo.com/chequeo_medico', 'http://ejemplo.com/portada_chequeo.jpg', NULL, '2024-01-10'),
    ('Consejos para dejar de fumar', 'Fundación de Salud', 'http://ejemplo.com/dejar_fumar', 'http://ejemplo.com/portada_dejar_fumar.jpg', NULL, '2024-01-20'),
    ('Educación sobre la hipertensión', 'Dr. Pedro Ruiz', 'http://ejemplo.com/hipertension', 'http://ejemplo.com/portada_hipertension.jpg', NULL, '2024-02-02'),
    ('Consecuencias del sedentarismo', 'Dr. Laura Martínez', 'http://ejemplo.com/sedentarismo', 'http://ejemplo.com/portada_sedentarismo.jpg', NULL, '2024-02-15'),
    ('Técnicas de relajación para la salud mental', 'Psicóloga Beatriz Torres', 'http://ejemplo.com/tecnicas_relajacion', 'http://ejemplo.com/portada_relajacion.jpg', NULL, '2024-03-01'),
    ('Mitos y realidades sobre la diabetes', 'Diabetes A.C.', 'http://ejemplo.com/mitos_diabetes', 'http://ejemplo.com/portada_mitos_diabetes.jpg', NULL, '2024-03-10'),
    ('Ejercicios para la salud del corazón', 'Entrenador Jorge Pérez', 'http://ejemplo.com/ejercicios_corazon', 'http://ejemplo.com/portada_corazon.jpg', NULL, '2024-03-20');

INSERT INTO CONTENIDO (nombre, autor, url_texto, url_portada, url_audio) VALUES
    ('Mujeres', 'Charles Bukowski', 'http://localhost:4000/uploads/mujeres.epub', 'https://firebasestorage.googleapis.com/v0/b/is--healthtone.appspot.com/o/mujeres_portada.jpeg?alt=media&token=4fa1e9ea-e9f8-415d-a7be-9fa845700969', 'http://localhost:4000/uploads/song.mp3');

INSERT INTO CATEGORIA (nombre, descripcion) VALUES
    ('Prevención de Enfermedades', 'Información y recursos sobre cómo prevenir enfermedades.'),
    ('Salud Mental', 'Recursos sobre salud mental y bienestar emocional.'),
    ('Nutrición', 'Consejos y guías sobre alimentación saludable.'),
    ('Ejercicio y Actividad Física', 'Importancia del ejercicio y cómo mantenerse activo.'),
    ('Vacunas', 'Información sobre vacunas y su importancia en la salud.'),
    ('Higiene', 'Consejos sobre higiene personal y prevención de enfermedades.');

INSERT INTO R_CONTENIDO_CATEGORIA (id_contenido, id_categoria) VALUES
    (1, 5),
    (2, 1),
    (3, 1),
    (4, 3),
    (5, 2),
    (6, 1),
    (7, 4),
    (8, 2),
    (9, 1),
    (10, 5),
    (11, 6),
    (12, 1),
    (13, 1),
    (14, 3),
    (15, 2),
    (16, 1),
    (17, 2),
    (18, 4),
    (19, 1),
    (20, 4),
    (20, 1);

INSERT INTO ESTRENO (nombre, autor, url_portada, publicado) VALUES
    ('Documental sobre la diabetes', 'Fundación Diabetes', 'http://ejemplo.com/documental_diabetes.jpg', FALSE),
    ('Serie sobre hábitos saludables', 'Ministerio de Salud', 'http://ejemplo.com/serie_habitos.jpg', FALSE),
    ('Programa de ejercicios para el corazón', 'Entrenador Carlos Ruiz', 'http://ejemplo.com/programa_corazon.jpg', FALSE),
    ('Charla sobre salud mental', 'Psicóloga María López', 'http://ejemplo.com/charla_salud_mental.jpg', FALSE),
    ('Taller de alimentación saludable', 'Nutricionista Ana Gómez', 'http://ejemplo.com/taller_alimentacion.jpg', FALSE),
    ('Seminario sobre vacunas', 'Ministerio de Salud', 'http://ejemplo.com/seminario_vacunas.jpg', TRUE),
    ('Documental sobre la hipertensión', 'Dr. Pedro Ruiz', 'http://ejemplo.com/documental_hipertension.jpg', TRUE),
    ('Programa de prevención de VIH', 'ONG Salud', 'http://ejemplo.com/programa_vih.jpg', FALSE),
    ('Charla sobre enfermedades respiratorias', 'Dr. Miguel Torres', 'http://ejemplo.com/charla_respiratorias.jpg', FALSE),
    ('Taller de técnicas de relajación', 'Psicóloga Beatriz Torres', 'http://ejemplo.com/taller_relajacion.jpg', FALSE);

INSERT INTO R_ESTRENO_CATEGORIA (id_estreno, id_categoria) VALUES
    (1, 1),
    (2, 1),
    (3, 4),
    (4, 2),
    (5, 3),
    (6, 5),
    (7, 1),
    (8, 2),
    (9, 1),
    (10, 2);

INSERT INTO VISUALIZACION (id_contenido, fecha) VALUES
    (1, '2023-01-20'),
    (1, '2023-01-22'),
    (1, '2023-01-25'),
    (2, '2023-02-15'),
    (2, '2023-02-18'),
    (3, '2023-03-01'),
    (3, '2023-03-10'),
    (4, '2023-04-05'),
    (4, '2023-04-10'),
    (4, '2023-04-15'),
    (5, '2023-05-01'),
    (6, '2023-06-01'),
    (6, '2023-06-15'),
    (7, '2023-07-01'),
    (8, '2023-08-10'),
    (9, '2023-09-15'),
    (10, '2023-10-01'),
    (11, '2023-11-01'),
    (12, '2023-11-15'),
    (13, '2023-12-01'),
    (14, '2023-12-10'),
    (15, '2024-01-10'),
    (16, '2024-01-15'),
    (17, '2024-01-20'),
    (18, '2024-02-01'),
    (19, '2024-02-15'),
    (20, '2024-03-01'),
    (1, '2023-01-28'),
    (2, '2023-02-22'),
    (3, '2023-03-15'),
    (4, '2023-04-20'),
    (5, '2023-05-25'),
    (6, '2023-06-10'),
    (7, '2023-07-05'),
    (8, '2023-08-12'),
    (9, '2023-09-22'),
    (10, '2023-10-20'),
    (11, '2023-11-10'),
    (12, '2023-11-22'),
    (13, '2023-12-15'),
    (14, '2023-12-30'),
    (15, '2024-01-25'),
    (16, '2024-02-05'),
    (17, '2024-02-20'),
    (18, '2024-03-10'),
    (19, '2024-03-15'),
    (20, '2024-03-20');
