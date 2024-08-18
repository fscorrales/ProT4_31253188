import { pool } from "./database.js";

class LibroController { 
    async getAll(req, res) {
        // Obtener todos los libros
        try {
            const [rows] = await pool.query("SELECT * FROM libros");
            // Validar que hay libros
            if (rows.length === 0) {
                return res.status(500).json({
                    message: "No hay libros en la base de datos"
                });
            }
            console.log('Trayendo todos los libros...');
            console.log('Libros recibidos:', rows);
            res.json(rows);
        } catch (error) {
            console.error('Error al recibir libros:', error);
            res.status(500);
            res.send(error.message);
        }
    }

    async getOneByPathname(req, res) {
        try {
            const id = parseInt(req.params.id);
            // Validar que el id sea un entero
            if (isNaN(id) || !Number.isInteger(id)) {
                res.status(400).json({ message: 'El id debe ser un entero' });
                return;
            }
            const [rows] = await pool.query("SELECT * FROM libros WHERE id = ?", [id]);
            // Validar que hay libros con ese id
            if (rows.length === 0) {
                res.status(404).json({ message: `No se encontró el libro con id ${id}` });
              } else {
                res.json(rows[0]);
              }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
    
    async getOneByQuery(req, res) {
        try {
            // Validar que el body tenga id
            if(!req.body.id){
                res.status(400).json({ message: 'El campo id debe estar presente en el body' });
                return;
            }
            const id = parseInt(req.body.id);
            // Validar que el id sea un entero
            if (isNaN(id) || !Number.isInteger(id)) {
                res.status(400).json({ message: 'El id debe ser un entero' });
                return;
            }
            const [rows] = await pool.query("SELECT * FROM libros WHERE id = ?", [id]);
            // Validar que hay libros con ese id
            if (rows.length === 0) {
                res.status(404).json({ message: `No se encontró el libro con id ${id}` });
              } else {
                res.json(rows[0]);
              }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
    
    async add(req, res) {
        try {
            const libro = req.body;
            
            // Validar que los campos sean correctos
            const fields = ["id", "nombre", "autor", "categoria", "ano_publicacion", "isbn"];
            const invalidFields = Object.keys(libro).filter(field => !fields.includes(field));
            if (invalidFields.length > 0) {
                return res.status(400).json({
                    message: `Los campos ${invalidFields.join(", ")} no son válidos. 
                    Los únicos permitidos son: ${fields.join(", ")}`
                });
            }

            // Validar que todos los campos sean obligatorios
            if(
                !libro.nombre || !libro.autor || !libro.categoria || 
                !libro.ano_publicacion || !libro.isbn
            ) {
                return res.status(400).json({
                    message: "Todos los campos son obligatorios"
                });
            }

            // Validar que ningun campo tenga string vacio o sea ''
            if(libro.nombre.trim() === '' || libro.autor.trim() === '' || libro.categoria.trim() === '' || libro.ano_publicacion.trim() === '' || libro.isbn.trim() === '') {
                return res.status(400).json({
                    message: "No se permiten strings vacíos o con espacios en blanco"
                });
            }
            
            // Validar que el ISBN no este registrado
            const [isbnRows] = await pool.query("SELECT * FROM libros WHERE ISBN = ?", [libro.isbn]);
            if(isbnRows.length > 0) {
                return res.status(400).json({
                    message: "El ISBN ya está registrado"
                });
            }

            // Validar que la fecha sea válida
            const fecha = libro.ano_publicacion.split("T")[0]; // Obtener solo la parte de la fecha
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            if(!regex.test(fecha)) {
                return res.status(400).json({
                    message: "El formato de la fecha es inválido. Debe ser 'aaaa-mm-dd'"
                });
            }
            const fechaActual = new Date();
            const fechaLibro = new Date(fecha);
            if(fechaLibro > fechaActual) {
                return res.status(400).json({
                    message: "La fecha del libro no puede ser posterior a la fecha actual"
                });
            }

            // Insertar el libro
            const [result] = await pool.query(
                "INSERT INTO libros (nombre, autor, categoria, ano_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)",
                [libro.nombre, libro.autor, libro.categoria, fecha, libro.isbn]
            );
            res.json({ id: result.insertId, ...libro });
        } catch (error) {
            res.status(404);
            res.send(error.message);
        }
    }

    async update(req, res) {
        try {
            const libro = req.body;
            // Validar que los campos sean correctos
            const fields = ["id", "nombre", "autor", "categoria", "ano_publicacion", "isbn"];
            const invalidFields = Object.keys(libro).filter(field => !fields.includes(field));
            if (invalidFields.length > 0) {
                return res.status(400).json({
                    message: `Los campos ${invalidFields.join(", ")} no son válidos. 
                    Los únicos permitidos son: ${fields.join(", ")}`
                });
            }

            // Validar que todos los campos sean obligatorios
            if(
                !libro.nombre || !libro.autor || !libro.categoria || 
                !libro.ano_publicacion || !libro.isbn
            ) {
                return res.status(400).json({
                    message: "Todos los campos son obligatorios"
                });
            }

            // Validar que ningun campo tenga string vacio o sea ''
            if(libro.nombre.trim() === '' || libro.autor.trim() === '' || libro.categoria.trim() === '' || libro.ano_publicacion.trim() === '' || libro.isbn.trim() === '') {
                return res.status(400).json({
                    message: "No se permiten strings vacíos o con espacios en blanco"
                });
            }


            // Validar que el isbn exista
            const [rows] = await pool.query("SELECT * FROM libros WHERE isbn = ?", [libro.isbn]);
            if (rows.length === 0) {
                return res.status(400).json({
                    message: `El libro con ISBN ${libro.isbn} no existe`
                });
            }

            // Validar que la fecha sea válida
            const fecha = libro.ano_publicacion.split("T")[0]; // Obtener solo la parte de la fecha
            const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
            if(!regex.test(fecha)) {
                return res.status(400).json({
                    message: "El formato de la fecha es inválido. Debe ser 'aaaa-mm-dd'"
                });
            }
            const fechaActual = new Date();
            const fechaLibro = new Date(fecha);
            if(fechaLibro > fechaActual) {
                return res.status(400).json({
                    message: "La fecha del libro no puede ser posterior a la fecha actual"
                });
            }

            // Actualizar el libro
            const [result] = await pool.query(
                "UPDATE libros SET nombre = (?), autor = (?), categoria = (?), ano_publicacion = (?) WHERE isbn = (?)", 
                [libro.nombre, libro.autor, libro.categoria, fecha, libro.isbn]
            );
            res.json({"Registros actualizados":result.affectedRows});
        } catch (error) {
            res.status(404);
            res.send(error.message);
        }
    }

    async deleteByPath(req, res) {
        try {
            const isbn = req.params.isbn;
            // Validar que el isbn exista
            const [rows] = await pool.query("SELECT * FROM libros WHERE isbn = ?", [isbn]);
            if (rows.length === 0) {
                return res.status(400).json({
                    message: `El libro con ISBN ${isbn} no existe`
                });
            }
            // Borramos el libro
            const [result] = await pool.query("DELETE FROM libros WHERE isbn = ?", [isbn]);
            res.json({"Registros eliminados":result.affectedRows});
        } catch (error) {
            res.status(404);
            res.send(error.message);
        }
    }

    async deleteByQuery(req, res) {
        try {
            // Validar que el body tenga id
            if(!req.body.isbn){
                res.status(400).json({ message: 'El campo isbn debe estar presente en el body' });
                return;
            }
            const isbn = req.body.isbn;
            // Validar que el isbn exista
            const [rows] = await pool.query("SELECT * FROM libros WHERE isbn = ?", [isbn]);
            if (rows.length === 0) {
                return res.status(400).json({
                    message: `El libro con ISBN ${isbn} no existe`
                });
            }
            // Borramos el libro
            const [result] = await pool.query(
                "DELETE FROM libros WHERE isbn = ?", 
                [isbn]
            );
            res.json({"Registros eliminados":result.affectedRows});
        } catch (error) {
            res.status(404);
            res.send(error.message);
        }
    }
}

export const libro = new LibroController();