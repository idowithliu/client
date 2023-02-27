// @ts-ignore
const BASEURL = import.meta.env.DEV ? "http://localhost:8000" : "";

export const Routes = {
    BASEURL: BASEURL,
    REGISTRY: {
        CLAIM: `${BASEURL}/api/registry/claim/`,
        ITEMS: `${BASEURL}/api/registry/items/`,
        FUNDS: `${BASEURL}/api/registry/funds/`,
        CONTRIBUTE: `${BASEURL}/api/registry/contribute/`,
        GET_AMOUNT: `${BASEURL}/api/registry/contribution-amount/`
    },
    RSVP: {
        SUBMIT: `${BASEURL}/api/invites/rsvp/`,
        INVITE: `${BASEURL}/api/invites/invites`,
        EMAILS: `${BASEURL}/api/invites/send-emails/`,
        TEST_EMAIL: `${BASEURL}/api/invites/test-email/`
    }
}
