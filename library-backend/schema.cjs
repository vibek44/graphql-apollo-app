exports.typeDefs = `#graphql  #graphql enables  code highlighting in ide that support graphql highlight
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount:Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User{
    id:ID!
    username:String!
    favoriteGenre:String!
  }

  type Token{
    value:String!
  }

 

  type Query {
    dummy: Int
    bookCount: Int!
    authorCount: Int!
    allBook(author: String, genre: String): [Book!]!
    allAuthor: [Author!]!
    me:User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, born: Int): Author!
    createUser(username:String!,favoriteGenre:String!):User
    login(username:String! password:String!):Token
  }
`;
