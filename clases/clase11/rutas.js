import { Router } from "express";
import { readPersonas, readAllPersonas, createPersonas, updatePersonas, deletePersonas
} from "./controladores.js"

const router = Router();

router.get("/", readAllPersonas);
router.get("/:id", readPersonas)
router.post("/", createPersonas)
router.put("/:id", updatePersonas)
router.delete("/:id", deletePersonas)

export default router;