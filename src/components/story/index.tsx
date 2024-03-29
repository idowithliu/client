import * as React from "react";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ContentBox, PasswordProtected, textTheme } from "../../util/misc";
import { Grid, ThemeProvider } from "@mui/material";
import { Footer } from "../app/footer";

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

    const TextBox = (props: { children: string }): JSX.Element => {
        return (<Grid item {...textSpec}>
            <div className="centred">
                <Typography variant="h6" style={{ textAlign: "justify" }}>
                    {props.children}
                </Typography>
            </div>
        </Grid>);
    }

    return (
        <>
            <ThemeProvider theme={textTheme}>
                <ContentBox>
                    <PasswordProtected>
                        <Grid container spacing={2}>
                            <TextBox>
                                To tell the love story of Melanie and Andrew,
                                there's one thing you should know:
                                Melanie and Andrew have different versions of how they first met.
                                If you asked Melanie, she would tell you that they met during one of their many varsity
                                badminton practices at Western University. But if you asked Andrew,
                                he would tell you that they met months earlier at a fundraising event held by varsity players.
                                This may be one of the few times during their entire 7 year relationship where Melanie is willing
                                to admit that Andrew may be possibly right.
                            </TextBox>
                            <Grid item {...picSpec}>
                                <img src="/resources/img/1.jpg" className="shadowed" />
                            </Grid>

                            <Grid item {...picSpec}>
                                <img src="/resources/img/3.jpg" className="shadowed" />
                            </Grid>
                            <Grid item {...textSpec}>
                                <div className="centred">
                                    <Typography variant="h6" style={{ textAlign: "justify" }}>
                                        Even though introductions were made and names were exchanged,
                                        it wasn't until the end of badminton season, where Melanie and Andrew were paired together for a tournament,
                                        that Andrew finally captured Melanie's attention with his badminton skills.
                                        From there, Andrew proceeded to jump through multiple hoops to finally land the girl of his dreams.
                                        He walked her home in the cold (her place was 45 minutes in the opposite direction),
                                        he got his hands dirty making peanut butter cookies so that hers would stay clean,
                                        and he stepped out of his comfort zone and serenaded her to the song “Yellow” by Coldplay,
                                        which they now consider their song.
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item {...textSpec}>
                                <div className="centred">
                                    <Typography variant="h6" style={{ textAlign: "justify" }}>
                                        After becoming official, their relationship was immediately tested, because Melanie was accepted to pharmacy school
                                        at the University of Toronto, while Andrew was finishing his degree at Western University.
                                        Between phone calls and long drives, they survived the year-long distance,
                                        and the saying that “distance makes the heart grow fonder” held true.

                                        On their six-year anniversary, Andrew decided to put a ring on it. He bought her favourite cake from Butter Baker, a dozen red roses, and a ring, and proposed on a hike by the Niagara Falls. The rest of the story is still unwritten.
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item {...picSpec}>
                                <img src="/resources/img/4.jpg" className="shadowed" />
                            </Grid>
                        </Grid>
                    </PasswordProtected>
                </ContentBox>
            </ThemeProvider>
            <Footer />
        </>
    );
}