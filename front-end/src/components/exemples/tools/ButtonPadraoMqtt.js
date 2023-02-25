import { Button, Grid, Typography } from "@mui/material";

export default function ButtonPadraoMqtt(props) {
    const { data, action } = props

    return (
        <Grid container item xs={(data && data.sizeGrid) ? data.sizeGrid : 12} spacing={2} rowSpacing={2} alignItems="center" >
            <Grid item xs={12}  >
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={()=> action(data.topico, data.action)}
                >
                    {(data && data.nomeCampo) ? data.nomeCampo : "Botão"}
                </Button>
                {/* <Typography component="a" variant="a" align="center">
                    {(data && data.tipoCampo) ? data.tipoCampo : "tipoCampo: null"}<br />
                    {(data && data.topico) ? data.topico : "topico: null"}<br />
                    {(data && data.nomeCampo) ? data.nomeCampo : "nomeCampo: null"}<br />
                    {(data && data.descricao) ? data.descricao : "descricao: null"}
                </Typography> */}
            </Grid>
        </Grid>
    );
}
