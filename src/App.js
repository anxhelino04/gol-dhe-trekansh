import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <h1 style={{ color: "rgb(227, 0, 64)" }}>
        Search below anything you want...
      </h1>
      <SearchBar />
    </div>
  );
}

export default App;
