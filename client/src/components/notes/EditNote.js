import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const EditNote = ({ match }) => {
  const history = useHistory();
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    id: "",
  });

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("tokenStorage");
      if (match.params.id) {
        const res = await axios.get(`/api/notes/${match.params.id}`, {
          headers: { Authorization: token },
        });

        setNote({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date).toLocaleDateString,
          id: res.data._id,
        });
      }
    };
    getNote();
  }, [match.params.id]);

  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStorage");
      if (token) {
        const { title, content, date, id } = note;
        const newNote = {
          title,
          content,
          date,
        };

        await axios.put(`/api/notes/${id}`, newNote, {
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
      <h2>Edit Note</h2>
      <form autoComplete="off" onSubmit={editNote}>
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

export default EditNote;
