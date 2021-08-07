// copied a template from class activity 26
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    // deleted all queries except the me query. added .select instead of .populate.
  Query: {   
    me: async (parent, args, context) => {
      if (context.User) {
        const userData = User.findOne({ _id: context.User._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
// kept mutation the same as classwork activity 26 until savebook section
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const User = await User.create({ username, email, password });
      const token = signToken(User);
      return { token, User };
    },
    login: async (parent, { email, password }) => {
      const User = await User.findOne({ email });

      if (!User) {
        throw new AuthenticationError('No User found with this email address');
      }

      const correctPw = await User.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(User);

      return { token, User };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.User) {
        const updatedUser = await User.findByIdAndUpdate(
            { _id: context.User._id },
            { $push: {savedBooks: { bookData } } },
            { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // addComment: async (parent, { thoughtId, commentText }, context) => {
    //   if (context.User) {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $addToSet: {
    //           comments: { commentText, commentAuthor: context.User.username },
    //         },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    // dont need the add comment section
    removeBook: async (parent, { bookId }, context) => {
      if (context.User) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.User._id },
          { $pull: { savedBooks: { bookId} } },
          { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // removeComment: async (parent, { thoughtId, commentId }, context) => {
    //   if (context.User) {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $pull: {
    //           comments: {
    //             _id: commentId,
    //             commentAuthor: context.User.username,
    //           },
    //         },
    //       },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    // didnt need the remove comment
  },
};

module.exports = resolvers;