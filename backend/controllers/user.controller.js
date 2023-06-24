const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const xlsx = require("xlsx");
const fs = require("fs");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    // console.log(user, "userrrrrrrrr");
    //create a token
    const token = createToken(user._id);
    const permissions = user?.role?.permissions ?? [] ;
    const response = { email, token, permissions };
    res.status(200).json({ ...response });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

//register user
async function register(req, res) {
  const { firstName, lastName, email, mobileNo, password } = req.body;

  try {
    // console.log(req.body, "user body");

    const user = await userModel.register(
      firstName,
      lastName,
      email,
      password,
      mobileNo
    );

    //create a token
    const token = createToken(user._id);

    res.status(201).json({ email, token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getAllUsers(req, res) {
  try {
    // const users = await userModel.find()
    const users = await userModel.aggregate([
      {
        $project: {
          name: { $concat: ["$firstName", " ", "$lastName"] },
          email: 1,
          mobileNo: 1,
          firstName: 1,
          lastName: 1,
          // Include other fields you need
        },
      },
    ]);
    res.status(200).send({ status: true, data: users });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, mobileNo, password, meterNumbers, role } =
    req.body;

  try {
    // Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if they are provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (mobileNo) user.mobileNo = mobileNo;
    if (password) user.password = password;
    if (role) user.role = role;
    if (meterNumbers) {
      // Read the .xlsx file
      if (!req.file) {
        return res.status(400).json({ message: "No files were uploaded." });
      }
      const file = req.file;
      // Validate file type
      if (
        file.mimetype !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        return res
          .status(400)
          .json({ message: "Please upload a valid XLSX file." });
      }
      const filePath = file.path;
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Extract the meter numbers from the worksheet
      const meterNumbers = xlsx.utils
        .sheet_to_json(worksheet, { header: "METER_NOS" })
        .map((row) => row["METER_NOS"]);
      // Assign the meter numbers to the user
      user.meterNumbers = meterNumbers;
      //adding meter no.s to corrsponding user, & that user can see only those readings
      user.meterNumbers = meterNumbers;

      fs.unlinkSync(filePath);
    }

    // Save the updated user
    const updatedUser = await user.save();

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

module.exports = { login, register, getAllUsers, updateUser };
