import { useCallback, useEffect, useState, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBoards,
  removeTask,
  selectTask,
  pushInHistory,
} from "./redux/trello-redux/trello-slice";
import AppBar from "./components/AppBar";
import ToolBar from "./components/ToolBar";
import Container from "./components/Container";
import BoardList from "./components/BoardList";
import Modal from "./components/Modal";
import initialState from "./data/initialState.json";

export const actionContext = createContext();

function App() {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.boards.items);
  const selectedTask = useSelector(state => state.boards.selectedTask);
  const history = useSelector(state => state.boards.history);

  const [modalToggle, setModalToggle] = useState(false);
  const [clickType, setClickType] = useState("");
  const [index, setIndex] = useState(0);

  const handleClick = val => setClickType(val);
  const onCloseModal = () => {
    setModalToggle(false);
    setClickType("");
  };
  const handleKeyDown = e => {
    e.preventDefault();
    switch (e.ctrlKey && e.key) {
      case "z":
        console.log("нажата Z");
        setIndex(index > 0 ? index - 1 : index);
        console.log(history);
        console.log(history[index]);
        dispatch(fetchBoards(history[index]));
        break;
      case "y":
        console.log("нажата Y");
        setIndex(index !== history.length - 1 ? index + 1 : index);
        console.log(history);
        console.log(history[index]);
        dispatch(fetchBoards(history[index]));
        break;
      default:
        return;
    }
  };

  useEffect(
    useCallback(() => {
      console.log("Изменилась история");
      console.log(history);
      if (index > 0) setIndex(history.length - 1);
    }, [history]),
    [history],
  );
  console.log(index);
  useEffect(
    useCallback(() => {
      dispatch(fetchBoards(initialState));
      dispatch(pushInHistory(initialState));
      window.addEventListener("keydown", handleKeyDown);
    }, []),
    [],
  );
  useEffect(
    useCallback(() => {
      switch (clickType) {
        case "add-btn":
          setModalToggle(true);
          break;
        case "edit-btn":
          setModalToggle(true);
          break;
        case "remove-btn":
          dispatch(removeTask(selectedTask.id));
          dispatch(selectTask({}));
          setClickType("");
          break;
        default:
          break;
      }
    }, [clickType]),
    [clickType],
  );

  return (
    <Container className="App">
      <actionContext.Provider value={{ handleClick, onCloseModal }}>
        <AppBar />
        <Container>
          <ToolBar />
          <BoardList boards={boards} />
        </Container>
        {modalToggle && <Modal edit={clickType === "edit-btn"} />}
      </actionContext.Provider>
    </Container>
  );
}

export default App;
