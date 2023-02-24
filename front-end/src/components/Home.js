import { Box, Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Header from "./Header";
// import CameraIcon from '@mui/icons-material/PhotoCamera';

const theme = createTheme();

export default function Home() {
    const [setTitulo] = useOutletContext();
    useEffect(()=>{
        setTitulo("Home")
    },[]);

    return (
        <Grid container spacing={3} rowSpacing={1}  >
            <Grid item xs={12}>
                <Typography component="h1" variant="h4" align="center">
                    Pagina inicial
                </Typography>
            </Grid>
        </Grid>

    );
}