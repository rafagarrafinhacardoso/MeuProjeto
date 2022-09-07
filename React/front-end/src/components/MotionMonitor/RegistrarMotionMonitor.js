import { Title } from "@mui/icons-material";
import { Box, Button, Container, createTheme, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, ThemeProvider, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";

const theme = createTheme();

const tiposEquipamentos = [
    { nome: "Selecione", valor: "", id: 0 },
    { nome: "Raquetes de Tênis", valor: "RaquetesTenis", id: 1 },
    { nome: "Taco de Baseball", valor: "TacoBaseball", id: 2 },
    { nome: "Raquetes Beach Tennis", valor: "RaquetesBeachTennis", id: 3 },
    { nome: "Luva de Boxe", valor: "LuvaBoxe", id: 4 },
    { nome: "Sapato", valor: "Sapato", id: 5 },
];

export default function RegistrarMotionMonitor() {
    const [maquina, setMaquina] = useState({});

    const handleChange = (event) => {
        // setMaquina(event.target.value);
        // console.log(event.target);
        setMaquina({
            ...maquina,
            [event.target.name]: event.target.value
        });
    };

    const btnClickEnviar = () => {
        console.log(maquina)
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header />
                <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                    <Grid container spacing={3} rowSpacing={1}  >
                        <Grid item xs={12}>
                            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                                <Typography component="h1" variant="h4" align="center">
                                    Registrar Monitor de Movimento
                                </Typography>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div>
                                        <TextField
                                            id="serialNumber"
                                            label="Número de série"
                                            variant="outlined"
                                            value={maquina.serialNumber || ""}
                                            onChange={handleChange}
                                            name="serialNumber"
                                        />
                                        <TextField
                                            id="nome"
                                            label="Nome do Dispositivo"
                                            variant="outlined"
                                            value={maquina.nome || ""}
                                            onChange={handleChange}
                                            name="nome"
                                        />
                                    </div>
                                    <div>
                                        <FormControl variant="outlined" sx={{ m: 1, minWidth: 460 }}>
                                            <InputLabel id="demo-simple-select-label">Tipo do Equipamento</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={maquina.equipType || ""}
                                                label="Tipo do Equipamento"
                                                onChange={handleChange}
                                                name="equipType"
                                            >
                                                {tiposEquipamentos.map((item, index) => (
                                                    <MenuItem
                                                        key={item.id}
                                                        value={item.valor}
                                                    >{item.nome}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={btnClickEnviar}
                                        >
                                            Enviar
                                        </Button>
                                    </div>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}