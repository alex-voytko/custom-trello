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

  const handleChange = e => setText(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    if (text) {
      edit
        ? dispatch(editTask({ ...selectedTask, text: text }))
        : dispatch(addTask({ id: shortid.generate(), text: text }));

      edit && dispatch(selectTask({}));
    }
    onCloseModal();
  };

  useEffect(
    useCallback(() => {
      if (edit) {
        const ref = document.querySelector("#main-input");
        ref.value = selectedTask.text;
      }
    }, [edit]),
    [edit],
  );

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
