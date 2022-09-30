// https://react-chartjs-2.js.org/examples/line-chart
import { Box, Button, Container, createTheme, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField, ThemeProvider, Typography } from "@mui/material";
import TooltipMui from '@mui/material/Tooltip';
import React, { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Header from "../Header";
import CachedIcon from '@mui/icons-material/Cached';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
// import Box from '@mui/material/Box';
// import { Line } from 'react-chartjs-2';
// import faker from 'faker';
// import { StyleSheet, View } from "react-native";

const theme = createTheme();

const typeAnalys = [
    { nome: "Aceleração", value: "acceleration", id: 10 },
    { nome: "Rotação", value: "gyro", id: 11 }
];
export default function MainAnalysis() {
    const [dataAnalysis, setDataAnalysis] = useState([]);
    const [analysi, setAnalysi] = useState({
        graphA: "0",
        graphB: "0",
    });
    const [analysiType, setAnalysiType] = useState({
        graphA: 'acceleration',
        graphB: 'acceleration',
    });
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [editAnalys, setEditAnalys] = useState(false);
    // const [valueDate, setValue] = useState(dayjs('2014-08-18T21:11:54'));

    useEffect(() => {
        // console.log(equipamentos.length);
        if (dataAnalysis.length == 0) {
            // console.log("Buscar equipamentos");
            buscarAnalises();
        }

    }, [])

    function buscarAnalises() {
        fetch('/analysis')
            .then((res) => res.json())
            .then((data) => {
                let resp = [];
                let cont = -1;
                for (let i in data) {
                    const ma = data[i];
                    let aux = [];
                    for (let c in ma.acceleration.x) {
                        // console.log(c);
                        aux.push({
                            eixoX: c,
                            acceleration: {
                                x: ma.acceleration.x[c],
                                y: ma.acceleration.y[c],
                                z: ma.acceleration.z[c]
                            },
                            gyro: {
                                x: ma.gyro.x[c],
                                y: ma.gyro.y[c],
                                z: ma.gyro.z[c]
                            }
                        });
                    }
                    resp.push({
                        values: aux,
                        id: ma.id,
                        equipamento: ma.serialNumber,
                        inde: i,
                        name: ma.userName ? (ma.userName + " " + ma.analysName) : ("default " + i)
                    })
                    cont++;
                }
                setDataAnalysis(resp);
                setAnalysi({
                    ...analysi,
                    graphB: cont
                })
                // console.log(data, resp, cont);
                // setEquipamentos(data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleChange = (event) => {
        // console.log(event.target);
        setAnalysi({
            ...analysi,
            [event.target.name]: event.target.value
        });
    };

    const handleChangeType = (event) => {
        // console.log(event.target);
        setAnalysiType({
            ...analysiType,
            [event.target.name]: event.target.value
        });
    };

    const handleChangeDialog = (event) => {
        // console.log(editAnalys);
        setEditAnalys({
            ...editAnalys,
            [event.target.name]: event.target.value
        });
        // setAnalysi({
        //     ...analysi,
        //     [event.target.name]: event.target.value
        // });
    };

    function buscarAnalideId(grafico) {
        let id = "";
        if (grafico == "graphA") {
            id = dataAnalysis[analysi.graphA].id;
        } else if (grafico == "graphB") {
            id = dataAnalysis[analysi.graphB].id;
        } else {
            console.log("Erro");
        }

        fetch('/analysis/' + id)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setEditAnalys(data);
                setOpen(true);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    const handleClose = () => {
        setOpen(false);
    };

    function alterarAnalise() {
        // console.log(editAnalys)
        fetch("/analysis/alterar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(editAnalys),
        })
            .then(res => res.json())
            .then((result) => {
                // console.log("Salvo", result)
                setOpen(false);
                buscarAnalises();

            })
            .catch((error) => {
                console.log(error);
            })

    }

    function deletarAnalise() {
        fetch("/analysis/" + editAnalys.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(editAnalys),
        })
            .then((result) => {
                // console.log("Deletado", result)
                if (result.ok) {
                    setOpenDelete(false);
                    setAnalysi({
                        graphA: "0",
                        graphB: "0",
                    });
                    buscarAnalises();
                }
                // setOpenDelete(false)
                // buscarAnalises();

            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Header />
                    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                        <Grid container spacing={3} rowSpacing={1}  >
                            <Grid item xs={12}>
                                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                                    <Typography component="h1" variant="h4" align="center">
                                        Analise Grafica
                                        <TooltipMui title="Recarregar">
                                            <IconButton onClick={() => buscarAnalises()}>
                                                <CachedIcon />
                                            </IconButton>
                                        </TooltipMui>
                                    </Typography>
                                </Paper>
                            </Grid>
                            {/* </Grid> */}
                            <Grid item xs={6}>
                                {/* <Typography component="h1" variant="h4" align="center">
                                Aceleração
                            </Typography> */}
                                <FormControl variant="outlined" sx={{ m: 1, minWidth: 250 }}>
                                    <InputLabel id="analysi-type-select-label-2">Tipo Analise</InputLabel>
                                    <Select
                                        labelId="analysi-type-select-label-2"
                                        id="analysi-type-select-2"
                                        value={analysiType.graphA}
                                        label="Tipo Analise-2"
                                        onChange={handleChangeType}
                                        name="graphA"
                                    >
                                        {typeAnalys.map((item) => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.value}
                                            >{item.nome}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" sx={{ m: 1, minWidth: 150 }}>
                                    <InputLabel id="analysi-select-label-2">Analise</InputLabel>
                                    <Select
                                        labelId="analysi-select-label-2"
                                        id="analysi-select-2"
                                        value={analysi.graphA}
                                        label="Analise"
                                        onChange={handleChange}
                                        name="graphA"
                                    >
                                        {dataAnalysis.map((item, index) => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.inde}
                                            >{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart
                                        width={500}
                                        height={300}
                                        data={dataAnalysis.length ? dataAnalysis[analysi.graphA].values : []}
                                        margin={{
                                            top: 10,
                                            right: 1,
                                            left: 1,
                                            bottom: 15,
                                        }}>
                                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                        <XAxis dataKey="eixoX" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line legendType={"square"} dot={false} type="natural" name={"X"} dataKey={analysiType.graphA + ".x"} stroke="#f44336" />
                                        <Line legendType={"square"} dot={false} type="natural" name={"Y"} dataKey={analysiType.graphA + ".y"} stroke="#38761d" />
                                        <Line legendType={"square"} dot={false} type="natural" name={"Z"} dataKey={analysiType.graphA + ".z"} stroke="#6a329f" />
                                    </LineChart>
                                </ResponsiveContainer>
                                <Button
                                    variant="contained"
                                    onClick={() => buscarAnalideId("graphA")}
                                >
                                    Alterar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" sx={{ m: 1, minWidth: 250 }}>
                                    <InputLabel id="analysi-type-select-label-1">Tipo Analise</InputLabel>
                                    <Select
                                        labelId="analysi-type-select-label-1"
                                        id="analysi-type-select-1"
                                        value={analysiType.graphB}
                                        label="Tipo Analise-1"
                                        onChange={handleChangeType}
                                        name="graphB"
                                    >
                                        {typeAnalys.map((item) => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.value}
                                            >{item.nome}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" sx={{ m: 1, minWidth: 150 }}>
                                    <InputLabel id="analysi-select-label-2">Analise</InputLabel>
                                    <Select
                                        labelId="analysi-select-label-2"
                                        id="analysi-select-2"
                                        value={analysi.graphB}
                                        label="Analise"
                                        onChange={handleChange}
                                        name="graphB"
                                    >
                                        {dataAnalysis.map((item, index) => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.inde}
                                            >{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart
                                        width={500}
                                        height={300}
                                        data={dataAnalysis.length ? dataAnalysis[analysi.graphB].values : []}
                                        margin={{
                                            top: 10,
                                            right: 1,
                                            left: 1,
                                            bottom: 15,
                                        }}>
                                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                        <XAxis dataKey="eixoX" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line legendType={"square"} dot={false} type="natural" name={"X"} dataKey={analysiType.graphB + ".x"} stroke="#f44336" />
                                        <Line legendType={"square"} dot={false} type="natural" name={"Y"} dataKey={analysiType.graphB + ".y"} stroke="#38761d" />
                                        <Line legendType={"square"} dot={false} type="natural" name={"Z"} dataKey={analysiType.graphB + ".z"} stroke="#6a329f" />
                                    </LineChart>
                                </ResponsiveContainer>
                                <Button
                                    variant="contained"
                                    onClick={() => buscarAnalideId("graphB")}
                                >
                                    Alterar
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Alterar Analise"}
                    </DialogTitle>
                    <DialogContent>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                sx={{ mt: 2, minWidth: 220 }}
                                id="nome"
                                label="Número de Série"
                                variant="outlined"
                                value={editAnalys.serialNumber || ""}
                                // onChange={handleChangeDialog}
                                InputProps={{
                                    readOnly: true
                                }}
                                name="serialNumber"
                            />
                            <TextField
                                sx={{ mt: 2, minWidth: 220 }}
                                id="nome"
                                label="Nome Analise"
                                variant="outlined"
                                value={editAnalys.analysName || ""}
                                onChange={handleChangeDialog}
                                name="analysName"
                            />
                            <TextField
                                sx={{ mt: 2, minWidth: 220 }}
                                id="nome"
                                label="Usuario"
                                variant="outlined"
                                value={editAnalys.userName || ""}
                                onChange={handleChangeDialog}
                                name="userName"
                            />
                            <DateTimePicker
                                label="Date "
                                value={editAnalys.createdAt}
                                onChange={() => console.log("<<<>>>")}
                                disabled={true}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setOpen(false); setOpenDelete(true) }}>Deletar</Button>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={() => alterarAnalise()} autoFocus>
                            Salvar
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Tem Certeza que deseja deletar essa analise?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => deletarAnalise()}>Sim</Button>
                        <Button onClick={() => setOpenDelete(false)}>Não</Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </LocalizationProvider >
    );
}


