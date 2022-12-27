import axios from "axios";
import React, { useState, useEffect } from "react";
const SearchBar = () => {
  const [searchtxt, setSearchtxt] = useState("");
  const SearchHandler = (event) => {
    setSearchtxt(event.target.value);
  };
  const [results, setResults] = useState("");
  const [links, setLinks] = useState("");

  const testFunc = async () => {
    await axios
      .get(
        `https://wikipedia.org/w/api.php?&origin=*&format=json&action=query&list=search&prop=info&inprop=url&utf8=&srlimit=5&srsearch=${searchtxt}`,
        { mode: "no-cors" }
      )
      .then((response) => {
        console.log(response.data.query.search, "respoinse");
        setResults(response.data[1]);
        // setLinks(response.data[3]);
      })
      .catch((err) => console.log(err, "jogol"));
  };

  useEffect(() => {
    testFunc();
  }, [searchtxt]);
  console.log(results, "result ");
  return (
    <div>
      <input onChange={SearchHandler} value={searchtxt} type="text"></input>
      {searchtxt.length > 3
        ? results?.map((result, index) => {
            return <p key={index}>{result}</p>;
          })
        : null}
      {results?.length === 0 ? <h4>error kot</h4> : null}
      {searchtxt.length > 3
        ? links?.map((link, index) => {
            return (
              <a key={index} href={link}>
                Read more...
              </a>
            );
          })
        : null}
    </div>
  );
};

export default SearchBar;
