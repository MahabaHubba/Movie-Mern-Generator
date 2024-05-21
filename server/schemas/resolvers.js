const {User} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        //get all users
        me: async(parent, args, context) => {
            console.log('start');
            if(context.user) {
                return User.findOne({_id: context.user._id})
            }
            throw new Error('Failed to get User')
        }
    },

    Mutation: {
        login: async (parent, {email, password}) => {
            console.log('start');
            const user = await User.findOne({email});
            
            if(!user){
                throw new Error('User not found')
            }

            const correctPw = await user.isCorrectPassword((password));
            if(!correctPw) {
                throw new Error('incorrect password')
            }

            const token = signToken(user);
            return {token, user};

        },

        addUser: async (parent,{username, email, password}) => {
            console.log('start');
            const user = await User.create(
                {
                    username: username,
                    email: email,
                    password: password
                })
            const token = signToken(user);
            console.log('end')
            return {token, user};
        }, 
        saveBook: async (parent, { bookInput }, context) => {
            console.log('start');
            if(context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    { $push: { savedBooks: bookInput }},
                    {new: true}
                );

                return updateUser;
                
            }
            console.log('end')

            throw new Error("Unable to fuind User")

        },

        removeBook: async(parent, args, context) => {
            console.log('start');
            try {
                const user = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    { $pull: {savedBooks: args}},
                    { new: true }
                );

                if(!user) {
                    throw new Error('User not found')
                } 
                return user
            } catch (error) {

            }
        }
    }
}

module.exports = resolvers