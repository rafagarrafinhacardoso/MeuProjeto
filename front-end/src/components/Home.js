import { Box, Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
// import CameraIcon from '@mui/icons-material/PhotoCamera';

const theme = createTheme();

export default function Home() {

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
                                    Home
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <nav>
                                    <Link to="/about">About</Link>
                                </nav>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

            </Box>
        </ThemeProvider>
    );
}