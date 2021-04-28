import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateNote = () => {
  const history = useHistory();
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
  });

  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const createNote = async (e) => {
    e.preventDefault();
    console.log("ok");
    try {
      const token = localStorage.getItem("tokenStorage");
      if (token) {
        const { title, content, date } = note;
        const newNote = {
          title,
          content,
          date,
        };

        await axios.post("/api/notes", newNote, {
          headers: { Authorization: token },
        });

        return history.push("/");
      }
    } catch (err) {
      window.location.href = "/";
    }
  };
  return (
    <div className="create-note">
      <h2>Create Note</h2>
      <form autoComplete="off" onSubmit={createNote}>
        <div className="row">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={note.title} name="title" required onChange={onchangeInput} />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea type="text" id="content" value={note.content} name="content" required rows="10" onChange={onchangeInput} />
        </div>

        <label htmlFor="date">Date : {note.date}</label>
        <div className="row">
          <input type="date" id="date" value={note.date} name="date" required onChange={onchangeInput} />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateNote;
