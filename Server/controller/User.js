const { User } = require("../model/User");

exports.fetchUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(
      id,
      "name email id addresses orders"
    ).exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err) {
    console.log({ err });
    res.status(400).json(err);
  }
};
