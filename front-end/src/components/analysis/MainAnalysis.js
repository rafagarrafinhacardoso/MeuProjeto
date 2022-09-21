// https://react-chartjs-2.js.org/examples/line-chart
import { Box, Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Line } from 'react-chartjs-2';
// import faker from 'faker';
// import { StyleSheet, View } from "react-native";

const theme = createTheme();

const options = {
    responsive: true,
    interaction: {
        mode: "index",
        intersect: false
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: "Chart.js Line Chart - Multi Axis"
        }
    },
    scales: {
        y: {
            type: "linear",
            display: true,
            position: "left"
        },
        y1: {
            type: "linear",
            display: true,
            position: "right",
            grid: {
                drawOnChartArea: false
            }
        }
    }
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: [3, 1, 5, 8, 9, 3, 5],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            yAxisID: "y"
        },
        {
            label: "Dataset 2",
            data: [5, 9, 5, 2, 6, 2, 6],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            yAxisID: "y1"
        }
    ]
};

export default function MainAnalysis() {

    useEffect(() => {
        // console.log(equipamentos.length);
        // if (equipamentos.length == 0) {
        // console.log("Buscar equipamentos");
        fetch('/analysis')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // setEquipamentos(data)
            })
            .catch((error) => {
                console.log(error);
            })
        // }

    }, [])

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
                                    graficos graficos e mais graficos
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                {/* <Line data={data} options={options} /> */}
                            </div>

                        </Grid>
                    </Grid>
                </Container>

            </Box>
        </ThemeProvider>
    );
}


