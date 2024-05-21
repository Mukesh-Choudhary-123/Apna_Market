const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res.status(201).json({ id: doc.id, role: doc.role });
  } catch (err) {
    console.log({ err });
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { email: req.body.email },
      "id email name  password role"
    );
    if (!user) {
      res.status(401).json({ message: "User not found" });
    } else if (user.password === req.body.password) {
      res.status(201).json({
        id: user.id,
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "Wrong Password" });
    }
  } catch (err) {
    console.log({ err });
    res.status(400).json(err);
  }
};
