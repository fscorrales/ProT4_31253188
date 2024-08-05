# Talentos Digitales - Trabajo Integrador IV
Clonar repositorio o renombrar carpeta al descargar el .zip (quitar el -main)

## Base de datos SQL en (importarla):
 - Raiz del proyecto (/corrales_biblioteca.sql)

## Consignas del trabajo:
 1. Definir el esquema de la base de datos de acuerdo al diagrama proporcionado.
 2. Cargar un lote de datos de prueba a la base de datos.
 3. Desarrollar una REST API que implemente la lectura de los datos ingresados
 - Obtener todos los libros (getAll) y obtener un libro de acuerdo al número de identificación (id) proporcionado (getOne).
 - Crear un libro incluyendo las características del modelo de datos.
 - Actualizar un libro.
 - Eliminar un libro proporcionando su ISBN.
 - Implementar el manejo de excepciones (try-catch) al recibir solicitudes incompatibles (ver video en tramo 4). Por ejemplo, que en el alta se envíen atributos inexistentes en el modelo de datos (precio, stock, etc.), editar o eliminar con ISBN de un libro no cargado, entre otras.
