import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../store/users";
import "./SearchBar.css";

function SearchBar() {
//   const dispatch = useDispatch();
  const users = Object.values(useSelector((state) => state.users));
  //   const users = useSelector((state) => Object.values(state.users));
  const thisThing = useSelector((state) => state.users);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");

  console.log(users);
//   console.log(thisThing);

//   useEffect(() => {
//     dispatch(getAllUsers());
//   }, [dispatch]);

  const userResults = users.filter((user) => {
    return user?.username?.toLowerCase().includes(search.toLowerCase());
  });

  const returnResults = userResults.map((user) => {
    return (
      <Link
        to={`/users/${user?.id}`}
        key={user.id}
        onClick={() => setSearch("")}
        className="search-result-link"
      >
        <div className="search-result-text">
          <div>{user?.username}</div>
        </div>
      </Link>
    );
  });

  return (
    <div className="search-bar-container">
      <form>
        <div className="search-bar">
          <input
            className="search-bar-input"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setSearchResults("results-active")}
            onBlur={() => setSearchResults("")}
          />
        </div>
      </form>
      <div className={`search-results-box ${searchResults}`}>
        {returnResults}
      </div>
    </div>
  );
}

export default SearchBar;
