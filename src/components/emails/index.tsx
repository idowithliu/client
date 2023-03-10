import * as React from "react";
import { default as axios } from "axios";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert, AlertColor, Button, Checkbox, CircularProgress, Divider, FormControl, FormControlLabel, Grid, Icon, IconButton, InputLabel, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Modal, Paper, Select, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider } from "@mui/material";
import { anchorOrigin, ContentBox, PasswordProtected, textTheme } from "../../util/misc";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { Link } from "react-router-dom";
import { Auth, AuthContext } from "../../util/auth";
import { Routes } from "../../util/routes";

import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { Invite, Recipient } from "../../util/models";
import { Footer } from "../app/footer";

export const Emails = (): JSX.Element => {
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertType, setAlertType] = React.useState("info" as AlertColor);

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [content, setContent] = React.useState("");
    const [all, setAll] = React.useState(false);

    const [inviteList, setInviteList] = React.useState([] as Array<Invite>);
    const [confirming, setConfirming] = React.useState(false);
    const [sending, setSending] = React.useState(false);

    // Dry Run (Fetch recipients)
    const [recipients, setRecipients] = React.useState([] as Array<Recipient>);
    const [dryRunMessage, setDryRunMessage] = React.useState("");
    const [rowSelection, setRowSelection] = React.useState([] as Array<number>);

    React.useEffect((): void => {
        document.title = "Emails | Melanie and Andrew's Wedding Website";

        setUsername(localStorage.getItem("account_username")!);
        setPassword(localStorage.getItem("account_password")!);
    }, []);

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

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

    const columns: Array<GridColDef> = [
        { field: 'id', headerName: "ID", width: 20 },
        { field: 'family_name', headerName: 'Family Name', width: 200 },
        { field: 'address', headerName: 'Email Address', width: 300 }
    ];

    // const rows = [
    //     { id: 1, family_name: "hello", address: "world" }
    // ];

    // const columns: GridColDef[] = [
    //     { field: 'firstName', headerName: 'First name', width: 130 },
    //     { field: 'lastName', headerName: 'Last name', width: 130 },
    //     {
    //         field: 'age',
    //         headerName: 'Age',
    //         type: 'number',
    //         width: 90,
    //     }
    // ];

    return (
        <>
            {/* <ThemeProvider theme={textTheme}> */}
            <ContentBox>
                <form onSubmit={(ev): void => {
                    ev.preventDefault();
                    setConfirming(true);
                }}>
                    <Grid
                        container
                        style={{ gap: '1.5em' }}
                        direction="column"
                    >
                        <div>
                            {/* <label htmlFor="username" style={{ fontSize: "larger" }}>Username:</label> */}
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
                            {/* <label htmlFor="password" style={{ fontSize: "larger" }}>Password:</label> */}
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
                            {/* <label htmlFor="email-subject" style={{ fontSize: "larger" }}>Enter email subject here:</label> */}
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
                                height="400px"
                                extensions={[html({})]}
                                onChange={onChange}
                            />
                        </div>

                        <FormControlLabel control={<Checkbox defaultChecked={all} onChange={(ev) => {
                            setAll(!all);
                        }} />} label="Send to all emails? (or just incomplete RSVPs)" />

                        <div className="form-row">
                            <Button variant="contained" type="submit" style={{ width: "fit-content" }}>Send emails!</Button>
                            <Button variant="outlined" style={{ width: "fit-content" }} onClick={(ev) => {
                                ev.preventDefault();
                                axios.post(Routes.RSVP.DRY_RUN, {
                                    username: username,
                                    password: password,
                                    all_emails: all
                                }).then((res): void => {
                                    setRecipients(res.data.emails);
                                    setDryRunMessage(res.data.message);
                                    alert(res.data.message, "success");
                                }).catch((err) => {
                                    alert("Something went wrong on our end! Please contact an administrator to get it fixed.", "error");
                                    alert(err.response.data.message, "error");
                                });
                            }}>Fetch Recipient Emails</Button>
                            <Button variant="outlined" style={{ width: "fit-content" }} onClick={(ev) => {
                                ev.preventDefault();
                                axios.post(Routes.RSVP.TEST_EMAIL, {
                                    username: username,
                                    password: password,
                                    all_emails: all,
                                    subject: subject,
                                    email_content: content
                                }).then((res): void => {
                                    alert(res.data.message, "success");
                                    setConfirming(false);
                                }).catch((err) => {
                                    alert("Something went wrong on our end! Please contact an administrator to get it fixed.", "error");
                                    alert(err.response.data.message, "error");
                                    setConfirming(false);
                                });
                            }}>Send test email</Button>
                        </div>

                        {/* {dryRunMessage && <div>
                            <Typography variant="h6">Recipients {dryRunMessage && <>({dryRunMessage})</>}:</Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: "larger" }}><strong>Family Name</strong></TableCell>
                                            <TableCell sx={{ fontSize: "larger" }} align="left"><strong>Email Address</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recipients.map((recipient: Recipient, idx: number) => (
                                            <TableRow
                                                key={idx}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" sx={{ fontSize: "larger" }}>
                                                    {recipient.family_name}
                                                </TableCell>
                                                <TableCell align="left" sx={{ fontSize: "larger" }}>{recipient.address}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>} */}
                        <div style={{ height: "1000px", width: '100%' }}>
                            <DataGrid
                                rows={recipients}
                                columns={columns}
                                //pageSize={5}
                                //rowsPerPageOptions={[5]}
                                checkboxSelection
                                // onRowClick={(rowData, rowState) => {
                                //     console.log(rowData, rowState);
                                // }}
                                onStateChange={(state, event, details) => setRowSelection(state.rowSelection)}
                            />
                        </div>
                        <div className="form-row">
                            <Button variant="outlined" style={{ width: "fit-content" }} onClick={(ev) => {
                                ev.preventDefault();
                                if (confirm("Are you sure you would like to send the selected emails?")) {
                                    setSending(true);
                                    axios.post(Routes.RSVP.SEND_SPECIFIC, {
                                        username: username,
                                        password: password,
                                        rowSelection: rowSelection,
                                        subject: subject,
                                        email_content: content
                                    }).then((res): void => {
                                        setConfirming(false);
                                        setSending(false);
                                        alert(res.data.message, "success");

                                    }).catch((err) => {
                                        setSending(false);
                                        alert("Something went wrong on our end! Please contact an administrator to get it fixed.", "error");
                                        alert(err.response.data.message, "error");
                                        setConfirming(false);
                                    });
                                }
                            }}>Send to Selected Emails</Button>
                            {sending && <LinearProgress sx={{ width: "100%" }} />}
                        </div>
                        <Divider />
                        <div>
                            <Typography variant="h6">Important replacement variables:</Typography>
                            <code>
                                family_name: string<br />
                                invite_url: url(string)<br />
                            </code>
                        </div>
                    </Grid>
                </form>
            </ContentBox>
            <Footer />
            {/* </ThemeProvider> */}

            <Modal
                open={confirming}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure you would like to send the invitation emails?
                    </Typography>
                    <div style={{ height: "30px" }} />
                    <form onSubmit={(ev) => {
                        ev.preventDefault();
                        axios.post(Routes.RSVP.EMAILS, {
                            username: username,
                            password: password,
                            all_emails: all,
                            subject: subject,
                            email_content: content
                        }).then((res): void => {
                            alert(res.data.message, "success");
                            setConfirming(false);
                        }).catch((err) => {
                            alert("Something went wrong on our end! Please contact an administrator to get it fixed.", "error");
                            alert(err.response.data.message, "error");
                            setConfirming(false);
                        });
                    }}>
                        <div className="form-row" style={{ gap: "10px" }}>
                            <Button variant="contained" type="submit" disableElevation>Send!</Button>
                            <Button variant="outlined" onClick={(ev) => {
                                ev.preventDefault();
                                alert("Email sending canceled", "info")
                                setConfirming(false);
                            }}>Cancel</Button>
                        </div>
                    </form>
                </Box>
            </Modal>

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