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
    id SERIAL PRIMARY KEY,
    id_contenido INT NOT NULL,
    fecha DATE DEFAULT NOW(),
    FOREIGN KEY (id_contenido) REFERENCES CONTENIDO(id)
);



-- FUNCTIONS
CREATE OR REPLACE FUNCTION buscar(pattern TEXT)
RETURNS TABLE(
    id INT,
    nombre VARCHAR,
    autor VARCHAR,
    url_texto VARCHAR,
    url_portada VARCHAR,
    url_audio VARCHAR,
    categorias JSON
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        co.id,
        co.nombre,
        co.autor,
        co.url_texto,
        co.url_portada,
        co.url_audio,
        COALESCE(
            json_agg(
            json_build_object(
                'id', ca.id,
                'name', ca.nombre
            )
            ) FILTER (WHERE ca.id IS NOT NULL),
            '[]'
        ) AS categorias
    FROM CONTENIDO co
        LEFT JOIN R_CONTENIDO_CATEGORIA r ON id_contenido = co.id
        LEFT JOIN CATEGORIA ca ON ca.id = id_categoria
    WHERE co.nombre ~* pattern OR co.autor ~* pattern
    GROUP BY co.id, co.nombre, co.autor, co.url_texto, co.url_portada, co.url_audio;
END;
$$ LANGUAGE plpgsql;



-- DATA
INSERT INTO CONTENIDO (nombre, autor, url_texto, url_portada, url_audio) VALUES
    ('Dime qué comes y te diré qué bacterias tienes', 'Blanca García-Orea Haro', 'http://localhost:4000/uploads/epub/Dime_qué_comes_y_te_diré_qué_bacterias_tienes_Audiolibro_de_Blanca.epub', 'http://localhost:4000/uploads/imgs/Dime_qué_comes_y_te_diré_qué_bacterias_tienes_Audiolibro_de_Blanca.jpg', 'http://localhost:4000/uploads/tracks/Dime_qué_comes_y_te_diré_qué_bacterias_tienes_Audiolibro_de_Blanca.mp3'),
    ('Diferencias entre virus, bacterias y hongos', 'Dr. Elena R. Martínez', 'http://localhost:4000/uploads/epub/bacteriasVirus.epub', 'http://localhost:4000/uploads/imgs/bacteriasVirus.jpg', 'http://localhost:4000/uploads/tracks/bacteriasVirus.mp3'),
    ('El cancer no es una enfermedad', 'Dr. Andreas Morizt', 'http://localhost:4000/uploads/epub/cancer.epub', 'http://localhost:4000/uploads/imgs/cancer.jpg', 'http://localhost:4000/uploads/tracks/cancer.mp3'),
    ('¿La marihuana es mala para el cerebro?', 'Mikel Alonso', 'http://localhost:4000/uploads/epub/marihuana.epub', 'http://localhost:4000/uploads/imgs/marihuana.jpg', 'http://localhost:4000/uploads/tracks/marihuana.mp3'),
    ('Pandemia, Epidemia y Endemia', 'Dr. Ignacio Lopez -Goñi', 'http://localhost:4000/uploads/epub/virusPandemias.epub', 'http://localhost:4000/uploads/imgs/virusPandemias.jpg', 'http://localhost:4000/uploads/tracks/virusPandemias.mp3');

INSERT INTO ESTRENO (nombre, autor, url_portada) VALUES
    ('Vacunas Verdades mentiras y controversia', 'Peter C Gotzsche', 'http://localhost:4000/uploads/imgs/vacunas-verdades-mentiras-y-controversia-int.jpg'),
    ('¡Es la microbiota, idiota!', 'Sari Arponen', 'http://localhost:4000/uploads/imgs/Es_la_microbiota,_idiota!_Alienta_Descubre_de_Sari_Arponen_Vista.jpeg');

INSERT INTO VISUALIZACION (id_contenido, fecha)
SELECT
    c.id AS id_contenido,
    (CURRENT_DATE - INTERVAL '70 days' * RANDOM())::DATE AS fecha
FROM CONTENIDO c,
    GENERATE_SERIES(1, (FLOOR(RANDOM() * 100 + 1))::INT) AS s;

UPDATE CONTENIDO
SET fecha_subida = (
    DATE '2024-08-01' + (RANDOM() * (DATE '2024-10-10' - DATE '2024-08-01'))::INT
);
