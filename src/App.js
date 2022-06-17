import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBoards } from "./redux/trello-redux/trello-slice";
import AppBar from "./components/AppBar";
import ToolBar from "./components/ToolBar";
import Container from "./components/Container";
import initialData from "./initialData.json";
import BoardList from "./components/BoardList";

function App() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards.items);

  useEffect(
    useCallback(() => {
      dispatch(fetchBoards(initialData));
    }, []),
    []
  );
  console.log(boards);
  return (
    <Container className='App'>
      <AppBar />
      <Container>
        <ToolBar />
        <BoardList boards={boards} />
      </Container>
    </Container>
  );
}

export default App;
