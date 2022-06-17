import { useContext } from "react";
import { useSelector } from "react-redux";
import toolbarData from "../data/toolbarData.json";
import { actionContext } from "../App";

function ToolBar() {
  const { handleClick } = useContext(actionContext);
  const selectedTask = useSelector(state => state.boards.selectedTask);

  const onBtnClick = e => handleClick(e.target.className);

  return (
    <div className="toolbar">
      {toolbarData.map(({ name, className }) => (
        <button
          key={className}
          className={className}
          onClick={onBtnClick}
          disabled={!selectedTask.id && className !== "add-btn" ? true : false}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
export default ToolBar;
