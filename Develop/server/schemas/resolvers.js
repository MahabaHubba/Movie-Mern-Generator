const {User} = require('../models/User');
const {signToken, AuthenticationError} = require('../utils/auth');

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

    Mutation
}
