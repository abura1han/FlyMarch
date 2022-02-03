import React from "react";
import ReactDom from "react-dom";

import "./style.css";
const App = () => {
  return (
    <div className="main">
      <h2>🚀FlyMarch 2020</h2>
      <p>FlyMarch is a CMS</p>
    </div>
  );
};

// Render dom
ReactDom.render(<App />, document.getElementById("root"));
