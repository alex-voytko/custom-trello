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
  const [i, setI] = useState(0);

  const handleClick = val => setClickType(val);
  const onCloseModal = () => {
    setModalToggle(false);
    setClickType("");
  };
  const handleKeyPress = useCallback(
    e => {
      if (e.ctrlKey && e.code === "KeyZ") {
        console.log("нажата Z");
        if (!i) return;
        dispatch(fetchBoards(history[i - 1]));
        setI(i - 1);
      }
      if (e.ctrlKey && e.code === "KeyY") {
        console.log("нажата Y");
        if (i === history.length - 1) return;
        dispatch(fetchBoards(history[i + 1]));
        setI(i + 1);
      }
    },
    [i],
  );

  console.log(i);
  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [handleKeyPress]);
  useEffect(
    useCallback(() => {
      console.log("Изменилась история");
      console.log(history);
      setI(history.length - 1);
    }, [history]),
    [history],
  );
  useEffect(
    useCallback(() => {
      dispatch(fetchBoards(initialState));
      dispatch(pushInHistory(initialState));
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
