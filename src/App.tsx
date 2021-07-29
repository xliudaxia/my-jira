import React, { useEffect } from "react";
import { ProjectListScreen } from "./screens/project-list";
import { LoginScreen } from "./screens/login";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";

function App() {
  useEffect(() => {
    console.log("做最好的自己");
  });
  const { user } = useAuth();

  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      {/* <LoginScreen></LoginScreen> */}
      {/* <ProjectListScreen></ProjectListScreen> */}
    </div>
  );
}

export default App;
