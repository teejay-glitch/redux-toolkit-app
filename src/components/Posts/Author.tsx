import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../app/features/posts/userSlice";
import { User } from "../../models/User";

interface AuthorProps {
  authorId: string;
}

const Author: React.FC<AuthorProps> = ({ authorId }: AuthorProps) => {
  const authors = useSelector(selectAllUsers);

  const author = authors.find((author: User) => author.id === authorId);

  return <span>by {author ? author.name : "Unknown Author"}</span>;
};

export default Author;
