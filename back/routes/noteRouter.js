const router = require("express").Router();

router
  .route("/") //
  .get((req, res) => res.json({ msg: "test note" }))
  .post();

router
  .route("/:id") //
  .get()
  .put()
  .delete();

module.exports = router;
