import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavRoute } from "../../util/models";

import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const Footer = (): JSX.Element => {
    return (
        <>
            <div style={{ height: "4em" }} />
            <Box width={"100%"} className="shadowed">
                <BottomNavigation
                    showLabels
                >
                    <BottomNavigationAction sx={{ width: "100px", padding: "0" }} label="Made with love by Jimmy Liu" icon={<FavoriteIcon />}></BottomNavigationAction>
                    <BottomNavigationAction label="Source" icon={<GitHubIcon />} onClick={(ev) => {
                        ev.preventDefault(); open("https://github.com/idowithliu");
                    }} />
                    {/* <BottomNavigationAction label="Contact" icon={<EmailIcon />} onClick={(ev) => {
                        ev.preventDefault(); open("mailto:jimmyjcl753@gmail.com");
                    }} /> */}
                </BottomNavigation>
            </Box>
        </>
    );
}