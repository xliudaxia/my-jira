import React, { useEffect } from "react";
import { ProjectListScreen } from "./screens/project-list";

function App() {
  useEffect(() => {
    console.log("做最好的自己");
  });

  return (
    <div className="App">
      <ProjectListScreen></ProjectListScreen>
    </div>
  );
}

export default App;
