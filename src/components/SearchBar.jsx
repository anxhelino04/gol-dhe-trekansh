import axios from "axios";
import React, { useState, useEffect } from "react";

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
      <input onChange={SearchHandler} value={searchtxt} type="text"></input>
      {searchtxt?.length > 3 && !loading
        ? results?.map((result, index) => {
            return (
              <div key={index}>
                <h3>{result?.title}</h3>
                <a href={`https://en.wikipedia.org/wiki/${result?.title}`}>
                  read more...
                </a>
                <p dangerouslySetInnerHTML={{ __html: result?.snippet }}></p>
              </div>
            );
          })
        : searchtxt.length > 3 && <h2>loading....</h2>}
      {results?.length === 0 && searchtxt.length > 3 ? (
        <h4>Sorry we couldn't find any results...</h4>
      ) : null}
      {/* {searchtxt.length > 3 
        ? links?.map((link, index) => {
            return (
              <a key={index} href={link}>
                Read more...
              </a>
            );
          })
        : null} */}
    </div>
  );
};

export default SearchBar;
