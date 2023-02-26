import { Avatar, Box, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, ThemeProvider, Typography } from "@mui/material";
import * as React from "react";
import { ContentBox, PasswordProtected, textTheme } from "../../util/misc";

// Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MobileOffIcon from '@mui/icons-material/MobileOff';

export const Home = (): JSX.Element => {
    React.useEffect(() => {
        document.title = "Home | Melanie and Andrew's Wedding Website";
    }, []);

    const textSpec = {
        sm: 12, md: 6
    };

    const picSpec = {
        xs: 6
    }

    return (
        <ThemeProvider theme={textTheme}>
            <ContentBox>
                <Grid
                    container
                    style={{ gap: '1.5em' }}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <div className="home-picture shadowed">
                        <img alt="Home Page Banner" width="100%" src="/resources/img/home.jpg" className="css-1ago99h"></img>
                    </div>

                    <PasswordProtected>
                        <Box width="100%" className="shadowed centred" style={{ backgroundColor: "white", justifyContent: "space-evenly" }}>
                            <div>
                                {/* <img src="/resources/img/logo_black.PNG" width="100px" height="100px" /> */}
                                <Typography style={{ fontFamily: "Audrey" }} className="centred" variant="h5">
                                    DETAILS
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
                                    <ListItemAvatar>
                                        <Avatar>
                                            <LocationOnIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={<Typography variant="h5">Venue</Typography>} secondary={<Typography variant="body1">Sue-Ann Staff Estate Winery</Typography>} />
                                    <Button variant="outlined" onClick={() => open("https://www.google.com/maps/place/Sue-Ann+Staff+Estate+Winery/@43.1214508,-79.3575716,17z/data=!3m1!4b1!4m5!3m4!1s0x89d34d14ac3fcad9:0xa6e33a2711035d6d!8m2!3d43.1214469!4d-79.3553829")}>
                                        Click for Directions
                                    </Button>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <EventIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={<Typography variant="h5">Date</Typography>} secondary={<Typography variant="body1">Saturday, September 9, 2023</Typography>} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccessTimeIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={<Typography variant="h5">Time</Typography>} secondary={<Typography variant="body1">3:30 PM</Typography>} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MobileOffIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={<Typography variant="h5">Ceremony</Typography>} secondary={<Typography variant="body1">This is an unplugged ceremony. We invite our guests to be fully present. Kindly switch off all phones and cameras and enjoy the special moment with us. We have hired amazing photographers and videographers to capture our special day. We promise to share the photos after!</Typography>} />
                                </ListItem>
                            </List>
                        </Box>
                    </PasswordProtected>

                    <div className="home-picture shadowed" style={{ width: "60%" }}>
                        <img alt="Venue animation" width="100%" src="/resources/img/animation.gif" className="css-1ago99h"></img>
                    </div>

                    {/* <iframe src="https://free.timeanddate.com/countdown/i8pa6mjd/n250/cf105/cm0/cu4/ct0/cs0/ca0/cr0/ss0/cac000/cpc000/pcfffef6/tcf1d8e7/fs100/szw320/szh135/tac000/tptTime%20since%20Event%20started%20in/tpc000/matMelanie%20and%20Andrew's%20Wedding/mac000/mpc000/iso2023-09-09T15:30:00" allowTransparency={true} frameBorder="0" width="320" height="135"></iframe> */}
                    {/* <iframe src="https://free.timeanddate.com/countdown/i8pa6uze/n250/cf105/cm0/cu4/ct0/cs0/ca0/cr0/ss0/cac000/cpc000/pcfff/tcf1d8e7/fs100/szw320/szh135/tac000/tptTime%20since%20Event%20started%20in/tpc000/matWedding%20Countdown!/mac000/mpc000/iso2023-02-01T00:00:00" allowTransparency={true} frameBorder="0" width="320" height="135"></iframe> */}
                    {/* <iframe src="https://free.timeanddate.com/countdown/i8pa6uh8/n250/cf12/cm0/cu4/ct0/cs0/ca0/cr0/ss0/cac000/cpc000/pcfff/tcfff/fs100/szw320/szh135/tatTime%20left%20to%20Event%20in/tac000/tptTime%20since%20Event%20started%20in/tpc000/mac000/mpc000/iso2023-09-09T03:30:00" allowTransparency={true} frameBorder="0" width="180" height="69"></iframe> */}
                </Grid>
            </ContentBox>
        </ThemeProvider>
    );
}