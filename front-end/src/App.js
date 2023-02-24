import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import RegistrarMotionMonitor from './components/MotionMonitor/RegistrarMotionMonitor';
import ListarMotionMonitor from './components/MotionMonitor/ListarMotionMonitor';
import BtnMqttExemple from './components/exemples/BtnMqttExemple';
import MainAnalysis from './components/analysis/MainAnalysis';
import { Container, createTheme, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import MessageMqtt from './components/exemples/MessageMqtt';
import PageDefault from './components/PageDefault';
import ToolsMqttPainel from './components/exemples/ToolsMqttPainel';

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="*" element={<About />} /> */}
        <Route path="/" element={<PageDefault />} >
          <Route path="/" element={<Home />} />
          <Route path="*" element={<About />} />
        </Route>
        <Route path="mainAnalysis" element={<PageDefault />}>
          <Route path="" element={<MainAnalysis />} />
        </Route>
        <Route path="devices" element={<PageDefault />}>
          <Route path="regEquipamento" element={<RegistrarMotionMonitor />} />
          <Route path="listEquipamentos" element={<ListarMotionMonitor />} />
        </Route>
        <Route path="serviceMqtt" element={<PageDefault />}>
          <Route path="*" element={<Home />} />
          <Route path="messange" element={<MessageMqtt />} />
          <Route path="btnMqtt" element={<BtnMqttExemple />} />
          <Route path="toolsMqtt" element={<ToolsMqttPainel />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;


function About() {
  return (
    <Grid container spacing={3} rowSpacing={1}  >
      <Grid item xs={12}>
        <Typography component="h1" variant="h4" align="center">
          Pagina não Encontrada
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Link to="/">Home</Link>
      </Grid>
    </Grid>
  );
}