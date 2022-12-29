import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import background from "./pics/globe.png";
import { Card } from "antd";
import { Input } from "antd";
import "../App.css";
import norslt from "./pics/notresult.png";
const SearchBar = () => {
  const { Search } = Input;
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
      <img
        style={{ width: "13em", margin: "1em 0em" }}
        src={background}
        alt="ijhkjfhxfu"
      ></img>
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        loading
        value={searchtxt}
        onChange={SearchHandler}
        style={{ padding: " 0em 18em", margin: " 0em 0em 2em 0em" }}
      />
      {searchtxt?.length > 3 && !loading
        ? results?.map((result, index) => {
            return (
              <div key={index}>
                <div style={{ padding: " 0em 14em" }}>
                  <Card
                    style={{
                      marginTop: 16,
                      border: "none",
                    }}
                    type="inner"
                    title={result?.title}
                    extra={
                      <a
                        href={`https://en.wikipedia.org/wiki/${result?.title}`}
                      >
                        More
                      </a>
                    }
                  >
                    <p
                      dangerouslySetInnerHTML={{ __html: result?.snippet }}
                    ></p>
                  </Card>
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
