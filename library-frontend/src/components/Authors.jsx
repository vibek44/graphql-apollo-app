import { ALL_AUTHOR, EDIT_AUTHOR } from "../queries";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const { data, loading, error } = useQuery(ALL_AUTHOR);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHOR }],
    onError: (error) => console.log(error.message),
  });

  if (!props.show) {
    return null;
  }

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Error connection</h3>;

  //console.log(data);
  const submit = (e) => {
    e.preventDefault();
    //console.log(name);
    editAuthor({ variables: { name, born } });
    setBorn("");
  };
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthor.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
          <label htmlFor="born">name</label>
          <select
            name="author"
            id="author"
            onChange={(e) => setName(e.target.value)}
          >
            <option>select author</option>
            {data.allAuthor.map((author, index) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="born">born</label>
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
