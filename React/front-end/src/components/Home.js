import { AccountCircle, Assignment, BarChart, Dashboard, Layers, People, PhotoCamera, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Container, createTheme, CssBaseline, Divider, Drawer, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Paper, ThemeProvider, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Header from "./Header";
// import CameraIcon from '@mui/icons-material/PhotoCamera';

const theme = createTheme();

export default function Home() {
    const [open, setOpen] = useState(false);
    const [perfil, setPerfil] = useState(false);

    const buttonRef = React.useRef();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
     };
     const handleClose = () => {
         setAnchorEl(null);
     };

    const toggleDrawer = () => {
        setOpen(!open);
        // console.log("test");
        // console.log(open);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3} rowSpacing={1}  >
                        <Grid item xs={12}>
                            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                                <main>
                                    <h2>Welcome to the homepage!</h2>
                                    <p>You can do this, I believe in you.</p>
                                </main>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <nav>
                                    <Link to="/about">About</Link>
                                </nav>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

            </Box>
        </ThemeProvider>
    );
}