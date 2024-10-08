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
    ('Vacunas Verdades mentiras y controversia', 'Peter C Gotzsche', 'http://localhost:4000/uploads/epub/vacunas-verdades-mentiras-y-controversia-int.epub', 'http://localhost:4000/uploads/imgs/vacunas-verdades-mentiras-y-controversia-int.jpg', 'http://localhost:4000/uploads/tracks/vacunas-verdades-mentiras-y-controversia-int.mp3'),
    ('¡Es la microbiota, idiota!', 'Sari Arponen', 'http://localhost:4000/uploads/epub/Es_la_microbiota,_idiota!_Alienta_Descubre_de_Sari_Arponen_Vista.epub', 'http://localhost:4000/uploads/imgs/Es_la_microbiota,_idiota!_Alienta_Descubre_de_Sari_Arponen_Vista.jpeg', 'http://localhost:4000/uploads/tracks/Es_la_microbiota,_idiota!_Alienta_Descubre_de_Sari_Arponen_Vista.mp3'),
    ('Dime qué comes y te diré qué bacterias tienes', 'Blanca García-Orea Haro', 'http://localhost:4000/uploads/epub/Dime_qué_comes_y_te_diré_qué_bacterias_tienes_Audiolibro_de_Blanca.epub', 'http://localhost:4000/uploads/imgs/Dime_qué_comes_y_te_diré_qué_bacterias_tienes_Audiolibro_de_Blanca.jpg', 'http://localhost:4000/uploads/tracks/Dime_qué_comes_y_te_diré_qué_bacterias_tienes_Audiolibro_de_Blanca.mp3');
