const router = require("express").Router();
const auth = require("../middleware/auth");
const noteCtrl = require("../controllers/noteCtrl");

router
  .route("/") //
  .get(auth, noteCtrl.getNotes)
  .post(auth, noteCtrl.createNotes);

router
  .route("/:id") //
  .get(auth, noteCtrl.getNote)
  .put(auth, noteCtrl.updateNotes)
  .delete(auth, noteCtrl.deleteNotes);

module.exports = router;
