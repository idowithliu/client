import * as React from "react";
import { default as axios } from "axios";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ContentBox, useQuery, textTheme, anchorOrigin } from "../../util/misc";

import { Guest, Invite } from "../../util/models";
import { Auth, AuthContext, AuthStatus } from "../../util/auth";
import { Alert, AlertColor, Button, Checkbox, Divider, FormControlLabel, FormGroup, IconButton, Snackbar, TextField, ThemeProvider } from "@mui/material";
import { Routes } from "../../util/routes";

import CloseIcon from '@mui/icons-material/Close';

export const Rsvp = (): JSX.Element => {
    const query: URLSearchParams = useQuery();
    const userID: string | null = query.get("userID");

    const session: Auth = React.useContext(AuthContext);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertType, setAlertType] = React.useState("info" as AlertColor);

    const alert = (message: string, type: AlertColor): void => {
        setAlertType(type);
        setAlertMessage(message);
    }

    React.useEffect(() => {
        document.title = "RSVP | Melanie and Andrew's Wedding Website";
    }, []);

    const updateGuest = (idx: number, new_guest: Guest): void => {
        session.invite.guests[idx] = new_guest;
    }

    const GuestInfo = (props: { guest: Guest, index: number }): JSX.Element => {
        const guest = props.guest;
        return (
            <>
                <Typography variant="h5">
                    Guest name: <strong>{guest.name}</strong>
                </Typography>
                <div className="form-row">
                    <FormGroup style={{ width: "100%" }}>
                        <div className="form-row">
                            <FormControlLabel control={<Checkbox defaultChecked={!(guest.is_attending === null) && guest.is_attending} onChange={(ev) => {
                                const new_guest = { ...guest, is_attending: true };
                                session.setGuest(props.index, new_guest);
                            }} />} label="Will be attending" />
                            <FormControlLabel control={<Checkbox defaultChecked={!(guest.is_attending === null) && !guest.is_attending} onChange={(ev) => {
                                const new_guest = { ...guest, is_attending: false };
                                session.setGuest(props.index, new_guest);
                            }} />} label={<>Will <strong>not</strong> be attending</>} />
                        </div>
                        {
                            guest.is_attending &&
                            <TextField
                                id="outlined-disabled"
                                label="Dietary Restrictions (optional)"
                                defaultValue={guest.dietary_restrictions}
                                fullWidth={true}
                                // autoFocus={guest.id === session.invite.focused}
                                onChange={(ev) => {
                                    const new_guest: Guest = { ...guest, dietary_restrictions: ev.target.value };
                                    updateGuest(props.index, new_guest);
                                    // session.setFocused(guest.id);
                                }}
                            />
                        }
                    </FormGroup>
                </div>
                <br />
            </>
        )
    }

    const RsvpPage = (): JSX.Element => {
        switch (session.status) {
            case AuthStatus.NOT_FOUND:
                return (
                    <Typography variant="h6" gutterBottom>
                        Please use the unique link provided in your wedding invitation to access your RSVP page.
                    </Typography>
                )
            case AuthStatus.INVALID:
                return (<Typography variant="h6" gutterBottom>
                    Sorry, we couldn't find an invitation with this link. Please double check the link or contact us for a new one.
                </Typography>);
            case AuthStatus.LOGGED_IN:
                return (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Currently performing RSVP for <strong>{session.invite.family_name}</strong>.
                        </Typography>
                        <Divider />
                        <div style={{ marginTop: "1em" }} />
                        {
                            session.invite.guests.map((guest: Guest, idx: number): JSX.Element => {
                                return (
                                    <GuestInfo key={idx} guest={guest} index={idx} />
                                );
                            })
                        }

                        <div className="form-row">
                            <Button variant="contained" onClick={(ev) => {
                                ev.preventDefault();
                                alert("", "info");

                                for (let i = 0; i < session.invite.guests.length; i++) {
                                    const guest: Guest = session.invite.guests[i];
                                    if (guest.is_attending === null) {
                                        // updateGuest(i, { ...guest, is_attending: false });
                                        alert(`Please choose an option for guest ${guest.name}`, "error");
                                        return;
                                    }
                                }

                                axios.post(Routes.RSVP.SUBMIT, session.invite).then((res) => {
                                    alert(res.data.message, "success");
                                    session.refresh();
                                }).catch((err) => {
                                    setAlertMessage("Something went wrong on our end! Please contact an administrator to get it fixed.");
                                    setAlertType("error");
                                    setAlertMessage(err.response.data.message);
                                });
                            }}>Submit RSVP!</Button>
                            {alertMessage && <Alert severity={alertType as AlertColor} >{alertMessage}</Alert>}
                        </div>
                    </>
                );
        }
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertMessage("");
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <>
            <ThemeProvider theme={textTheme}>
                <ContentBox>
                    <Typography variant="h3" gutterBottom>
                        Welcome to the RSVP page!
                    </Typography>
                    <RsvpPage />
                </ContentBox>
                <div style={{ height: "4em" }} />
            </ThemeProvider>
            <Snackbar
                open={!!alertMessage}
                autoHideDuration={10000}
                onClose={handleClose}
                message={alertMessage}
                action={action}
                anchorOrigin={anchorOrigin}
            >
                <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
}