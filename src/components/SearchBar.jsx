import axios from "axios";
import React, { useState, useEffect } from "react";
import "../App.css";
import norslt from "./pics/notresult.png";
const SearchBar = () => {
  const [searchtxt, setSearchtxt] = useState("");
  const [loading, setLoading] = useState(false);
  const SearchHandler = (event) => {
    setSearchtxt(event.target.value);
  };
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://wikipedia.org/w/api.php?&origin=*&format=json&action=query&list=search&prop=info&inprop=url&utf8=&srlimit=5&srsearch=${searchtxt}`
      )
      .then((response) => {
        console.log(response?.data?.query?.search, "gol");
        if (searchtxt?.length > 3) {
          setLoading(true);
          setResults(response?.data?.query?.search);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => console.log(err, "jogol"));
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [searchtxt]);

  return (
    <div>
      <input
        className="searchbar"
        onChange={SearchHandler}
        value={searchtxt}
        type="text"
        placeholder="Search..."
      ></input>

      {searchtxt?.length > 3 && !loading
        ? results?.map((result, index) => {
            return (
              <div key={index} className="container">
                <div className="containerr">
                  <h3 className="title">{result?.title}</h3>
                  <p
                    className="content"
                    dangerouslySetInnerHTML={{ __html: result?.snippet }}
                  ></p>
                  <a
                    className="link"
                    href={`https://en.wikipedia.org/wiki/${result?.title}`}
                  >
                    read more...
                  </a>
                </div>
              </div>
            );
          })
        : searchtxt.length > 3 && (
            <div>
              <p className="loading">loading....</p>
              <span class="loader"></span>
            </div>
          )}
      {results?.length === 0 && searchtxt.length > 3 && !loading ? (
        <div>
          <h4 className="loading">Sorry we couldn't find you any result...</h4>
          <img style={{ width: "10em" }} src={norslt} alt="sorry no result" />
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
