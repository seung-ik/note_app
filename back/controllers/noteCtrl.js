const Notes = require("../models/noteModel");

const noteCtrl = {
  getNotes: async (req, res) => {
    try {
      const notes = await Notes.find({ user_id: req.user.id });
      res.json(notes);
    } catch (err) {
      if (err) res.status(500).json({ msg: err.message });
    }
  },
  createNotes: async (req, res) => {
    try {
      const { title, content, date } = req.body;

      const newNote = new Notes({
        title,
        content,
        date,
        user_id: req.user.id,
        name: req.user.name,
      });

      await newNote.save();
      res.json({ msg: "Create a note" });
    } catch (err) {
      if (err) res.status(500).json({ msg: err.message });
    }
  },
  deleteNotes: async (req, res) => {
    try {
      await Notes.findByIdAndDelete(req.params.id);
      res.json({ msg: "Delete a note" });
    } catch (err) {
      if (err) res.status(500).json({ msg: err.message });
    }
  },
  updateNotes: async (req, res) => {
    try {
      const { title, content, date } = req.body;
      await Notes.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          content,
          date,
        }
      );
      res.json({ msg: "Update a Note" });
    } catch (err) {
      if (err) res.status(500).json({ msg: err.message });
    }
  },
  getNote: async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);
      res.json(note);
    } catch (err) {
      if (err) res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = noteCtrl;
