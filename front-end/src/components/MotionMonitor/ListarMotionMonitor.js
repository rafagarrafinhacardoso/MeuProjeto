import { Box, Button, Container, createTheme, CssBaseline, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
// import CameraIcon from '@mui/icons-material/PhotoCamera';

const theme = createTheme();



export default function ListarMotionMonitor() {
    const [equipamentos, setEquipamentos] = useState([])

    useEffect(() => {
        // console.log(equipamentos.length);
        if (equipamentos.length == 0) {
            // console.log("Buscar equipamentos");
            fetch('/equipamento')
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    setEquipamentos(data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [])

    const btnClickEnviar = () => {
        fetch('/equipamento')
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    for (let x in data){
                        const moni = data[x];
                        if (moni.updatedAt !== moni.createdAt){
                            var update = new Date(moni.updatedAt);
                            if( ((new Date())- update ) < (new Date(0).setMinutes(5)) ){
                                data[x].status = "Ativo";
                            }else{
                                data[x].status = "Desativo";
                            }
                        }else{
                            data[x].status = "";
                        }
                    }
                    setEquipamentos(data)
                })
                .catch((error) => {
                    console.log(error);
                })
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                    <Grid container spacing={3} rowSpacing={1}  >
                        <Grid item xs={12}>
                            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                                <Typography component="h1" variant="h4" align="center">
                                    Listar Monitores de Movimento
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
                                    <TableContainer component={Paper} sx={{ m: 1, minWidth: 460 }} >
                                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Nome do Dispositivo</TableCell>
                                                    <TableCell align="right"> Número de série</TableCell>
                                                    <TableCell align="right"> Status</TableCell>
                                                    <TableCell align="right">Tipo do Equipamento</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {equipamentos.map((equi) => (
                                                    <TableRow
                                                        key={equi.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {equi.nome}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {equi.serialNumber}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {equi.status || ""}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {equi.equipType}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    </div>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={btnClickEnviar}
                                        >
                                            Buscar
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