import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTask } from "../redux/trello-redux/trello-slice";

function Board({ data }) {
  const dispatch = useDispatch();
  const selectedTask = useSelector(state => state.boards.selectedTask);

  const handleClick = e => {
    dispatch(selectTask(e.currentTarget.dataset.id));
  };
  return (
    <div className="board">
      <h2>{data.name}</h2>
      <ul className="board-list">
        {data.tasks.map(({ id, text }) => (
          <li data-id={id} key={id} onClick={handleClick}>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Board;
