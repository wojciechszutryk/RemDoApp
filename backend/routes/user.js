const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.route("/register").post(async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log(userName, email, password);

    if (!(email && password && userName)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
