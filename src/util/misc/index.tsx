import { Box, createTheme, TextField, Theme } from "@mui/material";
import * as React from "react";
import { useLocation } from "react-router-dom";
import { Auth, AuthContext, AuthStatus } from "../auth";

export const useQuery = (): URLSearchParams => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const ContentBox = (props: { children: React.ReactNode }): JSX.Element => {
    return (
        <Box className="shadowed" sx={{ width: '100%', maxWidth: 750, backgroundColor: "#fffef6", padding: "2em", fontFamily: "Cormorant Garamond", boxShadow: "60px -16px teal" }}>
            {props.children}
        </Box>
    );
}

export const textTheme: Theme = createTheme({
    typography: {
        fontFamily: [
            'Cormorant Garamond',
            'serif'
        ].join(','),
    },
});

export const PasswordProtected = (props: { children: any, card?: boolean }): JSX.Element => {
    const session: Auth = React.useContext(AuthContext);

    const PasswordForm = (): JSX.Element => {
        return (
            <>
                <label htmlFor="site-pswd">Please enter the site password to view event details:</label>
                <TextField
                    id="site-pswd"
                    label="Site Password"
                    fullWidth={true}
                    onChange={(ev) => {
                        ev.preventDefault();
                        if (ev.target.value.toLowerCase() === "mawedding") {
                            session.authenticate();
                            localStorage.setItem("password", "mawedding");
                        }
                    }}
                />
            </>
        );
    }

    return (
        <>
            {
                session.authenticated || localStorage.getItem("password")?.toLowerCase() === "mawedding" || session.status == AuthStatus.LOGGED_IN ?
                    <>
                        {props.children}
                    </>
                    :
                    <>
                        {
                            props.card ?
                                <ContentBox>
                                    <PasswordForm />
                                </ContentBox>
                                :
                                <PasswordForm />
                        }
                    </>
            }
        </>
    );
}