import { useDispatch, useSelector } from "react-redux";
import { selectTask } from "../redux/trello-redux/trello-slice";

function Board({
  board,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
  handleDropOnEmpty,
}) {
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

  return (
    <div
      className="board"
      onDragOver={handleDragOver}
      onDrop={e => handleDropOnEmpty(e, board)}
    >
      <h2>{board.name}</h2>
      <ul className="board-list">
        {board.tasks.map(task => (
          <li
            className={selectedItem.id === task.id ? `item selected` : `item`}
            data-id={task.id}
            key={task.id}
            onClick={handleClick}
            draggable={true}
            onDragStart={e => handleDragStart(e, task, board)}
            onDragLeave={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, task, board)}
          >
            <p>{task.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Board;
