import { Box, Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const theme = createTheme();

export default function PageDefault() {
    const [titulo, setTitulo] = useState("Titulo Padrão....");
    const [devices, setdevices] = useState([]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header setdevices={setdevices} devices={devices} />
                <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                    <Grid container spacing={3} rowSpacing={1}  >
                        <Grid item xs={12}>
                            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                                <Typography component="h1" variant="h4" align="center">
                                    {titulo}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item sm={12}>
                            <Outlet context={[setTitulo]} />
                        </Grid>
                    </Grid>
                </Container>

            </Box>
        </ThemeProvider>
    );
}