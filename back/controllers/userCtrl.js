const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  registerUser: async (req, res) => {
    try {
      const { email, password, username } = req.body;

      const user = await Users.findOne({ email: email });
      if (user) return res.status(400).json({ msg: "The email already exist" });

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        email: email,
        username: username,
        password: passwordHash,
      });

      await newUser.save();
      res.json({ msg: "Sign up Success" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "user does not exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrected password" });

      //if login success make token
      const payload = { id: user._id, name: user.username };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  verifiedToken: (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.send(false);

      jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
        if (err) return res.send(false);

        const user = await Users.findById(verified.id);
        if (!user) return res.send(false);

        return res.send(true);
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
