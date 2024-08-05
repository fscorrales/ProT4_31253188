import { pool } from "./database.js";

class LibroController { 
    async getAll(req, res) {
        try {
            console.log('Trayendo todos los libros...');
            const [rows] = await pool.query("SELECT * FROM libros");
            console.log('Libros recibidos:', rows);
            res.json(rows);
        } catch (error) {
            console.error('Error al recibir libros:', error);
            res.status(500);
            res.send(error.message);
        }
    }

    async getOneByPath(req, res) {
        const isbn = req.params.isbn;
        try {
            const [rows] = await pool.query("SELECT * FROM libros WHERE isbn = ?", [isbn]);
            res.json(rows[0]);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
    
    async getOneByQuery(req, res) {
        const libro = req.body;
        try {
            const [rows] = await pool.query("SELECT * FROM libros WHERE isbn = ?", [libro.isbn]);
            res.json(rows[0]);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
    
    async add(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query(
                "INSERT INTO libros (nombre, autor, categoria, fecha, ISBN) VALUES (?, ?, ?, ?, ?)",
                [libro.nombre, libro.autor, libro.categoria, libro.fecha, libro.isbn]
            );
            res.json({ id: result.insertId, ...libro });
        } catch (error) {
            res.status(404);
            res.send(error.message);
        }
    }

    async update(req, res) {
        const libro = req.body;
        try {
            const [result] = await pool.query(
                "UPDATE libros SET nombre = (?), autor = (?), categoria = (?), fecha = (?) WHERE isbn = (?)", 
                [libro.nombre, libro.autor, libro.categoria, libro.fecha, libro.isbn]
            );
            res.json({"Registros actualizados":result.affectedRows});
        } catch (error) {
            res.status(404);
            res.send(error.message);
        }
    }

    async deleteByPath(req, res) {
        const isbn = req.params.isbn;
        try {
            const [result] = await pool.query("DELETE FROM libros WHERE isbn = ?", [isbn]);
            res.json({"Registros eliminados":result.affectedRows});
        } catch (error) {
            res.status(404);
            res.send(error.message);
        }
    }

    async deleteByQuery(req, res) {
        const libro = req.body;
        try {
            const [result] = await pool.query(
                "DELETE FROM libros WHERE isbn = ?", 
                [libro.isbn]
            );
            res.json({"Registros eliminados":result.affectedRows});
        } catch (error) {
            res.status(404);
            res.send(error.message);
        }
    }
}

export const libro = new LibroController();