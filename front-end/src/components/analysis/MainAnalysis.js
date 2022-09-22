// https://react-chartjs-2.js.org/examples/line-chart
import { Box, Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Header from "../Header";
// import { Line } from 'react-chartjs-2';
// import faker from 'faker';
// import { StyleSheet, View } from "react-native";

const theme = createTheme();


export default function MainAnalysis() {
    const [dataAnalysis, setDataAnalysis] = useState([]);


    useEffect(() => {
        // console.log(equipamentos.length);
        if (dataAnalysis.length == 0) {
            // console.log("Buscar equipamentos");
            fetch('/analysis')
                .then((res) => res.json())
                .then((data) => {
                    let resp = [];
                    for (let i in data) {
                        const ma = data[i];
                        let aux = [];
                        for (let c in ma.acceleration.x) {
                            // console.log(c);
                            aux.push({
                                eixoX: c,
                                accele_X: ma.acceleration.x[c],
                                accele_Y: ma.acceleration.y[c],
                                accele_Z: ma.acceleration.z[c],
                                gyro_x: ma.gyro.x[c],
                                gyro_y: ma.gyro.y[c],
                                gyro_z: ma.gyro.z[c],
                            });
                        }
                        resp.push(aux)

                    }
                    setDataAnalysis(resp)
                    console.log(data, resp);
                    // setEquipamentos(data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }

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
                                    graficos graficos e mais graficos  asda
                                </Typography>
                            </Paper>
                        </Grid>
                        </Grid>
                        {/* <Grid item xs={12}> */}
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart
                                    width={500}
                                    height={300}
                                    data={dataAnalysis[3]}
                                    margin={{
                                        top: 10,
                                        right: 5,
                                        left: -25,
                                        bottom: 1,
                                    }}>
                                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                    <XAxis dataKey="eixoX" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line legendType={"square"} dot={false} type="natural" name={"X"} dataKey="accele_X" stroke="#8884d8" />
                                    <Line legendType={"square"} dot={false} type="natural" name={"Y"} dataKey="accele_Y" stroke="#82ca9d" />
                                    <Line legendType={"square"} dot={false} type="natural" name={"Z"} dataKey="accele_Z" stroke="#82ff9d" />
                                </LineChart>
                            </ResponsiveContainer>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart
                                    width={500}
                                    height={300}
                                    data={dataAnalysis[0]}
                                    margin={{
                                        top: 10,
                                        right: 5,
                                        left: -25,
                                        bottom: 1,
                                    }}>
                                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                    <XAxis dataKey="eixoX" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line legendType={"square"} dot={false} type="natural" name={"X"} dataKey="accele_X" stroke="#8884d8" />
                                    <Line legendType={"square"} dot={false} type="natural" name={"Y"} dataKey="accele_Y" stroke="#82ca9d" />
                                    <Line legendType={"square"} dot={false} type="natural" name={"Z"} dataKey="accele_Z" stroke="#82ff9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        {/* </Grid> */}
                    {/* </Grid> */}
                </Container>

            </Box>
        </ThemeProvider>
    );
}


