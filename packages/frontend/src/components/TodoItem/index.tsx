import React, { FC } from "react";
import { Todo } from "@/__generated__/graphql";

type Props = {
  todoItem: Todo;
};

const Layout: FC<Props> = ({ todoItem }) => {
  return (
    <article
      className={`flex items-center justify-between bg-zinc-600 rounded py-4 px-8 border-l-4 mb-4 last:mb-0 ${
        todoItem.isCompleted ? "border-emerald-500" : "border-blue-500"
      }`}
      key={todoItem.id}
    >
      <div>
        <div className="flex items-center">
          <input type="checkbox" checked={todoItem.isCompleted} />
          <div className="ml-4">
            <p className={`${todoItem.isCompleted ? "line-through" : ""}`}>
              {todoItem.title}
            </p>
            <small className="text-zinc-300">
              {todoItem.createdAt.toISOString()}
            </small>
          </div>
        </div>
      </div>
      <div className="text-zinc-300 rounded-full p-1 hover:bg-zinc-700 cursor-pointer h-8 w-8">
        ...
      </div>
    </article>
  );
};

export default Layout;
