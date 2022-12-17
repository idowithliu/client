import * as React from "react";
import { default as axios } from "axios";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert, AlertColor, Button, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Stack, TextField } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import GradingIcon from '@mui/icons-material/Grading';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveIcon from '@mui/icons-material/Save';
import { Registry, RegistryItem } from "../../util/models";

// @ts-ignore
import { baseURL } from "../../../config";

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
        return (
            <ListItem disablePadding>
                <ListItemButton onClick={(): void => {
                    if (!!props.item.claimer) return;
                    setClaiming(props.item.id);
                    setClaimingItem(props.item);
                    setClaimerName("");
                }}>
                    <ListItemText primary={`${props.index}. ${props.item.name}`} />
                    <ListItemIcon>
                        {!props.item.claimer ? <CheckBoxOutlineBlankIcon /> : <CheckBoxIcon />}
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
                            <ListItemText primary={props.registry.name} />
                            <Typography align="right" variant="subtitle2" paddingRight={"1.5rem"}>Claimed</Typography>
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

    const handleClose = (): void => {
        setClaiming(-1);
        setTimeout((): void => {
            setAlertMessage("");
        }, 10000);
    }

    const submitClaimForm = (): void => {
        axios.post(`${baseURL}/api/registry/claim/`, {
            "id": claimingItem.id,
            "claimer": claimerName,
        }).then((res) => {
            setAlertType("success");
            setAlertMessage(res.data.message);
            refreshRegistries();
            handleClose();
        }).catch((err) => {
            setAlertType("error");
            setAlertMessage(err.response.data.message);
            refreshRegistries();
            handleClose();
        });
    }

    const [registries, setRegistries] = React.useState([] as Array<Registry>);
    const [claiming, setClaiming] = React.useState(-1);
    const [claimingItem, setClaimingItem] = React.useState({} as RegistryItem);
    const [claimerName, setClaimerName] = React.useState("");
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertType, setAlertType] = React.useState("");

    const refreshRegistries = (): void => {
        axios.get(`${baseURL}/api/registry/items/`, {}).then((res) => {
            setRegistries(res.data as Array<Registry>);
        }).catch((err) => {
            console.error("Error occurred while fetching registry:", err);
        });
    }

    React.useEffect((): void => {
        refreshRegistries();
    }, []);

    return (
        <>
            {alertMessage && <Alert severity={alertType as AlertColor} style={{ marginBottom: "1.5em" }}>{alertMessage}</Alert>}
            <Typography variant="h4" style={{ fontFamily: "Tenor Sans" }} gutterBottom>
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
                                <ListItemText primary={"Registry coming soon!"} />
                            </ListItem>
                        </List>
                    </nav>}
            </Box>

            <Modal
                open={claiming >= 0}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Claim {claimingItem.name}?
                    </Typography>
                    <Typography variant="body1">
                        <label htmlFor="claimer-name">To claim this registry item, please enter your name below:</label>
                    </Typography>
                    <hr />
                    <form onSubmit={(ev) => {
                        ev.preventDefault();
                        submitClaimForm();
                    }}>
                        <TextField required id="claimer-name" label="Name" variant="outlined" onChange={(ev) => {
                            setClaimerName(ev.target.value);
                        }} />
                        <div className="form-row">
                            <Button variant="contained" type="submit" disableElevation>Claim!</Button>
                            <Button variant="outlined" onClick={(ev) => {
                                ev.preventDefault();
                                handleClose();
                            }}>Cancel</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
}