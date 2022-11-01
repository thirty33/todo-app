import { HashRouter, Route, Routes } from "react-router-dom";
import { EditTodoPage } from "./edit/EditToDoPage";
import { HomePage } from "./home/HomePage";
import { NewTodoPage } from "./new/NewToDoPage";


function App() {

  
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/new" element={<NewTodoPage/>} />
        <Route path="/edit/:id" element={<EditTodoPage/>} />
        <Route path="*" element={<p>not found</p>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
