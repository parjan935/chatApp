const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const bcrypt = require("bcryptjs");
const { jwtMiddleWare, generateToken } = require("../middleWare/jwt");

const registerUser = async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(user.passWord, 10);
    const newUser = new User({
      ...user,
      passWord: hashedPassword,
    });

    const savedUser = await newUser.save();

    const payload = {
      id: savedUser.id,
      userName: savedUser.userName,
    };

    const token = generateToken(payload);

    return res.status(200).json({
      message: "Successful Registration",
      savedUser,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

const authorizeUser = async (req, res) => {
  try {
    console.log("API HITTED");
    const { userName, passWord } = req.body;
    console.log(req.body);
    const user = await User.findOne({ userName });
    if (!user) {
      console.log("user not found");
      return res
        .status(400)
        .json({ success: false, message: "User not found. Please register." });
    }

    const isMatch = await bcrypt.compare(passWord, user.passWord);
    if (!isMatch) {
      console.log("wrong password");
      return res.status(400).json({ message: "Password not matching" });
    }

    const payload = {
      id: user.id,
      userName: user.userName,
    };

    const token = generateToken(payload);
    // console.log(token )

    return res.status(200).json({
      success: true,
      message: "Log in successful",
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: "User not found" });
  }
};

const getUsers = async (req, res) => {
  try {
    console.log("In getUsers");
    const { userName } = req.user;
    const users = await User.find(
      { userName: { $ne: userName } },
      { userName: 1, MobileNo: 1, _id: 0 }
    );
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "User not authunicated" });
  }
};
const createChat = async (req, res) => {
  console.log("In createChat");
  try {
    console.log(req.body);
    const { userName } = req.body;
    const user1 = req.user;
    const user2 = await User.findOne({ userName: userName }, { _id: 1 });
    console.log(user2);
    if (!user2) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    const chat = await Chat.findOne({
      $and: [
        { isGroupChat: false },
        { admin: user1.id },
        {
          $expr: { $eq: [{ $arrayElemAt: ["$users", 1] }, user2._id] },
        },
      ],
    });

    if (chat) {
      return res.status(200).json({ chat });
    }
    console.log("new chat");

    const newChat = new Chat({
      name: userName,
      isGroupChat: false,
      users: [user1.id, user2._id],
      admin: user1.id,
    });

    const savedChat = await newChat.save();

    return res.status(200).json({
      message: "Chat created Successfully",
      savedChat,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Error creating chat." });
  }
};

const createGroupChat = async (req, res) => {
  try {
    const admin = req.user;
    const data = req.body;
    const users = await User.find(
      { userName: { $in: data.users } },
      { _id: 0 }
    );

    const newGroupChat = new Chat({
      name: data.name,
      isGroupChat: true,
      users: users,
      admin: admin._id,
    });

    const savedGroupChat = await newGroupChat.save();

    return res.status(200).json({
      message: "Group chat created Successfully",
      savedGroupChat,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Error creating group chat." });
  }
};

module.exports = {
  registerUser,
  authorizeUser,
  getUsers,
  createChat,
  createGroupChat,
};
