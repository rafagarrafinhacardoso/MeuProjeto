import { Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ButtonPadraoMqtt from "./tools/ButtonPadraoMqtt";
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
            sizeGrid: 6,
            caractere: 21,
            linhas: 8
        },
        {
            tipoCampo: "textDefault",
            nomeCampo: "Mensagem Serial",
            descricao: "Display OLED 128x64 - 6x8",
            topico: "mensage",
            sizeGrid: 6
        },{
            tipoCampo: "textDefault",
            nomeCampo: "Campo nome lalal",
            descricao: "AaaaaA",
            topico: "aciton",
            sizeGrid: 6
        },{
            tipoCampo: "btnDefault",
            nomeCampo: "LED vermelho",
            descricao: "AaaaaA",
            topico: "btnA",
            action: "test",
            sizeGrid: 2
        }

    ]
};

export default function ToolsMqttPainel() {
    const [setTitulo] = useOutletContext();
    useEffect(() => {
        setTitulo("Ferramentas MQTT")
    }, []);

    // const enviaMessage = () => {
    //     // console.log("enviar")
    //     const dado = {
    //         message: text,
    //         topic: topico
    //     };
    //     fetch("/mqtt/sendMensagem", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json'
    //         },
    //         body: JSON.stringify(dado),
    //     })
    //         .then(res => res.json())
    //         .then((result) => {
    //             console.log("aaaaaaa-> ", result);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    function actionMqtt(tpc , msg){
        console.log("enviar...", tpc, msg);
    }

    return (
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={2} rowSpacing={2}  >
                <Grid item xs={12}>
                    <Typography component="a" variant="a" align="center">
                        {(disp && disp.equipamento && disp.equipamento.nome) ? disp.equipamento.nome : ""}
                        Display OLED 128x64 - ({(128 / 6) | 0}x{64 / 8})
                    </Typography>
                </Grid>
                {disp && disp.fucionalidade.map((item, index) => {
                    if (item.tipoCampo == "textDefault")
                        return (<TextPadraoMqtt key={index} data={item} action={actionMqtt} />);
                    else if (item.tipoCampo == "btnDefault")
                        return (<ButtonPadraoMqtt key={index} data={item} action={actionMqtt} />);
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
            <Grid item xs={12}>
                <Typography component="a" variant="a" align="center">
                    {(data && data.tipoCampo) ? data.tipoCampo : "tipoCampo: null"}<br/>
                    {(data && data.topico) ? data.topico : "topico: null"}<br/>
                    {(data && data.nomeCampo) ? data.nomeCampo : "nomeCampo: null"}<br/>
                    {(data && data.descricao) ? data.descricao : "descricao: null"}
                </Typography>
            </Grid>
        </Grid>
    );
}