import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import RegistrarMotionMonitor from './components/MotionMonitor/RegistrarMotionMonitor';
import ListarMotionMonitor from './components/MotionMonitor/ListarMotionMonitor';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="regEquipamento" element={<RegistrarMotionMonitor />} />
        <Route path="listEquipamentos" element={<ListarMotionMonitor />} />
      </Routes>
    </div>
  );
}

export default App;


function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}