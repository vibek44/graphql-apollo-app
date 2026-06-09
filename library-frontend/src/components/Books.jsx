import { ALL_BOOK } from "../queries";
import { useQuery } from "@apollo/client/react";
const Books = (props) => {
  const { error, loading, data } = useQuery(ALL_BOOK);
  if (!props.show) {
    return null;
  }

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Error connection</h3>;

  return (
    <div>
      <h2>books</h2>

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
    </div>
  );
};

export default Books;
