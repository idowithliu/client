import * as React from "react";
import { default as axios } from "axios";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ContentBox, useQuery, textTheme } from "../../util/misc";

import { Guest, Invite } from "../../util/models";
import { Auth, AuthContext, AuthStatus } from "../../util/auth";
import { Alert, AlertColor, Button, Checkbox, Divider, FormControlLabel, FormGroup, TextField, ThemeProvider } from "@mui/material";
import { Routes } from "../../util/routes";

export const Rsvp = (): JSX.Element => {
    const query: URLSearchParams = useQuery();
    const userID: string | null = query.get("userID");

    const session: Auth = React.useContext(AuthContext);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertType, setAlertType] = React.useState("" as AlertColor);
    const [clearing, setClearing] = React.useState(false);

    React.useEffect(() => {
        document.title = "RSVP | Melanie and Andrew's Wedding Website";
    }, []);

    const GuestInfo = (props: { guest: Guest, index: number }): JSX.Element => {
        const guest = props.guest;
        return (
            <>
                <Typography variant="h5">
                    Guest name: <strong>{guest.name}</strong>
                </Typography>
                <div className="form-row">
                    <FormGroup style={{ width: "100%" }}>
                        <FormControlLabel control={<Checkbox defaultChecked={guest.is_attending} onChange={(ev) => {
                            const new_guest = { ...guest, is_attending: ev.target.checked };
                            session.setGuest(props.index, new_guest);
                        }} />} label="Will be attending" />
                        {
                            guest.is_attending &&
                            <TextField
                                id="outlined-disabled"
                                label="Dietary Restrictions (optional)"
                                defaultValue={guest.dietary_restrictions}
                                fullWidth={true}
                                autoFocus={guest.id === session.invite.focused}
                                onChange={(ev) => {
                                    const new_guest: Guest = { ...guest, dietary_restrictions: ev.target.value };
                                    session.setGuest(props.index, new_guest);
                                    session.setFocused(guest.id);
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
                            Currently performing RSVP for the <strong>{session.invite.family_name}</strong> family.
                            <br />
                            <small>To switch to a different invite, please use the unique link provided to you in your wedding invitation.</small>
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
                        <Button variant="contained" onClick={(ev) => {
                            ev.preventDefault();

                            for (let i = 0; i < session.invite.guests.length; i++) {
                                const guest: Guest = session.invite.guests[i];
                                if (guest.is_attending === null) {
                                    session.setGuest(i, { ...guest, is_attending: false });
                                }
                            }

                            axios.post(Routes.RSVP.SUBMIT, session.invite).then((res) => {
                                setAlertType("success");
                                setAlertMessage(res.data.message);
                                session.refresh();
                            }).catch((err) => {
                                setAlertType("error");
                                setAlertMessage(err.response.data.message);
                            });

                            if (!clearing) {
                                setClearing(true);
                                setTimeout((): void => {
                                    setAlertMessage("");
                                    setClearing(false);
                                }, 8000);
                            }
                        }}>Submit RSVP!</Button>
                        {alertMessage && <Alert severity={alertType as AlertColor} style={{ marginBottom: "1.5em" }}>{alertMessage}</Alert>}
                    </>
                );
        }
    }

    return (
        <ThemeProvider theme={textTheme}>
            {alertMessage && <Alert severity={alertType as AlertColor} style={{ marginBottom: "1.5em" }}>{alertMessage}</Alert>}
            <ContentBox>
                <Typography variant="h3" gutterBottom>
                    Welcome to the RSVP page!
                </Typography>
                <RsvpPage />
            </ContentBox>
        </ThemeProvider>
    );
}