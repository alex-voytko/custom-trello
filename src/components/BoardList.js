import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBoards, selectTask } from "../redux/trello-redux/trello-slice";
import Board from "./Board";

function BoardList({ boards }) {
  const dispatch = useDispatch();
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  const handleDragStart = (e, task, board) => {
    setCurrentBoard(board);
    setCurrentTask(task);
    dispatch(selectTask({}));
  };
  const handleDragEnd = e => {
    e.target.style.boxShadow = "none";
  };
  const handleDragOver = e => {
    e.preventDefault();
    if (e.target.className.includes("item")) {
      e.target.style.boxShadow = "0 7px 5px gray";
    }
  };
  const handleDrop = (e, task, board) => {
    e.preventDefault();
    e.target.style.boxShadow = "none";
    const boardToString = JSON.stringify(board);
    const editBoard = JSON.parse(boardToString);
    const currentBoardToString = JSON.stringify(currentBoard);
    const editCurrentBoard = JSON.parse(currentBoardToString);
    const currentIndex = currentBoard.tasks.indexOf(currentTask);
    const dropIndex = board.tasks.indexOf(task);
    editCurrentBoard.tasks.splice(currentIndex, 1);
    let updatedBoards = [];
    if (currentBoard.id === board.id) {
      editCurrentBoard.tasks.splice(dropIndex + 1, 0, currentTask);
      updatedBoards = [
        ...boards.map(b => {
          if (b.id === currentBoard.id) {
            return editCurrentBoard;
          }
          return b;
        }),
      ];
    } else {
      editBoard.tasks.splice(dropIndex + 1, 0, currentTask);
      boards.forEach(b => {
        if (b.id === currentBoard.id)
          return updatedBoards.push(editCurrentBoard);
        if (b.id === board.id) return updatedBoards.push(editBoard);
        return updatedBoards.push(b);
      });
    }
    dispatch(fetchBoards(updatedBoards));
  };
  const handleDropOnEmpty = (e, board) => {
    e.preventDefault();
    if (!board.tasks.length) {
      const boardToString = JSON.stringify(board);
      const editBoard = JSON.parse(boardToString);
      const currentBoardToString = JSON.stringify(currentBoard);
      const editCurrentBoard = JSON.parse(currentBoardToString);
      const currentIndex = currentBoard.tasks.indexOf(currentTask);
      editCurrentBoard.tasks.splice(currentIndex, 1);
      editBoard.tasks.push(currentTask);
      const updatedBoards = [];
      boards.forEach(b => {
        if (b.id === currentBoard.id)
          return updatedBoards.push(editCurrentBoard);
        if (b.id === board.id) return updatedBoards.push(editBoard);
        return updatedBoards.push(b);
      });
      dispatch(fetchBoards(updatedBoards));
    }
  };
  return (
    <div className="boards-container">
      {boards.map(board => (
        <Board
          board={board}
          key={board.id}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleDragEnd={handleDragEnd}
          handleDropOnEmpty={handleDropOnEmpty}
        />
      ))}
    </div>
  );
}

export default BoardList;
