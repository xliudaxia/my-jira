import { List } from "./list";
import { SearchPanel } from "./search-panel";
import styled from "@emotion/styled";
import { useDebounce } from "utils";
import { Button, Row } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useDocumentTitle } from "utils";
import { ErrorBox } from "components/lib";
import {
  useProjectModal,
  useProjectsSearchParams,
} from "screens/project-list/utils";
// import { Helmet } from "react-helmet";
// ts优点：1、减少代码bug  2、提示增强 3、代码更易读
// const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const { open } = useProjectModal();
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  return (
    <Container>
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>项目列表</h1>
        <Button onClick={open}>创建项目</Button>
      </Row>
      <SearchPanel param={param} users={users || []} setParam={setParam} />
      {error ? <ErrorBox error={error} /> : null}
      <List
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
