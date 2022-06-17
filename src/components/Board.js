import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTask } from "../redux/trello-redux/trello-slice";

function Board({ data }) {
  const dispatch = useDispatch();
  const selectedItem = useSelector(state => state.boards.selectedTask);

  const handleClick = e => {
    if (e.currentTarget.dataset.id === selectedItem.id) {
      dispatch(selectTask({}));
      return;
    }
    dispatch(
      selectTask({
        id: e.currentTarget.dataset.id,
        text: e.currentTarget.textContent,
      }),
    );
  };
  // console.log(selected);
  return (
    <div className="board">
      <h2>{data.name}</h2>
      <ul className="board-list">
        {data.tasks.map(({ id, text }) => (
          <li
            className={selectedItem.id === id ? `item selected` : `item`}
            data-id={id}
            key={id}
            onClick={handleClick}
          >
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Board;
