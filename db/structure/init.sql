DROP DATABASE IF EXISTS db_healthtone;
CREATE DATABASE db_healthtone;
\c db_healthtone;


CREATE TABLE USUARIO (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    clave VARCHAR(255) NOT NULL
);

CREATE TABLE CONTENIDO (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    autor VARCHAR(100),
    url_texto TEXT NOT NULL,
    url_portada TEXT NOT NULL,
    url_audio TEXT NOT NULL,
    fecha_subida DATE DEFAULT NOW(),
    fecha_publicacion DATE
);

CREATE TABLE FAVORITO (
   id_contenido INT NOT NULL,
   id_usuario INT NOT NULL,
   fecha DATE DEFAULT NOW(),
   PRIMARY KEY (id_usuario, id_contenido),
   FOREIGN KEY (id_usuario) REFERENCES USUARIO(id),
   FOREIGN KEY (id_contenido) REFERENCES CONTENIDO(id)
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
    url_portada TEXT,
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
    id_usuario INT NOT NULL,
    id_contenido INT NOT NULL,
    fecha TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id),
    FOREIGN KEY (id_contenido) REFERENCES CONTENIDO(id)
);

CREATE TABLE PROGRESO (
    id_usuario INT NOT NULL,
    id_contenido INT NOT NULL,
    progreso INT NOT NULL,
    PRIMARY KEY (id_usuario, id_contenido),
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id),
    FOREIGN KEY (id_contenido) REFERENCES CONTENIDO(id)
);



