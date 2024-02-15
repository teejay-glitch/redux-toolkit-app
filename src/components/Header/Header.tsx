import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../app/store/store";
import { getCounter, increaseCount } from "../../app/features/postsAsync/postAsyncSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector(getCounter);

  return (
    <header className="Header">
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/post"}>Post</Link>
          </li>
          <li>
            <Link to={"/user"}>Users</Link>
          </li>
        </ul>
        <button onClick={() => dispatch(increaseCount())}>{count}</button>
      </nav>
    </header>
  );
};

export default Header;
