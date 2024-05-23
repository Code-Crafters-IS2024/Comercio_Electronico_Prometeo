import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';

import Card from "./components/UI/Card";
import Main from "./components/Menus/Main"

const App = () => {

  const [vendedores, setVendedores] = useState([]);
  const [compradores, setCompradores] = useState([]);

  return (
    <div className="App">
      <h1>Tianguis Facultad de Ciencias</h1>
      <Card>
        <Main/>
      </Card>
    </div>
  );

  
};

export default App;
