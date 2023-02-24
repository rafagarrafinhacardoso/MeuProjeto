import { Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import TextPadraoMqtt from "./tools/TextPadraoMqtt";

const disp = {
    id: 1,
    equipamento: {
        nome: "Monitor de movimento",
        serialNumber: "A86E6505613C"
    },
    fucionalidade: [
        {
            tipoCampo: "textDefault",
            nomeCampo: "Mensagem OLED",
            descricao: "Display OLED 128x64 - 6x8",
            topico: "mensage",
            sizeGrid: 12,
            caractere: 21,
            linhas: 8
        },
        {
            tipoCampo: "textDefault",
            nomeCampo: "Mensagem Serial",
            descricao: "Display OLED 128x64 - 6x8",
            topico: "mensage",
            sizeGrid: 6
        }
    ]
};

export default function ToolsMqttPainel() {
    const [setTitulo] = useOutletContext();
    useEffect(() => {
        setTitulo("Ferramentas MQTT")
    }, []);

    return (
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={2} rowSpacing={2}  >
                <Grid item xs={12}>
                    <Typography component="a" variant="a" align="center">
                        Display OLED 128x64 - ({(128 / 6) | 0}x{64 / 8})
                    </Typography>
                </Grid>
                {disp && disp.fucionalidade.map((item, index) => {
                    if (item.tipoCampo == "textDefault")
                        return (<TextPadraoMqtt key={index} data={item} />);
                    else if (item.tipoCampo == "btnDefault")
                        return (<CampoDefalt key={index} />);
                    else
                        return (<CampoDefalt key={index} data={item} />);
                })}
            </Grid>
        </Paper>
    );
}

function CampoDefalt(props) {
    const { data } = props
    return (
        <Grid container item xs={(data && data.sizeGrid) ? data.sizeGrid : 12} spacing={2} rowSpacing={2}>
            <Grid item xs={6}>
                <Typography component="a" variant="a" align="center">
                    Pagina não Encontrada
                </Typography>
            </Grid>
        </Grid>
    );
}