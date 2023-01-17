import * as React from "react";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ContentBox, textTheme } from "../../util/misc";
import { Grid, ThemeProvider } from "@mui/material";

export const Story = (): JSX.Element => {
    React.useEffect(() => {
        document.title = "Our Story | Melanie and Andrew's Wedding Website";
    }, []);

    const textSpec = {
        sm: 12, md: 6
    };

    const picSpec = {
        xs: 6
    }

    return (
        <ThemeProvider theme={textTheme}>
            <ContentBox>
                <Grid container spacing={2}>
                    <Grid item {...textSpec}>
                        <Typography variant="h6">
                            To tell the love story of Melanie and Andrew,
                            there’s one thing you should know:
                            Melanie and Andrew have different versions of how they first met.
                            If you asked Melanie, she would tell you that they met during one of their many varsity
                            badminton practices at Western University. But if you asked Andrew,
                            he would tell you that they met months earlier at a fundraising event held by varsity players.
                            This may be one of the few times during their entire 7 year relationship where Melanie is willing
                            to admit that Andrew may be possibly right.
                        </Typography>
                    </Grid>
                    <Grid item {...picSpec}>
                        <img src="/resources/img/1.jpg" />
                    </Grid>

                    <Grid item {...picSpec}>
                        <img src="/resources/img/2.jpg" />
                    </Grid>
                    <Grid item {...textSpec}>
                        <Typography variant="h6">
                            Even though introductions were made and names were exchanged,
                            it wasn’t until the end of badminton season, where Melanie and Andrew were paired together for a tournament,
                            that Andrew finally captured Melanie’s attention with his badminton skills.
                            From there, Andrew proceeded to jump through multiple hoops to finally land the girl of his dreams.
                            He walked her home in the cold (her place was 45 minutes in the opposite direction),
                            he got his hands dirty making peanut butter cookies so that hers would stay clean,
                            and he stepped out of his comfort zone and serenaded her to the song “Yellow” by Coldplay,
                            which they now consider their song.
                        </Typography>
                    </Grid>
                    <Grid item {...textSpec}>
                        <Typography variant="h6">
                            Once they became official, their relationship was immediately tested, because Melanie was accepted to pharmacy school
                            at the University of Toronto, while Andrew was finishing his degree at Western University.
                            With endless phone calls and long drives for Andrew, they survived the year-long distance,
                            and the saying that “distance makes the heart grow fonder” held true. After much deliberation,
                            Andrew ended the distance and joined Melanie in the career path of selling drugs legally by furthering his studies
                            at the University of Toronto.
                        </Typography>
                    </Grid>
                    <Grid item {...picSpec}>
                        <img src="/resources/img/3.jpg" />
                    </Grid>
                </Grid>
            </ContentBox>
        </ThemeProvider>
    );
}