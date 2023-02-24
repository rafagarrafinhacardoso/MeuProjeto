import { createTheme, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Home() {
    const [setTitulo] = useOutletContext();
    useEffect(() => {
        setTitulo("Home")
    }, []);

    return (
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={3} rowSpacing={1}  >
                <Grid item xs={12}>
                    <Typography component="a" variant="a" align="center">
                        Pagina inicial
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}