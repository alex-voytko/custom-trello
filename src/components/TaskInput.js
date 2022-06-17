import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import shortid from "shortid";
import {
  addTask,
  selectTask,
  editTask,
} from "../redux/trello-redux/trello-slice";
import { actionContext } from "../App";

function TaskInput({ edit }) {
  const dispatch = useDispatch();
  const { onCloseModal } = useContext(actionContext);
  const selectedTask = useSelector(state => state.boards.selectedTask);
  const [text, setText] = useState("");
  const [editTaskId, setEditTaskId] = useState("");

  const handleChange = e => setText(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    edit
      ? dispatch(editTask({ ...selectedTask, text: text }))
      : dispatch(addTask({ id: shortid.generate(), text: text }));

    dispatch(selectTask({}));
    onCloseModal();
  };
  useEffect(
    useCallback(() => {
      if (edit) {
        console.log("срабтал edit: " + edit);
        console.log(selectedTask.text);
        const ref = document.querySelector("#main-input");
        ref.value = selectedTask.text;
      }
    }, [edit]),
    [edit],
  );
  console.log(text);
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
