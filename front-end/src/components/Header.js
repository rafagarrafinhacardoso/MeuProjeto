import { AccountCircle, Assignment, BarChart, Dashboard, Layers, People, PhotoCamera, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Container, createTheme, CssBaseline, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Paper, ThemeProvider, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LeftMenu from "./LeftMenu";
import RouterIcon from '@mui/icons-material/Router';
import LeakAddIcon from '@mui/icons-material/LeakAdd';
import LeakRemoveIcon from '@mui/icons-material/LeakRemove';


const MINUTE_MS = 10 * 1000;
export default function Header(props) {
    const { setdevices, devices } = props
    const [open, setOpen] = useState(false);
    const buttonRef = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const [conectMqtt, setConectMqtt] = useState(false);

    useEffect(() => {
        if (conectMqtt) {
            if (setdevices)
                buscaDispositivoConectado();
            const interval = setInterval(() => {
                if (setdevices)
                    buscaDispositivoConectado();
                else
                    console.log("ERRO -> pagina");
            }, MINUTE_MS);
            return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        } else if (setdevices) {
            setdevices([]);
        }
    }, [conectMqtt]);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function clickConectMQTT() {
        setConectMqtt(!conectMqtt)
        // setAnchorEl(null);
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    function buscaDispositivoConectado() {
        fetch('/equipamento/ativo')
            .then((res) => res.json())
            .then((data) => {
                setdevices(data);
                // for (let x in data) {
                //     const moni = data[x];
                //     if (moni.updatedAt !== moni.createdAt) {
                //         var update = new Date(moni.updatedAt);
                //         if (((new Date()) - update) < (new Date(0).setMinutes(5))) {
                //             data[x].status = "Ativo";
                //         } else {
                //             data[x].status = "Desativo";
                //         }
                //     } else {
                //         data[x].status = "";
                //     }
                // }
                // setEquipamentos(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function handleSelectDispositivo(d) {
        console.log("Dispositivo: ", d);
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
                            {/* <RouterIcon sx={{ color: conectMqtt ? '#2BFF00' : '' }} /> */}
                            {conectMqtt &&
                                <LeakAddIcon sx={{ color: '#2BFF00' }} />
                            }
                            {!conectMqtt &&
                                <LeakRemoveIcon />
                            }
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
                        PaperProps={{ style: { minWidth: 230 } }}
                    >
                        <MenuItem onClick={() => clickConectMQTT()} disableRipple >
                            {conectMqtt &&
                                <>
                                    Disconect
                                </>
                            }
                            {!conectMqtt &&
                                <>
                                    Conect
                                </>
                            }
                        </MenuItem>
                        {devices && devices.map((equip, index) => (
                            <MenuItem onClick={() => handleSelectDispositivo(equip)} key={equip.id}>
                                <ListItemText>{equip.nome}</ListItemText>
                                {/* <RouterIcon /> */}
                                <Typography variant="body2" color="text.secondary">
                                    10m
                                </Typography>
                            </MenuItem>

                        ))}
                        <MenuItem onClick={handleClose}>
                            Close
                        </MenuItem>
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
                <LeftMenu open={open} setOpen={setOpen} />
            </Drawer>
        </>
    );

}
