import { Box, Button, Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
// import CameraIcon from '@mui/icons-material/PhotoCamera';

const theme = createTheme();

export default function BtnMqttExemple() {

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
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header />
                <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                    <Grid container spacing={3} rowSpacing={1}  >
                        <Grid item xs={12}>
                            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                                <Typography component="h1" variant="h4" align="center">
                                    Botão MQTT Exemplo
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
                </Container>

            </Box>
        </ThemeProvider>
    );
}