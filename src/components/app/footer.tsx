import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavRoute } from "../../util/models";

import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

export const Footer = (): JSX.Element => {
    return (
        <Box width={750} className="shadowed" position="fixed" bottom={0}>
            <BottomNavigation
                showLabels
            >
                <BottomNavigationAction label="Source" icon={<GitHubIcon />} onClick={(ev) => {
                    ev.preventDefault(); open("https://github.com");
                }} />
                <BottomNavigationAction label="Contact" icon={<EmailIcon />} onClick={(ev) => {
                    ev.preventDefault(); open("mailto:jimmyjcl753@gmail.com");
                }} />
            </BottomNavigation>
        </Box>
    );
}