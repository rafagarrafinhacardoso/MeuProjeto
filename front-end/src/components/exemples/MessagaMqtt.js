import { Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function MessagaMqtt() {

    const [setTitulo] = useOutletContext();
    useEffect(() => {
        console.log(">>>>use-Effect<<<<");
        setTitulo("Mensagem Mqtt test")

    }, [])

    // const btnInterruptorLed = () => {
    //     console.log("enviar")
    //     fetch('/mqtt/btnLed')
    //         .then((data) => {
    //             console.log(data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    return (
        <Grid container spacing={3} rowSpacing={1} >
            <Grid item sm={12}>
                <Grid container spacing={2}>
                    {/* <Grid item xs={12}></Grid> */}
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="test"
                            multiline
                            rows={4} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-basicsss"
                            label="test"
                            multiline
                            rows={4} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );
}