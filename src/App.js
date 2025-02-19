import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/header/Header.js";
import { Footer } from "./components/footer/Footer.js";
import { ToDoList } from "./components/ToDoList/ToDoList.js";
// header
// to do functionalities
// footer
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <ToDoList />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
