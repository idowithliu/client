import * as React from "react";
import { default as axios } from "axios";

import { AlertColor, Box, Button, Card, CardActionArea, CardActions, CardContent, CircularProgress, Divider, FormControl, InputLabel, List, ListItem, ListItemIcon, ListItemText, Modal, TextField, ThemeProvider, Typography } from "@mui/material";
import { Fund } from "../../util/models";
import { Routes } from "../../util/routes";

import CardMedia from '@mui/material/CardMedia';
import GradingIcon from '@mui/icons-material/Grading';
import { Auth, AuthContext } from "../../util/auth";
import { textTheme } from "../../util/misc";


export const Funds = (props: { setAlertType: (type: AlertColor) => void, setAlertMessage: (message: string) => void }): JSX.Element => {
    const [funds, setFunds] = React.useState([] as Array<Fund>);

    const [claiming, setClaiming] = React.useState(-1);
    const [claimingItem, setClaimingItem] = React.useState({} as Fund);
    const [claimerID, setClaimerID] = React.useState(0);
    const [amount, setAmount] = React.useState(0);

    const [modalError, setModalError] = React.useState("");

    const session: Auth = React.useContext(AuthContext);

    React.useEffect(() => {
        refreshFunds();
    }, []);

    const refreshFunds = (): void => {
        axios.get(Routes.REGISTRY.FUNDS, {}).then((res) => {
            setFunds(res.data as Array<Fund>);
        }).catch((err) => {
            alert("Something went wrong on our end! Please contact an administrator to get it fixed.", "error");
        });
    }

    const alert = (message: string, type: AlertColor): void => {
        props.setAlertMessage(message);
        props.setAlertType(type);
    }

    const FundElement = (props: { fund: Fund, index: number }): JSX.Element => {
        const fund = props.fund;
        const [status, setStatus] = React.useState(-1);

        React.useEffect((): void => {
            axios.post(Routes.REGISTRY.GET_AMOUNT, {
                uuid: localStorage.getItem("userID"),
                id: fund.id
            }).then((res) => {
                setStatus(res.data.amount);
            }).catch((err) => {
            });
        }, []);

        return (
            <>
                <Card sx={{ width: "100%", paddingBottom: "2em", border: "none" }}>
                    <CardActionArea onClick={() => {
                        if (!session.invite.finished) return;
                        if (status !== 0) {
                            alert("You have already gifted to this fund!", "info");
                            return;
                        }
                        setModalError("");
                        setClaiming(fund.id);
                        setClaimingItem(fund);
                    }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={fund.background_photo}
                            title={status === 0 ? "Click to Gift!" : ""}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {fund.name} Fund
                            </Typography>
                            <div className="form-row">
                                <Typography variant="h5">
                                    Amount raised: ${fund.total_amount_raised}<br />Goal: ${fund.goal}
                                </Typography>
                                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                    <CircularProgress variant="determinate" value={Math.min(1, fund.total_amount_raised / fund.goal) * 100}></CircularProgress>
                                    <Box
                                        sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            component="div"
                                        >{`${Math.round(fund.total_amount_raised / fund.goal * 100)}%`}</Typography>
                                    </Box>
                                </Box>
                            </div>
                            <Typography variant="h6" color="text.secondary">
                                {
                                    claiming < 0 && (
                                        status === 0 ?
                                            <>Click to Gift!</>
                                            :
                                            status === -1 ?
                                                <>Please RSVP to gift!</>
                                                :
                                                <>You gifted ${status}!</>
                                    )
                                }
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </>
        );
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway' || reason === 'backdropClick') {
            return;
        }

        props.setAlertMessage("");
    };

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

    const submitClaimForm = (): void => {
        if (amount <= 0) {
            setModalError("Please enter a positive contribution amount");
            return;
        }
        axios.post(Routes.REGISTRY.CONTRIBUTE, {
            "id": claimingItem.id,
            "uuid": session.invite.uuid,
            "amount": amount
        }).then((res) => {
            alert(res.data.message, "success");
            refreshFunds();
            setClaiming(-1);
            setAmount(0);
        }).catch((err) => {
            props.setAlertMessage("Something went wrong on our end! Please contact an administrator to get it fixed.");
            alert(err.response.data.message, "error");
            setModalError(err.response.data.message);
        });
    }

    return (
        <>
            <ThemeProvider theme={textTheme}>
                <Typography variant="h4" gutterBottom>
                    Funds
                </Typography>
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} className="shadowed">
                    {funds.length > 0 ? funds.map((fund: Fund, index: number): JSX.Element => {
                        return <FundElement fund={fund} index={index} key={index} />
                    }) :
                        <nav aria-label="main mailbox folders">
                            <List>
                                <ListItem disablePadding>
                                    <ListItemIcon>
                                        <GradingIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={<Typography variant="h6">Funds coming soon!</Typography>} />
                                </ListItem>
                            </List>
                        </nav>}
                </Box>
            </ThemeProvider>
            <Modal
                open={claiming >= 0}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Gift to {claimingItem.name} Fund?
                    </Typography>
                    <br />
                    <Typography variant="body1">
                        <label htmlFor="claimer-name">Please e-transfer your gift to either <strong>andrewlpl@hotmail.com</strong> (Andrew's email) or <strong>mel23mel@hotmail.com</strong> (Melanie's email) then <strong>enter the amount you gifted below</strong>:</label>
                    </Typography>
                    <hr />
                    <form onSubmit={(ev) => {
                        ev.preventDefault();
                        submitClaimForm();
                    }}>
                        <FormControl fullWidth>
                            <InputLabel id="amount-label"></InputLabel>
                            <TextField
                                label="Gift Amount ($)"
                                type="number"
                                error={!!modalError}
                                helperText={modalError}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(ev) => {
                                    setAmount(parseInt(ev.target.value));
                                }}
                            />
                        </FormControl>
                        <div className="form-row" style={{ marginTop: "1em" }}>
                            <Button variant="contained" type="submit" disableElevation>Gift!</Button>
                            <Button variant="outlined" onClick={(ev) => {
                                ev.preventDefault();
                                setClaiming(-1);
                            }}>Cancel</Button>
                        </div>
                    </form>
                    <Typography variant="body1" marginTop="0.5em">
                        Thanks for your generous gift!
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}