CREATE OR REPLACE FUNCTION buscar_contenido_por_nombre_o_autor(pattern TEXT)
RETURNS TABLE(id INT, nombre VARCHAR) AS $$
BEGIN
    RETURN QUERY
    SELECT c.id, c.nombre
    FROM CONTENIDO c
    WHERE c.nombre ~* pattern OR c.autor ~* pattern;
END;
$$ LANGUAGE plpgsql;

-- prueba
