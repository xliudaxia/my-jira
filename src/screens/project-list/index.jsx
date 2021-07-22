import React, { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import qs from "qs";
import { cleanObject, useDebounce, useMount } from "utils";

export const ProjectListScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 2000);
  useEffect(() => {
    // console.log("当前的param", debouncedParam);
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (reponse) => {
      if (reponse.ok) {
        setList(await reponse.json());
      }
    });
  }, [debouncedParam]);
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (reponse) => {
      if (reponse.ok) {
        setUsers(await reponse.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel param={param} users={users} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
