import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';

export default function MessageMqtt() {
    const [setTitulo] = useOutletContext();
    const [text, setText] = useState();
    const [topico, setTopico] = useState("device/A86E6505613C/mensage");

    useEffect(() => {
        setTitulo("Mensagem Mqtt -> Display OLED 128x64")

    }, []);

    const handleChange = (event) => {
        const val = event.target.value;
        const quebraLinha = val.match(/(\r\n|\n|\r)/gm);
        if (!quebraLinha) {
            if (val.length <= 21) {
                setText(val);
            } else {
                // console.log("ERRO");
            }

        } else if (quebraLinha && quebraLinha.length < 8) { // conta quebra linha
            const array = val.split('\n'); // separa linhas
            let test = true;
            for (let x in array) {
                if (array[x].length > 21) {
                    // console.log("ERRO");
                    test = false;
                }
            }
            if (test)
                setText(val);
            // else console.log("erro");
        }
        else {
            // console.log("ERRO");
        }
    };
    const handleChangeTopico = (event) => {
        setTopico(event.target.value);
    };

    const enviaMessage = () => {
        // console.log("enviar")
        const dado = {
            message: text,
            topic: topico
        };
        fetch("/mqtt/sendMensagem", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(dado),
        })
            .then(res => res.json())
            .then((result) => {
                console.log("aaaaaaa-> ", result);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <Grid container spacing={3} rowSpacing={1} >
            <Grid item sm={12}>
                <Grid container spacing={2}>
                    {/* <Grid item xs={12}></Grid> */}
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Mensagem"
                            multiline
                            // rows={4}
                            maxRows={8}
                            value={text || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            id="topiv"
                            label="Topico"
                            value={topico || ''}
                            onChange={handleChangeTopico}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" endIcon={<SendIcon />} onClick={enviaMessage} >
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );
}