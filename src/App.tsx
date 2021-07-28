import React, { useEffect } from "react";
import { ProjectListScreen } from "./screens/project-list";
import { LoginScreen } from "./screens/login";

function App() {
  useEffect(() => {
    console.log("做最好的自己");
  });

  return (
    <div className="App">
      <LoginScreen></LoginScreen>
      {/* <ProjectListScreen></ProjectListScreen> */}
    </div>
  );
}

export default App;
