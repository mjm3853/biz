import { useState, useEffect, useCallback } from "react";
import { useDatabase } from "./useDatabase";
import { getNotes, insertNote, updateNote, deleteNote } from "../db/queries";
import type { NoteRow } from "../db/queries";

export function useNotes(ideaId: string) {
  const { db, save } = useDatabase();
  const [notes, setNotes] = useState<NoteRow[]>([]);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!db) return;
    setNotes(getNotes(db, ideaId));
  }, [db, ideaId, version]);

  const addNote = useCallback(
    (title: string, content: string, noteType: string) => {
      if (!db) return;
      insertNote(db, ideaId, title, content, noteType);
      save();
      setVersion((v) => v + 1);
    },
    [db, ideaId, save]
  );

  const editNote = useCallback(
    (noteId: number, title: string, content: string) => {
      if (!db) return;
      updateNote(db, noteId, title, content);
      save();
      setVersion((v) => v + 1);
    },
    [db, save]
  );

  const removeNote = useCallback(
    (noteId: number) => {
      if (!db) return;
      deleteNote(db, noteId);
      save();
      setVersion((v) => v + 1);
    },
    [db, save]
  );

  return { notes, addNote, editNote, removeNote };
}
