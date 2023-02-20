import { AccountCircle, Assignment, BarChart, Dashboard, Layers, People, PhotoCamera, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Container, createTheme, CssBaseline, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Paper, ThemeProvider, Toolbar, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MessageIcon from '@mui/icons-material/Message';

const barraMenu = [
    { id: 1, text: "Pagina Inicial", link: "/", icon: "Home" },
    {
        id: 2, text: "Serviços MQTT", subMenu: [
            { id: "2.1", text: "Mensagem", link: "/messange", icon: "Message" },
            { id: "2.2", text: "Butão", link: "/btnMqtt" }]
    },
    { id: 3, text: "Monitor de Movimento Análise", link: "/mainAnalysis" },
    {
        id: 4, text: "Equipamentos", subMenu: [
            { id: "4.1", text: "Registrar", link: "/regEquipamento" },
            { id: "4.2", text: "Listar", link: "/listEquipamentos" }]
    }
];

export default function LeftMenu(props) {
    const { open, setOpen } = props;
    let navigate = useNavigate();
    const [menu, setMenu] = useState(barraMenu);

    function clickItemMenu(item) {
        // console.log(item)
        navigate(item.link, { replace: true });
        setOpen(false);
    }
    function clickOpenMenu(i) {
        let array = [...menu];
        for (let x in array) {
            const item = array[x];
            if (item.id == i.id) {
                array[x] = {
                    ...array[x],
                    open: item.open ? !item.open : true
                };
            }
        }
        // console.log(array);
        setMenu(array);
    }
    function selectIcon(i) {
        if (i === "Home") return (<HomeIcon />);
        if (i === "Message") return (<MessageIcon />);
        return (<MoreHorizIcon />);
    }

    return (
        <List>
            {menu.map((item, index) => (
                <div key={"item_" + index}>
                    {!(item && item.subMenu) &&
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
                                    {selectIcon(item.icon)}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>}
                    {item && item.subMenu &&
                        <>
                            <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    onClick={() => clickOpenMenu(item)}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                            {item.open && item.subMenu.map((itemSub, indexSub) => (
                                <ListItem key={itemSub.id} disablePadding sx={{ display: 'block', background: '#f0f0f0' }}  >
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            left: 10,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                        onClick={() => clickItemMenu(itemSub)}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <KeyboardArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={itemSub.text} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </>
                    }
                </div>
            ))}
        </List>
    );
}
