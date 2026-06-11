import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client/react";
import PersonalRecommend from "./components/PersonalRecommend";

const App = () => {
  const client = useApolloClient();
  const [token, setToken] = useState(localStorage.getItem("user-token"));
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState("");
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };
  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("login");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token && <button onClick={() => setPage("login")}>LogIn</button>}
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )}
        {token && <button onClick={handleLogout}>Logout</button>}
      </div>

      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} />
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />

      {token && <NewBook show={page === "add"} setPage={setPage} />}
      {token && <PersonalRecommend show={page === "recommend"} />}
    </div>
  );
};

export default App;
