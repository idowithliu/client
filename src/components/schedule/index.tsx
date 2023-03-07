import { Avatar, Box, Divider, Grid, Icon, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, ThemeProvider, Typography } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import { ContentBox, PasswordProtected, textTheme } from "../../util/misc";

// Icons
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import HotelIcon from '@mui/icons-material/Hotel';
import CollectionsIcon from '@mui/icons-material/Collections';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import { Footer } from "../app/footer";

export const Schedule = (): JSX.Element => {
    React.useEffect(() => {
        document.title = "Q & A | Melanie and Andrew's Wedding Website";
    }, []);

    const textSpec = {
        sm: 12, md: 6
    };

    const picSpec = {
        xs: 6
    }

    return (
        <>
            <ThemeProvider theme={textTheme}>
                <PasswordProtected card>
                    <div id="faq">
                        <Typography variant="h4"></Typography>

                        <Box width="100%" className="shadowed centred" style={{ backgroundColor: "white", justifyContent: "space-evenly", marginTop: "2em", paddingLeft: "3em", paddingRight: "3em" }}>
                            <div className="centred" style={{ flexDirection: "column", gap: "1em" }}>
                                <img src="/resources/img/logo_black.PNG" width="100px" height="100px" />
                                <Typography style={{ fontFamily: "Audrey" }} className="centred" variant="h5">
                                    SCHEDULE
                                </Typography>
                            </div>

                            <List
                                sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    bgcolor: 'background.paper',
                                }}
                            >
                                <ListItem>
                                    <ListItemText primary={<Typography variant="h5">3:30 pm</Typography>} secondary={<Typography variant="h6">Guests arrive</Typography>} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemText primary={<Typography variant="h5">4:00 pm</Typography>} secondary={<Typography variant="h6">Ceremony starts</Typography>} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemText primary={<Typography variant="h5">4:30 pm</Typography>} secondary={<Typography variant="h6">Family and friends group photos</Typography>} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemText primary={<Typography variant="h5">5:00 pm</Typography>} secondary={<Typography variant="h6">Cocktail hour</Typography>} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemText primary={<Typography variant="h5">6:00 pm</Typography>} secondary={<Typography variant="h6">Seated dinner</Typography>} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemText primary={<Typography variant="h5">9:15 pm</Typography>} secondary={<Typography variant="h6">Party and dancing</Typography>} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </List>
                        </Box>
                    </div>
                </PasswordProtected>
            </ThemeProvider>
            <Footer />
        </>
    );
}