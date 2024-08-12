import { Router } from "express";
import { libro } from "./controller.js";

export const router = Router();

router.get("/libros", libro.getAll);
router.get("/libro/:id", libro.getOneByPathname);
router.get("/libro", libro.getOneByQuery);
router.post("/libro", libro.add);
router.put("/libro", libro.update);
router.delete("/libro/:isbn", libro.deleteByPath);
router.delete("/libro", libro.deleteByQuery);