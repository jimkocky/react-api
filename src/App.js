import './App.css';
import Home from './pages/home';
import About from './pages/about';
import Facts from './pages/facts';
import {Routes,Route} from "react-router"
import "./utilities/scroll"

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/facts' element={<Facts/>}></Route>
      </Routes>
  );
}

export default App;
