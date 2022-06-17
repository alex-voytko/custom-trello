import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import shortid from "shortid";
import { addTask } from "../redux/trello-redux/trello-slice";
import { actionContext } from "../App";

function TaskInput() {
  const dispatch = useDispatch();
  const { onCloseModal } = useContext(actionContext);
  const selectedTask = useSelector(state => state.boards.selectedTask);
  const [text, setText] = useState("");
  const [editTaskId, setEditTaskId] = useState("");

  const handleChange = e => setText(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addTask({ id: shortid.generate(), text: text }));
    onCloseModal();
  };

  //   useEffect(
  //     useCallback(() => {
  //       if (task) {
  //         setEditTaskId(task.id);
  //       }
  //     }, [task]),
  //     [task],
  //   );
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input id="main-input" type="text" onChange={handleChange} />
        <button onClick={handleSubmit}>OK</button>
      </form>
    </>
  );
}

export default TaskInput;
