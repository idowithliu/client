import { Grid } from "@mui/material";
import * as React from "react";

export const Home = (): JSX.Element => {
    React.useEffect(() => {
        document.title = "Home | Melanie and Andrew's Wedding Website";
    }, []);
    return (
        <>
            <div className="divider" />
            <div className="home-picture">
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}
                >
                    <img alt="Home Page Banner" width="60%" src="/resources/img/home.jpg" className="css-1ago99h"></img>
                </Grid>

            </div>
        </>
    );
}