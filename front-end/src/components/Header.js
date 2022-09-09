import { AccountCircle, Assignment, BarChart, Dashboard, Layers, People, PhotoCamera, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Container, createTheme, CssBaseline, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Paper, ThemeProvider, Toolbar, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const barraMenu = [
    {"text": "Pagina Inicial", "link": "/", "id": 1},
    {"text": "Registrar Monitor de Movimento", "link": "/regEquipamento", "id": 2},
    {"text": "Listar Monitores de Movimento", "link": "/listEquipamentos", "id": 3},
    {"text": "Exemple MQTT", "link": "/btnMqtt", "id": 4},
    {"text": "Fuck Pagina", "link": "/", "id": 4}
];

export default function Header() {
    let navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const buttonRef = useRef();
    const [anchorEl, setAnchorEl] = useState(null);

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

    function clickItemMenu(item) {
        // console.log(item)
        navigate(item.link, { replace: true });
    }

    return (
        <>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Dashboard
                    </Typography>
                    <IconButton
                        color="inherit"
                        size="large"
                        aria-label="account of current user"
                        aria-controls={anchorEl ? "simple-menu" : undefined}
                        aria-haspopup="true"
                        onClick={handleMenu}
                        ref={buttonRef}
                    >
                        <Badge color="secondary">
                            <AccountCircle />
                        </Badge>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={buttonRef.current}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={() => setOpen(false)}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                {/* <List component="nav">
                    {mainListItems}
                </List> */}
                <List>
                    {barraMenu.map((item, index) => (
                        <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={() => clickItemMenu(item)}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ArrowForwardIosIcon />
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );

}
