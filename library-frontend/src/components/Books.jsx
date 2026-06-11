import { useState } from "react";
import { ALL_BOOK } from "../queries";
import { useQuery } from "@apollo/client/react";
const Books = (props) => {
  const [search, setSearch] = useState(null);
  const genre = search === null || search === "allgenres" ? undefined : search;
  const { error, loading, data } = useQuery(ALL_BOOK, {
    variables: { genre },
  });
  /*const filteredGenres =
    data &&
    data.allBook.length > 0 &&
    (search === "allgenres"
      ? data.allBook
      : data.allBook.filter((book) => book.genres.includes(search)));
*/
  const genres = [
    "refactoring",
    "agile",
    "patterns",
    "design",
    "crime",
    "allgenres",
  ];

  if (!props.show) {
    return null;
  }

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Error connection</h3>;
  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{search}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBook.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setSearch(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
