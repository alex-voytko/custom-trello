import { useContext } from "react";
import toolbarData from "../data/toolbarData.json";
import { actionContext } from "../App";

function ToolBar() {
  const { handleClick } = useContext(actionContext);

  const onBtnClick = e => handleClick(e.target.className);

  return (
    <div className="toolbar">
      {toolbarData.map(({ name, className }) => (
        <button key={className} className={className} onClick={onBtnClick}>
          {name}
        </button>
      ))}
    </div>
  );
}
export default ToolBar;
