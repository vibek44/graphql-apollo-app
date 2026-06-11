import { useQuery } from "@apollo/client/react";
import { ME, ALL_BOOK } from "../queries";
const PersonalRecommend = ({ show }) => {
  if (!show) return null;

  const { error, loading, data } = useQuery(ALL_BOOK);
  const { error: error1, loading: loading1, data: data1 } = useQuery(ME);
  console.log(data1);
  if (loading || loading1) return <p>Loading...</p>;
  if (error || error1) return <p>Error connection...</p>;
  const books = data.allBook.filter((book) =>
    book.genres.includes(data1.me.favoriteGenre)
  );
  return (
    <div>
      <h1>Recommendations</h1>
      <p>
        book in your favorite genre: <b>{data1.me.favoriteGenre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonalRecommend;
