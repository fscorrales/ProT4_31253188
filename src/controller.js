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

    async getOne(req, res) {
        try {
            const [rows] = await pool.query("SELECT * FROM libros WHERE id = ?", [req.params.id]);
            res.json(rows[0]);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }   
}

export const libro = new LibroController();