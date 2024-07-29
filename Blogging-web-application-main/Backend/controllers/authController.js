import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register a user
export const registerUser = async (req, res) => {
  const { email, password, user_name } = req.body;
  try {
    //Check if user already exists
    const q = "SELECT * FROM user WHERE email = ?";

    db.query(q, [email, user_name], (err, result) => {
      if (err) return res.json(err);
      if (result.length > 0)
        return res
          .status(409)
          .json({ message: "User already exists", status: "error" });
      // throw new Error("User already exists");

      //Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const Hash = bcrypt.hashSync(password, salt);

      const q =
        "INSERT INTO user (email, password, user_name) VALUES (?, ?, ?)";
      db.query(q, [email, Hash, user_name], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: "User created", status: "success" });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(err);
  }
};

//Login a user
export const loginUser = async (req, res) => {
 
  const { email, password } = req.body;
  try {
    //check user exists
    const q = "SELECT * FROM user WHERE email = ?";
    db.query(q, [email], (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" });
      }
      if (result.length === 0)
        return res.status(404).json({ message: "User not found" });

      //check password is correct or not
      const user = result[0];
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) return res.json({ message: "Invalid Credentials","status":"error" });
      const token = generateToken(user.iduser);
      return res.status(200).json({ message: "login", "status":"success",token});
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error","status":"error"});
  }
};

//Logout a user
export const logout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    return res.json({ message: "Logout success" }); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//Generating a JWT token for login user
const generateToken = (id) => {
  const payload = { id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
  return token;
};
