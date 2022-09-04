import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const Landing = () => {
  const [response, setResponse] = useState({});
  const [search, setSearch] = useState("chicken");
  const [loading, setLoading] = useState(false);
  const APP_ID = "4b891036";
  const APP_KEY = "af42269223bdb14e83dff34ed613a4fb";
  useEffect(() => {
    const handleSearch = setTimeout(() => {
      axios
        .get(
          `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
        )
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          setResponse(res.data.hits);
        })
        .catch((err) => console.log(err));
    }, 3000);
    return () => clearTimeout(handleSearch);
  }, [search]);

  return (
    <div>
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => {
          setLoading(true);
          setSearch(e.target.value);
        }}
      />
      {loading ? <Loading /> : ""}
    </div>
  );
};

export default Landing;
