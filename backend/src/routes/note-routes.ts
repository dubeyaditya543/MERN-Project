import { Router } from "express";
import { protect } from "../middlewares/protect";
import { validate } from "../middlewares/validate";
import { createNoteSchema, noteIdParamSchema, updateNoteSchema } from "../validations/note-validation";
import { createNote, deleteNote, getNoteById, getNotes, searchNotes, toggleArchive, togglePin, updateNoteById } from "../controllers/note-controller";

const router = Router()

router.use(protect)

router.post("/", validate(createNoteSchema), createNote)
router.get("/", getNotes)
router.get("/search", searchNotes)
router.get("/:id", validate(noteIdParamSchema), getNoteById)
router.patch("/:id", validate(updateNoteSchema), updateNoteById)
router.patch("/:id/archive", validate(noteIdParamSchema), toggleArchive)
router.patch("/:id/pin", validate(noteIdParamSchema), togglePin)
router.delete("/:id", validate(noteIdParamSchema), deleteNote)

export default router