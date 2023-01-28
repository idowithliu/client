import * as React from "react";
import { default as axios } from "axios";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert, AlertColor, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, Icon, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Modal, Select, Snackbar, Stack, TextField, ThemeProvider } from "@mui/material";
import { ContentBox, PasswordProtected, textTheme } from "../../util/misc";

import { Link } from "react-router-dom";
import { Auth, AuthContext } from "../../util/auth";
import { Routes } from "../../util/routes";

import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';

export const Emails = (): JSX.Element => {
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertType, setAlertType] = React.useState("info" as AlertColor);

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [content, setContent] = React.useState("");
    const [all, setAll] = React.useState(false);

    React.useEffect((): void => {
        document.title = "Emails | Melanie and Andrew's Wedding Website";

        setUsername(localStorage.getItem("account_username")!);
        setPassword(localStorage.getItem("account_password")!);
    }, []);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway' || reason === 'backdropClick') {
            return;
        }

        setAlertMessage("");
    };

    const alert = (message: string, type: AlertColor): void => {
        setAlertType(type);
        setAlertMessage(message);
    }

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <Icon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const onChange = React.useCallback((value: any, viewUpdate: any) => {
        setContent(value);
    }, []);

    return (
        <>
            <ThemeProvider theme={textTheme}>
                <ContentBox>
                    <form onSubmit={(ev): void => {
                        ev.preventDefault();
                        axios.post(Routes.RSVP.EMAILS, {
                            username: username,
                            password: password,
                            all_emails: all,
                            subject: subject,
                            email_content: content
                        }).then((res): void => {
                            alert(res.data.message, "success");
                        }).catch((err) => {
                            alert(err.response.data.message, "error")
                        });
                    }}>
                        <Grid
                            container
                            style={{ gap: '1.5em' }}
                            direction="column"
                        >
                            <div>
                                <label htmlFor="username" style={{ fontSize: "larger" }}>Username:</label>
                                <TextField
                                    value={username}
                                    id="username"
                                    label="Username"
                                    fullWidth={true}
                                    onChange={(ev) => {
                                        setUsername(ev.target.value);
                                        localStorage.setItem("account_username", ev.target.value);
                                    }}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" style={{ fontSize: "larger" }}>Password:</label>
                                <TextField
                                    value={password}
                                    id="password"
                                    label="Password"
                                    fullWidth={true}
                                    type="password"
                                    onChange={(ev) => {
                                        setPassword(ev.target.value);
                                        localStorage.setItem("account_password", ev.target.value);
                                    }}
                                />
                            </div>

                            <div>
                                <label htmlFor="email-subject" style={{ fontSize: "larger" }}>Enter email subject here:</label>
                                <TextField
                                    id="email-subject"
                                    label="Email subject"
                                    fullWidth={true}
                                    onChange={(ev) => setSubject(ev.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="email-content" style={{ fontSize: "larger" }}>Enter email content here in HTML:</label>
                                <CodeMirror
                                    id="email-content"
                                    value="<p>Hello, World!</p>"
                                    height="400px"
                                    extensions={[html({})]}
                                    onChange={onChange}
                                />
                            </div>

                            <FormControlLabel control={<Checkbox defaultChecked={all} onChange={(ev) => {
                                setAll(!all);
                            }} />} label="Send to all emails? (or just incomplete RSVPs)" />

                            <Button variant="contained" type="submit" style={{ width: "fit-content" }}>Send emails!</Button>

                            <Typography variant="h6">Important replacement variables:</Typography>
                            <code>
                                family_name: string<br />
                                invite_url: url(string)<br />
                                email: string<br />
                            </code>
                        </Grid>
                    </form>
                </ContentBox>
            </ThemeProvider>

            <Snackbar
                open={!!alertMessage}
                autoHideDuration={10000}
                onClose={handleClose}
                message={alertMessage}
                action={action}
            >
                <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
}