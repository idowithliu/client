import * as React from "react";
import { default as axios } from "axios";

import { useQuery } from "../misc";
import { Guest, Invite } from "../models";
import { Routes } from "../routes";

export enum AuthStatus {
    LOGGED_IN, NOT_FOUND, INVALID
}

export interface Auth {
    id: string;
    invite: Invite;
    status: AuthStatus;
    setGuest: (idx: number, new_guest: Guest) => void;
    setFocused: (id: number) => void;
    refresh: () => void;
    authenticated: boolean;
    authenticate: () => void;
}

export const AuthContext = React.createContext<Auth>({} as Auth);

export const AuthProvider = (props: { children: React.ReactNode }): JSX.Element => {
    const [id, setId] = React.useState("");
    const [invite, setInvite] = React.useState({} as Invite);
    const [status, setStatus] = React.useState(AuthStatus.NOT_FOUND);
    const [authenticated, setAuthenticated] = React.useState(false);

    const query: URLSearchParams = useQuery();

    const refresh = (): void => {
        let userID: string;
        if (query.has("userID")) {
            userID = query.get("userID")!;
        }
        else if (localStorage.getItem("userID")) {
            userID = localStorage.getItem("userID")!;
        }
        if (!!userID!) {
            axios.get(`${Routes.RSVP.INVITE}/${userID}/`).then((res) => {
                setInvite(res.data);
                setStatus(AuthStatus.LOGGED_IN);
                setId(userID);
                localStorage.setItem("userID", userID);
            }).catch(() => {
                setStatus(AuthStatus.INVALID);
                localStorage.removeItem("userID");
            });
        }
    }

    React.useEffect(() => {
        if (status === AuthStatus.LOGGED_IN) return;
        refresh();
    }, []);

    const setGuest = (idx: number, new_guest: Guest): void => {
        const guests_copy: Array<Guest> = invite.guests;
        guests_copy[idx] = new_guest;
        setInvite({
            ...invite,
            guests: guests_copy
        });
    }

    const setFocused = (id: number): void => {
        setInvite({ ...invite, focused: id });
    }

    const authenticate = (): void => {
        setAuthenticated(true);
    }

    return (
        <AuthContext.Provider value={{ id: id, invite: invite, status: status, setGuest: setGuest, setFocused: setFocused, refresh: refresh, authenticated: authenticated, authenticate: authenticate }}>
            {props.children}
        </AuthContext.Provider>
    );
}