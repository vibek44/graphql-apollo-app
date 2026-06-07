const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
  
   * English:
   * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
   * However, for simplicity, we will store the author's name in connection with the book
   */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

exports.resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: () => {
      return books.length;
    },
    authorCount: () => {
      return authors.length;
    },
    allBook: (root, args) => {
      if (args.genre && args.author) {
        return books.filter(
          (book) =>
            book.genres.includes(args.genre) && book.author === args.author
        );
      }
      if (args.author) {
        return books.filter(
          (book) => book.author.toLowerCase() === args.author.toLowerCase()
        );
      }
      if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      }
      return books;
    },
    allAuthor: () => {
      //console.log("ok");
      const result = authors.map((author) => {
        const result2 = books.filter(
          (book) => book.author.toLowerCase() === author.name.toLowerCase()
        );
        return {
          name: author.name,
          born: author.born,
          bookCount: result2.length,
        };
      });
      return result;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      console.log("ook");
      const author = authors.find(
        (author) => author.name.toLowerCase() === args.author.toLowerCase()
      );
      if (!author) {
        authors = authors.concat({ name: args.author, id: uuid() });
      }
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      return book;
    },
    editAuthor: (root, args) => {
      console.log("ok");
      let author = authors.find((author) => author.name === args.name);
      if (!author) {
        throw new GraphQLError(` ${args.name} Should be in the list to edit`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
      author = { ...author, born: args.born };
      authors = authors.map((ele) => (ele.name === args.name ? author : ele));
      return author;
    },
  },
};

//module.exports = { resolvers };
