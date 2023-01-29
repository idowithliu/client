import { Avatar, Box, Button, Divider, Grid, Icon, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, ThemeProvider, Typography } from "@mui/material";
import * as React from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { ContentBox, PasswordProtected, textTheme } from "../../util/misc";


export const NotFound = (): JSX.Element => {
    React.useEffect(() => {
        document.title = "Not Found | Melanie and Andrew's Wedding Website";
    }, []);

    const nav: NavigateFunction = useNavigate();

    return (
        <ThemeProvider theme={textTheme}>
            <ContentBox>
                <Typography variant="h6">Sorry, we couldn't find the page you were looking for.</Typography>
                <Button variant="outlined" onClick={(ev) => {
                    ev.preventDefault(); nav("/");
                }}>Return to home page</Button>
            </ContentBox>
        </ThemeProvider >
    );
}