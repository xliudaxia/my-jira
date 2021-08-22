import React, { useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import styled from "@emotion/styled";
import { useDebounce } from "utils";
import { Typography } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";

// ts优点：1、减少代码bug  2、提示增强 3、代码更易读

export const ProjectListScreen = () => {
  // const apiUrl = process.env.REACT_APP_API_URL;
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProject(debouncedParam);
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} users={users || []} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
