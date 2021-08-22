import React from "react";
import "./App.css";
// import { ProjectListScreen } from "./screens/project-list";
// import { LoginScreen } from "./screens/login";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        {/* <LoginScreen></LoginScreen> */}
        {/* <ProjectListScreen></ProjectListScreen> */}
      </ErrorBoundary>
    </div>
  );
}

export default App;
