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

export const Faq = (): JSX.Element => {
    React.useEffect(() => {
        document.title = "Q & A | Melanie and Andrew's Wedding Website";
    }, []);

    const textSpec = {
        sm: 12, md: 6
    };

    const picSpec = {
        xs: 6
    }

    const FaqItem = (props: { question: string | JSX.Element, answer: string | JSX.Element, Icon: JSX.Element }): JSX.Element => {
        return (
            <ListItem alignItems="flex-start">
                <ListItemIcon>
                    {props.Icon}
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant="h4">
                            {props.question}
                        </Typography>
                    }
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="h5"
                                color="text.primary"
                            >
                                {props.answer}
                            </Typography>

                        </React.Fragment>
                    }
                />
            </ListItem>
        );
    }

    return (
        <ThemeProvider theme={textTheme}>
            <ContentBox>
                <PasswordProtected>
                    <div id="faq">
                        <Typography variant="h4">Frequently Asked Questions</Typography>

                        <List sx={{ width: '100%', bgcolor: '#fffef6' }}>
                            <FaqItem
                                question="Where are the ceremony and reception taking place?"
                                answer={
                                    <>The ceremony, cocktail hour, and reception will be held on-site at the &nbsp;
                                        <a target="_blank" href="https://www.google.com/maps/place/Sue-Ann+Staff+Estate+Winery/@43.1214508,-79.3575716,17z/data=!3m1!4b1!4m5!3m4!1s0x89d34d14ac3fcad9:0xa6e33a2711035d6d!8m2!3d43.1214469!4d-79.3553829">
                                            <strong>Sue Ann Staff Estate and Winery</strong> in <strong>Jordan, Ontario</strong>
                                        </a>. The ceremony will be held outdoors,
                                        and the reception will be held in a tent.</>
                                }
                                Icon={<LocationOnIcon fontSize="large" />}
                            />
                            <Divider variant="inset" component="li" />
                            <FaqItem
                                question="How do I get there?"
                                answer={"Please arrange your own transportation to and from the venue. There will be alcohol served at the event. Please drink responsibly and arrange for a designated driver."}
                                Icon={<DirectionsCarFilledIcon fontSize="large" />}
                            />
                            <Divider variant="inset" component="li" />
                            <FaqItem
                                question="Is there a dress code?"
                                answer={<>We'd love to see our family and friends dress up with us! We are requesting <strong>black-tie-optional</strong> attire for our wedding. Ladies can wear floor-length, tea-length, or midi formal dresses. Gentlemen can wear a suit & tie. No jeans please!</>}
                                Icon={<CheckroomIcon fontSize="large" />}
                            />
                            <Divider variant="inset" component="li" />
                            <FaqItem
                                question="Can I bring a guest/date?"
                                answer={<>If you've received a +1, your guest's name will be listed on your invitation and will appear under your name when you <Link to="/rsvp"><u>RSVP</u></Link>. Otherwise, we would love to keep the wedding as an intimate event with close friends and family.</>}
                                Icon={<PersonAddAlt1Icon fontSize="large" />}
                            />
                            <Divider variant="inset" component="li" />
                            <FaqItem
                                question="Are there any accomodations?"
                                answer={<><>A block of rooms has been reserved for our guests at the <a target="_blank" style={{ fontWeight: "bold" }} href="https://www.google.com/maps/place/Inn+On+The+Twenty/@43.149579,-79.3719061,17z/data=!3m1!4b1!4m8!3m7!1s0x89d348fcd0310b85:0x128b1847a422a017!5m2!4m1!1i2!8m2!3d43.1495719!4d-79.3697271">
                                    Inn on the Twenty, 3845 Main Street, Jordan, Ontario
                                </a>. To book over the phone at <strong>1-888-669-5566</strong>, please ask for the room block under our names.</>
                                    <><br /><br />To book online, visit <a target="_blank" href="https://www.vintage-hotels.com/reservations.htm" style={{ fontWeight: "bold" }}>this link</a> and enter <strong>3610057</strong> as the group ID.</>
                                    <>These rooms will be held until July 11, 2023.</> <br /><br />Click <a style={{ fontWeight: "bold" }} target="_blank" href="/resources/img/accomodations-flyer.pdf">here</a> for a flyer with more hotel options in the vicinity.
                                </>
                                }
                                Icon={<HotelIcon fontSize="large" />}
                            />
                            <FaqItem
                                question="Will phones and cameras be allowed at the ceremony for guests?"
                                answer={<>We have hired professional photographers and videographers to capture our special moment, so we have decided on an unplugged ceremony.</>}
                                Icon={<CameraAltIcon fontSize="large" />}
                            />
                        </List>

                        <Box width="100%" className="shadowed centred" style={{ backgroundColor: "white", justifyContent: "space-evenly", marginTop: "2em" }}>
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
            </ContentBox>
        </ThemeProvider >
    );
}