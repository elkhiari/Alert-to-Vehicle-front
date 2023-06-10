import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Alert from './pages/Alert';
import Connexion from './pages/Connexion';
import Vehicules from './pages/vehicules';
import Ajoute_V from './pages/Ajoute_V';
import ViewAlert from './pages/ViewAlert';



function App() {
  return (

    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Alert />} />
          <Route path="/connexion" element ={<Connexion/>} />
          <Route path="/vehicules" element={<Vehicules/>} />
          <Route path="/vehicules/moi" element = "vehicules moi" />
          <Route path="/vehicules/alert/:id" element={<ViewAlert />} />
          <Route path="/admin" element="Get all v" />
          <Route path="/vehicules/ajoute" element={<Ajoute_V />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
