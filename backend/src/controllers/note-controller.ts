import { catchAsync } from "../utils/catch-async";
import express from "express";
import * as noteService from "../services/note-service";

export const createNote = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const note = await noteService.createNote(req.userId!, req.body);

    res.status(201).json({
      success: true,
      data: { note },
    });
  },
);

export const getNotes = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const includeArchived = req.query.includeArchived === "true";
    const notes = await noteService.getNotes(req.userId!, includeArchived);

    res.status(200).json({
      success: true,
      data: { notes },
    });
  },
);

export const getNoteById = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const note = await noteService.getNoteById(
      req.userId!,
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      data: { note },
    });
  },
);

export const updateNoteById = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const note = await noteService.updateNoteById(
      req.userId!,
      req.params.id as string,
      req.body,
    );

    res.status(200).json({
      success: true,
      data: { note },
    });
  },
);

export const toggleArchive = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const note = await noteService.toggleArchive(
      req.userId!,
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      data: { note },
    });
  },
);

export const togglePin = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const note = await noteService.togglePinned(
      req.userId!,
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      data: { note },
    });
  },
);

export const deleteNote = catchAsync(
  async (req: express.Request, res: express.Response) => {
    await noteService.deleteNote(req.userId!, req.params.id as string);

    res.status(204).send();
  },
);

export const searchNotes = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const query = req.query.q as string;

    if (!query || query.trim().length === 0) {
      res.status(400).json({
        success: true,
        message: "Search query is required",
      });
    }

    const notes = await noteService.searchNotes(req.userId!, query);

    res.status(200).json({
      success: true,
      data: { notes },
    });
  },
);

export const getTagFrequency = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const tags = await noteService.getTagFrequency(req.userId!);

    res.status(200).json({
      success: true,
      data: { tags },
    });
  },
);

export const getCategoryBreakdown = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const breakdown = await noteService.getCategoryBreakdown(req.userId!)

    res.status(200).json({
      success: true,
      data: {breakdown}
    })
  },
);
