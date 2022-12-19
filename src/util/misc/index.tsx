import { Box } from "@mui/material";
import * as React from "react";
import { useLocation } from "react-router-dom";

export const useQuery = (): URLSearchParams => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const ContentBox = (props: { children: React.ReactNode }): JSX.Element => {
    return (
        <Box sx={{ width: '100%', maxWidth: 1000, backgroundColor: "white", padding: "2em" }}>
            {props.children}
        </Box>
    );
}