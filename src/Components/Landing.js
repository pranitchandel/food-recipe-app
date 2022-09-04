import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import SearchIcon from "@mui/icons-material/Search";

const Landing = () => {
  const [response, setResponse] = useState([]);
  const [search, setSearch] = useState("chicken");
  const [loading, setLoading] = useState(false);
  const [showRecipeAlert, setShowRecipeAlert] = useState(false);
  const APP_ID = "4b891036";
  const APP_KEY = "af42269223bdb14e83dff34ed613a4fb";
  useEffect(() => {
    const handleSearch = setTimeout(() => {
      setShowRecipeAlert(false);
      axios
        .get(
          `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
        )
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          if (res.data.count === 0) {
            setShowRecipeAlert(true);
            return;
          }
          setResponse(res.data.hits);
        })
        .catch((err) => console.log(err));
    }, 3000);
    return () => clearTimeout(handleSearch);
  }, [search]);

  return (
    <div>
      <div className="searchInput">
        <div className="loader">{loading ? <Loading /> : <SearchIcon />}</div>
        <input
          type="text"
          name="search"
          value={search}
          placeholder="Search"
          onChange={(e) => {
            setLoading(true);
            setShowRecipeAlert(false);
            setSearch(e.target.value);
          }}
        />
      </div>
      {showRecipeAlert ? (
        <div className="noResultAlert">No results found</div>
      ) : (
        ""
      )}
      <div className="recipeContainer">
        {response.length > 0 ? (
          response.map((res, key) => (
            <div key={key} className="recipe">
              <div className="recipeImage">
                <img src={res.recipe.image} alt="not found" />
                <div>{res.recipe.label}</div>
              </div>
            </div>
          ))
        ) : (
          <div>no results found</div>
        )}
      </div>
    </div>
  );
};

export default Landing;
