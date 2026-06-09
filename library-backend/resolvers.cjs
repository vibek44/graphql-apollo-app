const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/*
   * English:
   * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
   * However, for simplicity, we will store the author's name in connection with the book
   
*/
//named exports in cjs
exports.resolvers = {
  Query: {
    bookCount: async () => {
      return await Book.countDocuments();
    },
    authorCount: async () => {
      return await Author.countDocuments();
    },
    allBook: async (root, args) => {
      if (args.genre && args.author) {
        const author = await Author.findOne({ name: args.author });
        return await Book.find({
          author: author._id,
          genres: { $all: [args.genre] },
        }).populate("author");
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return await Book.find({ author: author._id }).populate("author");
      }
      if (args.genre) {
        return await Book.find({ genres: { $all: [args.genre] } }).populate(
          "author"
        );
      }
      return await Book.find({}).populate("author");
    },
    allAuthor: async () => {
      //console.log("ok");
      const books = await Book.find({}).populate("author");
      const authors = await Author.find({});
      const result = authors.map((author) => {
        const result2 = books.filter(
          (book) => book.author._id.toString() === author._id.toString()
        );
        return {
          name: author.name,
          born: author.born,
          bookCount: result2.length,
        };
      });
      return result;
    },
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) throw new GraphQLError("not authenticated ");
      const author = await Author.findOne({ name: args.author });
      try {
        if (!author) {
          const newAuthor = new Author({ name: args.author });
          await newAuthor.save();
          const book = new Book({ ...args, author: newAuthor._id });
          return await book.save();
        }
        const book = new Book({ ...args, author: author._id });

        return await book.save();
      } catch (error) {
        throw new GraphQLError(` ${error.message}`);
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) throw new GraphQLError("unauthorized");
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        throw new GraphQLError(` ${args.name} Should be in the list to edit`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
      (author.name = args.name), (author.born = args.born);

      return await author.save();
    },
    createUser: async (root, args) => {
      const userCheck = await User.exists({ username: args.username });
      if (userCheck) {
        throw new GraphQLError(`users should be unique!!`);
      }
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        });
        return await user.save();
      } catch (error) {
        throw new GraphQLError(`${error.message}`);
      }
    },
    login: async (roots, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError(`invalid username or password`);
      }
      const userToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userToken, "sekret") };
    },
  },
};

//module.exports = { resolvers };
