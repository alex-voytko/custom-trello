import Board from "./Board";

function BoardList({ boards }) {
  return (
    <div className="boards-container">
      {boards.map(board => (
        <Board data={board} key={board.id} />
      ))}
    </div>
  );
}

export default BoardList;
