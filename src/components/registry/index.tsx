import * as React from "react";
import { default as axios } from "axios";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert, AlertColor, Button, Divider, FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Modal, Select, Snackbar, Stack, TextField, ThemeProvider } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import GradingIcon from '@mui/icons-material/Grading';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DoneIcon from '@mui/icons-material/Done';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { Guest, Registry, RegistryItem } from "../../util/models";
import { ContentBox, PasswordProtected, textTheme } from "../../util/misc";

import { Link } from "react-router-dom";
import { Auth, AuthContext } from "../../util/auth";
import { Routes } from "../../util/routes";

export const RegistryPage = (): JSX.Element => {

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

    const RegistryItemElement = (props: { item: RegistryItem, index: number }): JSX.Element => {
        let claimer: Guest | null = null;
        if (session.invite.guests) {
            for (let guest of session.invite.guests) {
                if (guest.id === props.item.claimer_id) {
                    claimer = guest; break;
                }
            }
        }
        return (
            <ListItem disablePadding>
                <ListItemButton onClick={(): void => {
                    if (!!props.item.claimer_id || !session.invite.finished) return;
                    setClaiming(props.item.id);
                    setClaimingItem(props.item);
                    setClaimerID(0);
                }}>
                    <ListItemText primary={<Typography variant="h6">{`${props.index}. ${props.item.name}`}</Typography>} />
                    {claimer && <Typography variant="body1">Claimed by: {claimer.name}</Typography>}
                    <ListItemIcon>
                        {!props.item.claimer_id ? <CheckBoxOutlineBlankIcon /> : (!claimer ? <DoneIcon /> : <CheckBoxIcon />)}
                    </ListItemIcon>
                </ListItemButton>
            </ListItem>
        );
    }

    const RegistryElement = (props: { registry: Registry, index: number }): JSX.Element => {
        return (
            <>
                <nav aria-label="main mailbox folders">
                    <List>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <GradingIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="h5">{props.registry.name}</Typography>} />
                            <Typography align="right" variant="body1" paddingRight={"1.5rem"}>Claimed</Typography>
                        </ListItem>
                    </List>
                </nav>
                <Divider />
                <nav aria-label="secondary mailbox folders">
                    <List>
                        {props.registry.registry_items.map((item: RegistryItem, index: number): JSX.Element => {
                            return <RegistryItemElement key={index} item={item} index={index + 1} />
                        })}
                    </List>
                </nav>
            </>
        );
    };

    const submitClaimForm = (): void => {
        if (claimerID === 0) {
            setAlertType("error");
            setAlertMessage("Please select a claimer name from the dropdown");
            return;
        }
        axios.post(Routes.REGISTRY.CLAIM, {
            "id": claimingItem.id,
            "claimer_id": claimerID,
            "uuid": session.invite.uuid,
        }).then((res) => {
            setAlertType("success");
            setAlertMessage(res.data.message);
            refreshRegistries();
            setClaiming(-1);
        }).catch((err) => {
            setAlertType("error");
            setAlertMessage(err.response.data.message);
            refreshRegistries();
            setClaiming(-1);
        });
    }

    const [registries, setRegistries] = React.useState([] as Array<Registry>);
    const [claiming, setClaiming] = React.useState(-1);
    const [claimingItem, setClaimingItem] = React.useState({} as RegistryItem);
    const [claimerID, setClaimerID] = React.useState(0);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertType, setAlertType] = React.useState("info" as AlertColor);
    const session: Auth = React.useContext(AuthContext);

    const refreshRegistries = (): void => {
        axios.get(Routes.REGISTRY.ITEMS, {}).then((res) => {
            setRegistries(res.data as Array<Registry>);
        }).catch((err) => {
            console.error("Error occurred while fetching registry:", err);
        });
    }

    const getGuests = (): Array<JSX.Element> => {
        let res = session.invite.guests.map((guest: Guest): JSX.Element => {
            return <MenuItem key={guest.id} value={guest.id}>{guest.name}</MenuItem>;
        });
        //res.push(<MenuItem key={0} value={0}>{"[Unselected]"}</MenuItem>);
        return res;
    }

    React.useEffect((): void => {
        document.title = "Registry | Melanie and Andrew's Wedding Website";
        refreshRegistries();
    }, []);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway' || reason === 'backdropClick') {
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
                <PasswordProtected card>
                    {!session.invite.finished && <Alert severity="info" style={{ margin: "1em" }}><Link to="/rsvp" style={{ fontSize: "larger" }}>Please RSVP before claiming any registry items. (Click here for the RSVP page)</Link></Alert>}
                    {alertMessage && <Alert severity={alertType as AlertColor} style={{ margin: "1.5em" }}>{alertMessage}</Alert>}
                    <Typography variant="h4" gutterBottom>
                        Our Wish List
                    </Typography>
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {registries.length > 0 ? registries.map((registry: Registry, index: number): JSX.Element => {
                            return <RegistryElement registry={registry} index={index} key={index} />
                        }) :
                            <nav aria-label="main mailbox folders">
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemIcon>
                                            <GradingIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={<Typography variant="h6">Registry coming soon!</Typography>} />
                                    </ListItem>
                                </List>
                            </nav>}
                    </Box>
                </PasswordProtected>
            </ThemeProvider>
            <Modal
                open={claiming >= 0}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Claim {claimingItem.name}?
                    </Typography>
                    <br />
                    <Typography variant="subtitle1">Link to Purchasing Site: <a target="_blank" href={claimingItem.url}>{claimingItem.url}</a></Typography>
                    <Divider /><hr /><br />
                    <Typography variant="body1">
                        <label htmlFor="claimer-name">To claim this registry item, please select your name below:</label>
                    </Typography>
                    <hr />
                    <form onSubmit={(ev) => {
                        ev.preventDefault();
                        submitClaimForm();
                    }}>
                        <FormControl required fullWidth>
                            <InputLabel id="claimer-name-label">Claimer Name</InputLabel>
                            <Select
                                id="claimer-name"
                                value={claimerID}
                                label="Claimer Name"
                                onChange={(ev) => {
                                    setClaimerID(parseInt(ev.target.value.toString()));
                                }}
                            >
                                {
                                    "guests" in session.invite &&
                                    getGuests()
                                }
                            </Select>
                        </FormControl>
                        <div className="form-row" style={{ marginTop: "1em" }}>
                            <Button variant="contained" type="submit" disableElevation>Claim!</Button>
                            <Button variant="outlined" onClick={(ev) => {
                                ev.preventDefault();
                                setClaiming(-1);
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
            >
                <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
}