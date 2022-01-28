import {
  BrowserRouter,
  Routes, // Just Use Routes instead of "Switch"
  Route,
} from "react-router-dom";
import ContactBook from "./components/ContactBook";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactBook />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
