import { Title } from "@mui/icons-material";
import { Box, Button, Container, createTheme, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, ThemeProvider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";

const theme = createTheme();


// ["RAQUETE_TENIS","TACO_BASEBALL","RAQUETE_BEACH_TENNIS","LUVA_BOXE","SAPATO"]
const tiposEquipamentos = [

    { valor: "", nome: "Selecione", id: 0 },
    { valor: "RAQUETE_TENIS", nome: "Raquetes de Tênis", id: 1 },
    { valor: "TACO_BASEBALL", nome: "Taco de Baseball", id: 2 },
    { valor: "RAQUETE_BEACH_TENNIS", nome: "Raquetes Beach Tennis", id: 3 },
    { valor: "LUVA_BOXE", nome: "Luva de Boxe", id: 4 },
    { valor: "SAPATO", nome: "Sapato", id: 5 },
];

export default function RegistrarMotionMonitor() {
    let navigate = useNavigate();
    const [maquina, setMaquina] = useState({});
    const [typeEquip, setTypeEquip] = useState([]);

    useEffect(() => {
        // console.log(typeEquip.length);
        if (typeEquip.length == 0) {
            // console.log("Buscar tipos equipamentos");
            fetch('/equipamento/tipo')
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    let resp = [];
                    for (let x in data) {
                        // console.log(data[x]);
                        // resp.add(data[x])
                        const val = data[x]
                        let item = tiposEquipamentos.find(x => x.valor === val);
                        // console.log(item);
                        resp.push(item);
                    }
                    setTypeEquip(resp)
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [])

    const handleChange = (event) => {
        // setMaquina(event.target.value);
        // console.log(event.target);
        setMaquina({
            ...maquina,
            [event.target.name]: event.target.value
        });
    };

    const btnClickEnviar = () => {
        // console.log(maquina)
        fetch("/equipamento", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(maquina),
        })
            .then(res => res.json())
            .then((result) => {
                console.log("equipamentos", result)
            })
            .catch((error) => {
                console.log(error);
            })
        navigate("/listEquipamentos", { replace: true });
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
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
                                                {typeEquip.map((item) => (
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