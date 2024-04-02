const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../Models/User");


const mongoose = require('mongoose');

const createUser = async (req, res) => {
  
    
    try {
      const { fullName, userName, password, role } = req.body;
      console.log(fullName,userName,password,role)
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user instance with hashed password
      const newUser = new User({
        fullName,
        userName,
        password: hashedPassword, // Store the hashed password in the database
        role
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ success: true, message: 'User created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to create user', error: error.message });
    }
};


const getUserByUserName=async(req,res)=>{
  try {
    const userName = req.params.username;
    console.log(userName)
   
    const user = await User.findOne({ userName });
    console.log(user)

   
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user', error: error.message });
  }

}

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userid; // Assuming userId is provided as a string
    console.log(userId);

    // Parse the userId string into an ObjectId
    const documentToFind = { _id: new ObjectId(userId) };
    console.log(documentToFind)

    const user = await User.findById(documentToFind);
    console.log(user);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user', error: error.message });
  }
};



const getallUser=async (req,res)=>{
  try {
   
    const users = await User.find();
    console.log(users)

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users', error: error.message });
  }
}

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log(userName,password)

    // Check if user exists
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
    console.log(user.userName,"user nmae ")

    // If username and password are correct, generate JWT token
    const token = jwt.sign({ username: user.username, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
   console.log(token)
    // Return user data along with token
    res.status(200).json({ success: true, message: 'Login successful', user: { userName: user.userName, role: user.role }, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    // You might add additional logic here if needed
    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};


// const getUserRole = async (req, res) => {
//   try {
//     // Extract the token from the request headers
//     console.log("Started")
//     const token = req.headers.authorization;
//     console.log("Token:", token); // Log the token

//     if (!token) {
//       return res.status(401).json({ success: false, message: 'Authorization token not provided' });
//     }

//     // Verify and decode the token to get the user's information
//     const decodedToken = jwt.verify(token, 'your_secret_key');
//     console.log("Decoded Token:", decodedToken); // Log the decoded token

//     // Extract the username from the decoded token
//     const username = decodedToken.username;
//     console.log("Username:", username); // Log the extracted username

//     // Fetch the user from the database based on the username
//     const user = await User.findOne({ username });
//     console.log("User:", user); // Log the user

//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // Return the user's role
//     console.log("Before returning response");
//     res.status(200).json({ success: true, role: user.role });
//   } catch (error) {
//     console.error("Error:", error); // Log any errors that occur
//     res.status(500).json({ success: false, message: 'Failed to fetch user role', error: error.message });
//   }
// };


module.exports = { createUser,getUserById ,getallUser,login,logout,getUserByUserName};

