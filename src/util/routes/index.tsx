// @ts-ignore
const BASEURL = import.meta.env.DEV ? "http://localhost:8000" : "";

export const Routes = {
    BASEURL: BASEURL,
    REGISTRY: {
        CLAIM: `${BASEURL}/api/registry/claim/`,
        ITEMS: `${BASEURL}/api/registry/items/`
    },
    RSVP: {
        SUBMIT: `${BASEURL}/api/invites/rsvp/`,
        INVITE: `${BASEURL}/api/invites/invites`
    }
}
