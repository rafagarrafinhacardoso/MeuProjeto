import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Paper, ThemeProvider, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MessageIcon from '@mui/icons-material/Message';

const barraMenu = [
    { id: 1, text: "Pagina Inicial", link: "/", icon: "Home" },
    {
        id: 2, text: "Equipamentos", link: "/devices", subMenu: [
            { id: "2.1", text: "Registrar", link: "/regEquipamento" },
            { id: "2.2", text: "Listar", link: "/listEquipamentos" }
        ]
    },
    {
        id: 3, text: "Serviços MQTT", link: "/serviceMqtt", subMenu: [
            { id: "3.1", text: "Mensagem", link: "/messange", icon: "Message" },
            { id: "3.2", text: "Butão", link: "/btnMqtt" },
            { id: "3.3", text: "Default", link: "/toolsMqtt" }
        ]
    },
    { id: 4, text: "Monitor de Movimento Análise", link: "/mainAnalysis" },
];

export default function LeftMenu(props) {
    const { open, setOpen } = props;
    let navigate = useNavigate();
    const [menu, setMenu] = useState(barraMenu);

    function clickItemMenu(l) {
        // console.log(item)
        navigate(l, { replace: true });
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
                                onClick={() => clickItemMenu(item.link)}
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
                                        onClick={() => clickItemMenu(item.link ? item.link + itemSub.link : itemSub.link)}
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
