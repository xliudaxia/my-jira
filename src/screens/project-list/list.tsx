import React from "react";
import { User } from "./search-panel";
import { useArray } from "../../utils/index";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  orgnization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ users, list }: ListProps) => {
  const { value, clear, removeIndex, add } = useArray([
    { name: "douban", age: 16 },
  ]);
  console.log(value);
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
