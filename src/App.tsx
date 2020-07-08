/** @jsx jsx */
import { jsx } from "@emotion/core";
import './App.css';
import CourseList from "./CourseList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 css={{ padding: "40px"}}> ICE Sucks</h1>
      </header>
      <p> ICE sucks. Here's a list of blended and in-person courses for NYU. </p>
      <div css={{ width: "100vw", display: "flex", flexDirection: "column", alignItems: "center"}}>
      <CourseList/>
      </div>
    </div>
  );
}

export default App;
