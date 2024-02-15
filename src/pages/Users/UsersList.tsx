import React from "react";
import { useSelector } from "react-redux";
import { selectAllAsyncUsers } from "../../app/features/usersAsync/userAsyncSlice";
import { User } from "../../models/User";
import { Link } from "react-router-dom";

const UsersList: React.FC = () => {
  const users = useSelector(selectAllAsyncUsers);

  const renderedUsers = users.map((user: User) => {
    return (
      <li key={user.id}>
        <Link to={`/user/${user.id}`}>{user.name}</Link>
      </li>
    );
  });

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;