-- FUNCTIONS
CREATE OR REPLACE FUNCTION buscar(pattern TEXT)
RETURNS TABLE(
    id INT,
    nombre VARCHAR,
    autor VARCHAR,
    url_texto TEXT,
    url_portada TEXT,
    url_audio TEXT,
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

CREATE OR REPLACE FUNCTION guardar_progreso(
    id_usuario INT,
    id_contenido INT,
    progreso INT
) RETURNS void
AS $$
BEGIN
    INSERT INTO PROGRESO (id_usuario, id_contenido, progreso)
    VALUES (id_usuario, id_contenido, progreso)
    ON CONFLICT (id_usuario, id_contenido)
    DO UPDATE SET progreso = EXCLUDED.progreso;
END;
$$ LANGUAGE plpgsql;


-- CREATE OR REPLACE FUNCTION "Personas".insertar_usuario(
-- 	nombre character varying,
-- 	apellido character varying,
-- 	correo character varying,
-- 	"contraseña" character varying)
--     RETURNS void
--     LANGUAGE 'plpgsql'
--     COST 100
--     VOLATILE PARALLEL UNSAFE
-- AS $BODY$
-- begin
-- 	insert into "Personas"."Cliente" (Nombre,Apellido,Email,Contraseña)
-- 	values (nombre,apellido,email,contraseña);
-- end;
-- $BODY$;

-- CREATE OR REPLACE FUNCTION "Libros".añadirFavorito(
-- 	codcliente integer,
-- 	codlibro integer)
--     RETURNS void
--     LANGUAGE 'plpgsql'
--     COST 100
--     VOLATILE PARALLEL UNSAFE
-- AS $BODY$
-- BEGIN
--     INSERT INTO "Libros"."Lista_favoritos" (Id_cliente, Id_libro)
--     VALUES (codCliente, codLibro);
-- END;
-- $BODY$;



-- DATA
INSERT INTO CONTENIDO (nombre, autor, url_texto, url_portada, url_audio) VALUES
    ('Dime qué comes y te diré qué bacterias tienes', 'Blanca García-Orea Haro', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/epubs/Dime_que_comes_y_te_dire_que_bacterias_tienes_Audiolibro_de_Blanca.epub?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL2VwdWJzL0RpbWVfcXVlX2NvbWVzX3lfdGVfZGlyZV9xdWVfYmFjdGVyaWFzX3RpZW5lc19BdWRpb2xpYnJvX2RlX0JsYW5jYS5lcHViIiwiaWF0IjoxNzMwMDA5NTcwLCJleHAiOjE3NjE1NDU1NzB9.958MGnFnxL_hr_aPwe5D6W7FAW6N8YhDuvSNRIDo1Fs&t=2024-10-27T06%3A12%3A49.679Z', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/imgs/Dime_que_comes_y_te_dire_que_bacterias_tienes_Audiolibro_de_Blanca.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL2ltZ3MvRGltZV9xdWVfY29tZXNfeV90ZV9kaXJlX3F1ZV9iYWN0ZXJpYXNfdGllbmVzX0F1ZGlvbGlicm9fZGVfQmxhbmNhLmpwZyIsImlhdCI6MTczMDAwOTcxOCwiZXhwIjoxNzYxNTQ1NzE4fQ.--sYwa2py_Vw9O6R2jzjb7RDAOJIQ6hiTE9Vi20UEvo&t=2024-10-27T06%3A15%3A18.176Z', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/tracks/Dime_que_comes_y_te_dire_que_bacterias_tienes_Audiolibro_de_Blanca.opus?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL3RyYWNrcy9EaW1lX3F1ZV9jb21lc195X3RlX2RpcmVfcXVlX2JhY3Rlcmlhc190aWVuZXNfQXVkaW9saWJyb19kZV9CbGFuY2Eub3B1cyIsImlhdCI6MTczMDAwOTQyMywiZXhwIjoxNzYxNTQ1NDIzfQ.pPppISWXKCXbHqavE4cSzKIOX_du95bYKpoJvmrquQk&t=2024-10-27T06%3A10%3A22.516Z'),
    ('Diferencias entre virus, bacterias y hongos', 'Dr. Elena R. Martínez', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/epubs/bacteriasVirus.epub?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL2VwdWJzL2JhY3Rlcmlhc1ZpcnVzLmVwdWIiLCJpYXQiOjE3MzAwMDk1MzcsImV4cCI6MTc2MTU0NTUzN30.npRfsoZrV9ySPOlXUvazUZoHNK_MNPQLGFfIdLz2PF8&t=2024-10-27T06%3A12%3A17.074Z', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/imgs/bacteriasVirus.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL2ltZ3MvYmFjdGVyaWFzVmlydXMuanBnIiwiaWF0IjoxNzMwMDA5NDU5LCJleHAiOjE3NjE1NDU0NTl9.eQKd823_FhkjSJS6qFFsN9Wswq5g9JOIIPr3qpXfIDs&t=2024-10-27T06%3A10%3A58.946Z', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/tracks/bacteriasVirus.opus?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL3RyYWNrcy9iYWN0ZXJpYXNWaXJ1cy5vcHVzIiwiaWF0IjoxNzMwMDA5MzM4LCJleHAiOjE3NjE1NDUzMzh9.I4i-Owj5m4yORdkcenLpyzA9wcGyBDHdZxndaT3qIwo&t=2024-10-27T06%3A08%3A57.549Z'),
    ('El cancer no es una enfermedad', 'Dr. Andreas Morizt', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/epubs/cancer.epub?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL2VwdWJzL2NhbmNlci5lcHViIiwiaWF0IjoxNzMwMDA5NTU4LCJleHAiOjE3NjE1NDU1NTh9.ypWWeYsVb7VhUMijWKV3aDPqdmHGenLMFogjmrjT6a4&t=2024-10-27T06%3A12%3A37.661Z', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/imgs/cancer.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL2ltZ3MvY2FuY2VyLmpwZyIsImlhdCI6MTczMDAwOTQ3OCwiZXhwIjoxNzYxNTQ1NDc4fQ.YG_7CldaA55t9tN8IHHL2AqwKG7-pQ1vfeXuIZb1VKk&t=2024-10-27T06%3A11%3A17.380Z', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/tracks/cancer.opus?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL3RyYWNrcy9jYW5jZXIub3B1cyIsImlhdCI6MTczMDAwOTQxNCwiZXhwIjoxNzYxNTQ1NDE0fQ.J7bWGuMgkaknrvomPyeZ9SkpnyjeV4vixymqZ94YBf8&t=2024-10-27T06%3A10%3A13.509Z'),
    ('¿La marihuana es mala para el cerebro?', 'Mikel Alonso', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/epubs/marihuana.epub?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL2VwdWJzL21hcmlodWFuYS5lcHViIiwiaWF0IjoxNzMwMDA5NTc3LCJleHAiOjE3NjE1NDU1Nzd9.qmc0X1MIr7Kyoeyq7O7VUFxveLGw4qjAPtIattoL7NY&t=2024-10-27T06%3A12%3A57.053Z', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/imgs/marihuana.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL2ltZ3MvbWFyaWh1YW5hLmpwZyIsImlhdCI6MTczMDAwOTUwMywiZXhwIjoxNzYxNTQ1NTAzfQ.UlF9E3AxWYvYaLyD8J__sRNfWxSa9MKWW18y2VLHThA&t=2024-10-27T06%3A11%3A42.865Z', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/tracks/marihuana.opus?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL3RyYWNrcy9tYXJpaHVhbmEub3B1cyIsImlhdCI6MTczMDAwOTQzMywiZXhwIjoxNzYxNTQ1NDMzfQ.FnlnnfgIvDXGich6AjstNIfvxjf3PBZhprdNV5PV0EM&t=2024-10-27T06%3A10%3A32.916Z'),
    ('Pandemia, Epidemia y Endemia', 'Dr. Ignacio Lopez -Goñi', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/epubs/virusPandemias.epub?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL2VwdWJzL3ZpcnVzUGFuZGVtaWFzLmVwdWIiLCJpYXQiOjE3MzAwMDk1OTEsImV4cCI6MTc2MTU0NTU5MX0.BFBC_6xIJetzPaz0uqwH92MC-aZ4XPXQsGuC5rKC5o4&t=2024-10-27T06%3A13%3A10.526Z', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/imgs/virusPandemias.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL2ltZ3MvdmlydXNQYW5kZW1pYXMuanBnIiwiaWF0IjoxNzMwMDA5NTI4LCJleHAiOjE3NjE1NDU1Mjh9.JL7gK2uhp-I8a6NrPZiqR2WdQMZRddDaky2-Ua-cZys&t=2024-10-27T06%3A12%3A08.121Z', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/tracks/virusPandemias.opus?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL3RyYWNrcy92aXJ1c1BhbmRlbWlhcy5vcHVzIiwiaWF0IjoxNzMwMDA5NDQzLCJleHAiOjE3NjE1NDU0NDN9.-QC4cRNS1z7exwWUOhTOzlf9Z1L_fa8cCVhG9ZQD5TU&t=2024-10-27T06%3A10%3A42.451Z');

INSERT INTO ESTRENO (nombre, autor, url_portada) VALUES
    ('Vacunas Verdades mentiras y controversia', 'Peter C Gotzsche', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/imgs/vacunas-verdades-mentiras-y-controversia-int.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL2ltZ3MvdmFjdW5hcy12ZXJkYWRlcy1tZW50aXJhcy15LWNvbnRyb3ZlcnNpYS1pbnQuanBnIiwiaWF0IjoxNzMwMDA5NTE2LCJleHAiOjE3NjE1NDU1MTZ9.BJymZPXGcL2pc7Dt3FliS1o4sznCrQooxWKc6vFNFR0&t=2024-10-27T06%3A11%3A56.244Z'),
    ('¡Es la microbiota, idiota!', 'Sari Arponen', 'https://ehtxpvdysxarrsjrnxxx.supabase.co/storage/v1/object/sign/uploads/imgs/Es_la_microbiota,_idiota!_Alienta_Descubre_de_Sari_Arponen_Vista.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1cGxvYWRzL2ltZ3MvRXNfbGFfbWljcm9iaW90YSxfaWRpb3RhIV9BbGllbnRhX0Rlc2N1YnJlX2RlX1NhcmlfQXJwb25lbl9WaXN0YS5qcGciLCJpYXQiOjE3MzAwMDk0OTIsImV4cCI6MTc2MTU0NTQ5Mn0.TsJXFvUvyV6oTL19zvsF3CwgFPZGxjnYadovR8TzBSo&t=2024-10-27T06%3A11%3A31.723Z');

-- INSERT INTO VISUALIZACION (id_contenido, fecha)
-- SELECT
--     c.id AS id_contenido,
--     (CURRENT_DATE - INTERVAL '70 days' * RANDOM())::DATE AS fecha
-- FROM CONTENIDO c,
--     GENERATE_SERIES(1, (FLOOR(RANDOM() * 100 + 1))::INT) AS s;

UPDATE CONTENIDO
SET fecha_subida = (
    DATE '2024-08-01' + (RANDOM() * (DATE '2024-10-10' - DATE '2024-08-01'))::INT
);
