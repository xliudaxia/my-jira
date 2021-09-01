import React, { useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import styled from "@emotion/styled";
import { useDebounce } from "utils";
import { Button, Typography } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { useDocumentTitle } from "utils";
import { useUrlQueryParam } from "utils/url";
import { useProjectSearchParams } from "./utils";
// import { Helmet } from "react-helmet";

// ts优点：1、减少代码bug  2、提示增强 3、代码更易读
// const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProject(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} users={users || []} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
