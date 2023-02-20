import { AccountCircle, Assignment, BarChart, Dashboard, Layers, People, PhotoCamera, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Container, createTheme, CssBaseline, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Paper, ThemeProvider, Toolbar, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LeftMenu from "./LeftMenu";



export default function Header() {

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
                <LeftMenu open={open} setOpen={setOpen} />
            </Drawer>
        </>
    );

}
