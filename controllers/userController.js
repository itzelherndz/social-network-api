const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
    
            if (!user) {
            return res.status(404).json({ message: 'User with ID not found' });
            }
    
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update an existing user
    async updateUser(req, res) {
        try {        
            const user = await User.findOneAndUpdate({ _id: req.params.userId },req.body);

            if (!user) {
            return res.status(404).json({ message: 'User with ID not found' });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete an existing user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({_id: req.params.userId});
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
  };