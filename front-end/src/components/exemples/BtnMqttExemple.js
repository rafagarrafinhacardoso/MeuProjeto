import { Box, Button, Grid, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function BtnMqttExemple() {
    const [setTitulo] = useOutletContext();
    useEffect(() => {
        console.log(">>>>use-Effect<<<<");
        setTitulo("Botão MQTT Exemplo")

    }, [])

    const btnInterruptorLed = () => {
        console.log("enviar")
        fetch('/mqtt/btnLed')
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <Grid container spacing={3} rowSpacing={1}  >
            <Grid item xs={12}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <Button
                                variant="contained"
                                onClick={btnInterruptorLed}
                            >
                                Interruptor Lampada
                            </Button>
                        </div>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}