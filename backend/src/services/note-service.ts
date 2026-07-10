import { Activity, ActivityAction } from "../models/Activity";
import { Note } from "../models/Note";
import { ApiError } from "../utils/api-error";

interface CreateNoteInput {
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  color?: string;
}

interface UpdateNoteInput {
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
  color?: string;
}

export async function logActivity(
  userId: string,
  noteId: string,
  action: ActivityAction,
  metadata?: Record<string, unknown>,
) {
  await Activity.create({ user: userId, note: noteId, action, metadata });
}

export async function createNote(userId: string, input: CreateNoteInput) {
  const note = await Note.create({
    ...input,
    owner: userId,
  });

  await logActivity(userId, String(note._id), "created");

  return note;
}

export async function getNotes(
  userId: string,
  includeArchived: boolean = false,
) {
  const filter: Record<string, unknown> = { owner: userId };

  if (!includeArchived) {
    filter.isArchived = false;
  }

  const allNotes = await Note.find(filter)
    .populate("category", "name color")
    .sort({ isPinned: -1, updatedAt: -1 });

  return allNotes;
}

export async function getNoteById(userId: string, noteId: string) {
  const note = await Note.findOne({ _id: noteId, owner: userId }).populate(
    "category",
    "name color",
  );

  if (!note) {
    throw new ApiError(404, "Note with given id not found");
  }

  return note;
}

export async function updateNoteById(
  userId: string,
  noteId: string,
  input: UpdateNoteInput,
) {
  const note = await Note.findOne({ _id: noteId, owner: userId });

  if (!note) {
    throw new ApiError(404, "Note with given id not found");
  }

  const changeFields = Object.keys(input);

  Object.assign(note, input);
  await note.save();

  await logActivity(userId, noteId, "updated", { fieldsChanged: changeFields });

  return note;
}

export async function toggleArchive(userId: string, noteId: string) {
  const note = await Note.findOne({ _id: noteId, owner: userId });

  if (!note) {
    throw new ApiError(404, "Note with given id not found");
  }

  note.isArchived = !note.isArchived;
  await note.save();

  await logActivity(
    userId,
    noteId,
    note.isArchived ? "archived" : "unarchived",
  );

  return note;
}

export async function togglePinned(userId: string, noteId: string) {
  const note = await Note.findOne({ _id: noteId, owner: userId });

  if (!note) {
    throw new ApiError(404, "Note with given id not found");
  }

  note.isPinned = !note.isPinned;
  await note.save();

  await logActivity(userId, noteId, note.isPinned ? "pinned" : "unpinned");

  return note;
}

export async function deleteNote(userId: string, noteId: string) {
  const note = await Note.findOneAndDelete({ _id: noteId, owner: userId });
  if (!note) {
    throw new ApiError(404, "Note not found");
  }
  await logActivity(userId, noteId, "deleted");
}

export async function searchNotes(userId: string, query: string) {
  return await Note.find(
    {
      owner: userId,
      $text: { $search: query },
    },
    {
      score: { meta: "textscore" },
    },
  ).sort({ score: { $meta: "textscore" } });
}
