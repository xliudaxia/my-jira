import React, { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import styled from "@emotion/styled";
import { useDebounce } from "utils";
import { Button, Row, Typography } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { useDocumentTitle } from "utils";
import { useProjectModal, useProjectSearchParams } from "./utils";
// import { Helmet } from "react-helmet";
// ts优点：1、减少代码bug  2、提示增强 3、代码更易读
// const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const { close, open } = useProjectModal();
  const [param, setParam] = useProjectSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProject(useDebounce(param, 200));
  const { data: users } = useUsers();
  const [value, setValue] = useState("");
  const name = { age: 15 };
  console.log(name);
  useEffect(() => {
    setValue(String(Math.random()));
  }, []);

  return (
    <Container>
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>项目列表</h1>

        <Button onClick={open}>创建项目</Button>
      </Row>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <SearchPanel param={param} users={users || []} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
        setProjectModalOpen={open}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
