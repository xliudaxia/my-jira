import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import { Button } from "antd";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <ProjectListScreen />
      <br />
      <br />
      <Button onClick={logout}>登出</Button>
    </div>
  );
};
