import { Router } from "express";
import { libro } from "./controller.js";

export const router = Router();

router.get("/libros", libro.getAll);
router.get("/libro/:id", libro.getOne);
router.post("/libro", libro.add);
router.put("/libro", libro.update);