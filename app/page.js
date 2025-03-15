"use client";
import React, { useState, useEffect } from "react";
import Card from "./components/notes";
import {
  fetchNotes,
  addNote,
  deleteNote,
  updateNote,
} from "../service/noteApp";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editNote, setEditNote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await fetchNotes();
        console.log("Fetched Notes:", data); // Debug: Check note structure here
        setNotes(data);
      } catch (error) {
        setError("Failed to fetch notes. Please try again later.");
        console.error("Error fetching notes:", error);
      }
    };
    getNotes();
  }, []);

  const handleAddNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      setError("Title and content cannot be empty.");
      return;
    }
    try {
      const data = await addNote(newNote);
      console.log("Added Note:", data); // Debug: Check returned note structure
      setNotes([...notes, data]);
      setNewNote({ title: "", content: "" });
      setError("");
    } catch (error) {
      setError("Failed to add note. Please try again.");
      console.error("Error adding note:", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    console.log("Deleting Note ID:", noteId);
    if (!noteId) {
      setError("Invalid Note ID.");
      return;
    }
    try {
      await deleteNote(noteId);
      setNotes(notes.filter((note) => {
        const currentId = note.id || note._id;
        return currentId !== noteId;
      }));
      setError("");
    } catch (error) {
      setError("Failed to delete note. Please try again.");
      console.error("Error deleting note:", error);
    }
  };

  const handleUpdateNote = async () => {
    // Check for either `id` or `_id`
    const noteId = editNote?.id || editNote?._id;
    if (!editNote || !noteId) {
      setError("Invalid note selection for update.");
      return;
    }

    if (!newNote.title.trim() || !newNote.content.trim()) {
      setError("Title and content cannot be empty.");
      return;
    }

    try {
      console.log("Updating Note ID:", noteId);
      const data = await updateNote(noteId, newNote);
      setNotes(
        notes.map((note) => {
          const currentId = note.id || note._id;
          return currentId === noteId ? data : note;
        })
      );
      setEditNote(null);
      setNewNote({ title: "", content: "" });
      setError("");
    } catch (error) {
      setError("Failed to update note. Please try again.");
      console.error("Error updating note:", error);
    }
  };

  const handleEditClick = (note) => {
    setEditNote(note);
    setNewNote({ title: note.title, content: note.content });
  };

  return (
    <div>
      <h1 className="text-green-900 text-2xl underline">
        Practice Project for DevOps
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) =>
            setNewNote({ ...newNote, title: e.target.value })
          }
          className="border p-2 m-2"
        />
        <input
          type="text"
          placeholder="Content"
          value={newNote.content}
          onChange={(e) =>
            setNewNote({ ...newNote, content: e.target.value })
          }
          className="border p-2 m-2"
        />
        <button
          onClick={editNote ? handleUpdateNote : handleAddNote}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {editNote ? "UPDATE NOTE" : "ADD NOTE"}
        </button>
      </div>
      <div className="flex flex-wrap">
        {notes.map((note) => {
          const noteId = note.id || note._id; // Use whichever field exists
          return (
            <div key={noteId || Math.random()} className="m-2 p-2 border rounded">
              <Card title={note.title} content={note.content} />
              <button
                onClick={() => handleEditClick(note)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded m-1"
              >
                EDIT
              </button>
              <button
                onClick={() => handleDeleteNote(noteId)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded m-1"
              >
                DELETE
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
