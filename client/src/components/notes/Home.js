import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  const getNotes = useCallback(async (token) => {
    const res = await axios.get("/api/notes", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  }, []);

  const deleteNote = useCallback(async (id) => {
    try {
      if (token) {
        await axios.delete(`/api/delete/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (err) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("tokenStorage");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);
  return (
    <div className="note-wrapper">
      {notes.map((note) => (
        <div className="card" key={note._id}>
          <h4>{note.title}</h4>
          <div className="text-wrapper">
            <p>{note.content}</p>
          </div>
          <p className="date">{format(note.date)}</p>
          <div className="card-footer">
            {note.name} <Link to={`/edit/${note._id}`}>Edit</Link>
          </div>
          <button className="close" onClick={() => deleteNote(note._id)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
