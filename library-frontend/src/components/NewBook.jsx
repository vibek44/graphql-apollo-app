import { useState } from "react";
import { ALL_AUTHOR, ALL_BOOK, CREATE_BOOK } from "../queries";
import { useMutation } from "@apollo/client/react";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [createBook] = useMutation(
    CREATE_BOOK,

    {
      refetchQueries: [{ query: ALL_BOOK }, { query: ALL_AUTHOR }],
      onError: (error) => console.log(error.message),
    }
  );

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    console.log(title, author, published, genres);
    createBook({ variables: { title, author, published, genres } });
    /*
    setTitle("");
    setPublished("");
    setAuthor(""); 
    setGenres([]);
    setGenre("");*/
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="title">title</label>

          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author"> author</label>
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="published"> published</label>
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
