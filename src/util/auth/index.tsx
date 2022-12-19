import * as React from "react";
import { default as axios } from "axios";

import { useQuery } from "../misc";
import { Guest, Invite } from "../models";
// @ts-ignore
import { baseURL } from "../../../config";

export enum AuthStatus {
    LOGGED_IN, NOT_FOUND, INVALID
}

export interface Auth {
    id: string;
    invite: Invite;
    status: AuthStatus;
    setGuest: (idx: number, new_guest: Guest) => void;
}

export const AuthContext = React.createContext<Auth>({} as Auth);

export const AuthProvider = (props: { children: React.ReactNode }): JSX.Element => {
    const [id, setId] = React.useState("");
    const [invite, setInvite] = React.useState({} as Invite);
    const [status, setStatus] = React.useState(AuthStatus.NOT_FOUND);

    const query: URLSearchParams = useQuery();

    React.useEffect(() => {
        if (status === AuthStatus.LOGGED_IN) return;

        let userID: string;
        if (query.has("userID")) {
            userID = query.get("userID")!;
        }
        else if (localStorage.getItem("userID")) {
            userID = localStorage.getItem("userID")!;
        }
        if (!!userID!) {
            axios.get(`${baseURL}/api/invites/invites/${userID}`).then((res) => {
                setInvite(res.data);
                setStatus(AuthStatus.LOGGED_IN);
                setId(userID);
                localStorage.setItem("userID", userID);
            }).catch(() => {
                setStatus(AuthStatus.INVALID);
                localStorage.removeItem("userID");
            });
        }
    }, []);

    const setGuest = (idx: number, new_guest: Guest): void => {
        const guests_copy: Array<Guest> = invite.guests;
        guests_copy[idx] = new_guest;
        setInvite({
            ...invite,
            guests: guests_copy
        });
    }

    return (
        <AuthContext.Provider value={{ id: id, invite: invite, status: status, setGuest: setGuest }}>
            {props.children}
        </AuthContext.Provider>
    );
}