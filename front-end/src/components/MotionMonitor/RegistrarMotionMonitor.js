import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function RegistrarMotionMonitor() {
    const [setTitulo] = useOutletContext();
    let navigate = useNavigate();
    const [maquina, setMaquina] = useState({});

    useEffect(() => {
        setTitulo("Registrar Monitor de Movimento")
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
        navigate("/devices/listEquipamentos", { replace: true });
    }

    return (
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={3} rowSpacing={1}  >
                <Grid item xs={4}>
                    <TextField
                        id="serialNumber"
                        label="Número de série"
                        variant="outlined"
                        value={maquina.serialNumber || ""}
                        onChange={handleChange}
                        name="serialNumber"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="nome"
                        label="Nome do Dispositivo"
                        variant="outlined"
                        value={maquina.nome || ""}
                        onChange={handleChange}
                        name="nome"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="equipType"
                        label="Tipo do Equipamento"
                        variant="outlined"
                        value={maquina.equipType || ""}
                        onChange={handleChange}
                        name="equipType"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        onClick={btnClickEnviar}
                    >
                        Enviar
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}