const UserManagement = require('../models/Usermanagement');

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await UserManagement.create(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

const viewUsers = async (req, res) => {
  try {
    const users = await UserManagement.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

const viewUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserManagement.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;
    const updatedUser = await UserManagement.findByIdAndUpdate(userId, updatedUserData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UserManagement.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

module.exports = {
  createUser,
  viewUsers,
  viewUserById,
  updateUser,
  deleteUser
};
