import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { allUsers } from "../../store/allUsers";
import "./SearchBar.css";

function SearchBar() {
  const dispatch = useDispatch()
  const history = useHistory()
  const users = Object.values(useSelector((state) => state.allUsers));
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");

  useEffect(() => {
    dispatch(allUsers())
  }, [dispatch])

  const userResults = users.filter((user) => {
    return user?.username?.toLowerCase().includes(search.toLowerCase());
  });

  const clickEvent = (() => {
    setSearch('')
    history.push(`/users/${users?.user?.id}`)
  })

  const returnResults = userResults.map((user) => {
    return (
      <Link
        to={`/users/${user?.id}`}
        key={user?.id}
        onClick={clickEvent}
        className="search-result-link"
      >
        <div className="search-result-text">
          <img
            src={user?.profile_image}
            className="search-bar-profile-pic"
            alt='preview'
          />
          <div className="search-bar-profile-username">{user?.username}</div>
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
