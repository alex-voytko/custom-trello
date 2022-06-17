import { useCallback, useEffect, useState, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBoards } from "./redux/trello-redux/trello-slice";
import AppBar from "./components/AppBar";
import ToolBar from "./components/ToolBar";
import Container from "./components/Container";
import BoardList from "./components/BoardList";
import Modal from "./components/Modal";
import initialState from "./data/initialState.json";

export const actionContext = createContext();

function App() {
  const [modalToggle, setModalToggle] = useState(false);
  const [clickType, setClickType] = useState("");
  const dispatch = useDispatch();
  const boards = useSelector(state => state.boards.items);

  const handleClick = val => setClickType(val);
  const onCloseModal = () => {
    setModalToggle(false);
    setClickType("");
  };

  useEffect(
    useCallback(() => {
      dispatch(fetchBoards(initialState));
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
          setModalToggle(true);
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
        {modalToggle && <Modal />}
      </actionContext.Provider>
    </Container>
  );
}

export default App;
