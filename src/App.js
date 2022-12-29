import "./App.css";
import SearchBar from "./components/SearchBar";
import React from "react";
function App() {
  return (
    <div className="App">
      <h1 style={{ color: "rgb(75, 132, 255)" }}>
        We can help you find anything you want
      </h1>
      <SearchBar />
    </div>
  );
}

export default App;
