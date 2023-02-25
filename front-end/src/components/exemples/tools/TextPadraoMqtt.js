import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';

export default function TextPadraoMqtt(props) {
    const { data, action } = props
    const [text, setText] = useState();
    const [topico, setTopico] = useState("device/A86E6505613C/mensage");

    const handleChange = (event) => {
        const val = event.target.value;
        if (data && data.caractere && data.linhas) {
            const quebraLinha = val.match(/(\r\n|\n|\r)/gm);
            if (!quebraLinha) {
                if (val.length <= data.caractere) {
                    setText(val);
                } else {
                    // console.log("ERRO");
                }

            } else if (quebraLinha && quebraLinha.length < data.linhas) { // conta quebra linha
                const array = val.split('\n'); // separa linhas
                let test = true;
                for (let x in array) {
                    if (array[x].length > data.caractere) {
                        // console.log("ERRO");
                        test = false;
                    }
                }
                if (test)
                    setText(val);
                // else console.log("erro");
            }
        } else {
            setText(val);
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
        <Grid container item xs={(data && data.sizeGrid) ? data.sizeGrid : 12} spacing={2} rowSpacing={2}>
            <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">{(data && data.nomeCampo) ? data.nomeCampo : "Mensagem"}</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={'text'}
                        multiline={(data && data.linhas) ? true : false}
                        maxRows={(data && data.linhas) ? data.linhas : 1}
                        value={text || ''}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => action(data.topico, text)}
                                    // onMouseDown={() => console.log("mouse donw")}
                                    edge="end"
                                >
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Mensagem MQTT"
                    />
                </FormControl>
            </Grid>
        </Grid>

    );
}