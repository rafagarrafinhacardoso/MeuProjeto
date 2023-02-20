import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import RegistrarMotionMonitor from './components/MotionMonitor/RegistrarMotionMonitor';
import ListarMotionMonitor from './components/MotionMonitor/ListarMotionMonitor';
import BtnMqttExemple from './components/exemples/BtnMqttExemple';
import MainAnalysis from './components/analysis/MainAnalysis';
import { Box, Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import Header from './components/Header';
// import Header from "./Header";
// import { createTheme } from '@mui/material';

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Header />
        </Box>
      </ThemeProvider>
      <Routes>
        <Route path="*" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="messange" element={<About />} />
        <Route path="regEquipamento" element={<RegistrarMotionMonitor />} />
        <Route path="listEquipamentos" element={<ListarMotionMonitor />} />
        <Route path="btnMqtt" element={<BtnMqttExemple />} />
        <Route path="mainAnalysis" element={<MainAnalysis />} />
      </Routes>
    </div>
  );
}

export default App;


function About() {
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Grid container spacing={3} rowSpacing={1}  >
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h1" variant="h4" align="center">
              Pagina não Encontrada
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}