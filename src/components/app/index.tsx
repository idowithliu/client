import * as React from "react";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { AuthProvider } from "../../util/auth";
import { Emails } from "../emails";
import { Faq } from "../faq";
import { Home } from "../home";
import { NotFound } from "../notfound";
import { RegistryPage } from "../registry";
import { Rsvp } from "../rsvp";
import { Schedule } from "../schedule";
import { Story } from "../story";
import { Footer } from "./footer";
import { NavBar } from "./nav";


export const _App = (): JSX.Element => {
    return (
        <>
            <div className="page">
                <picture className="banner">
                    {/* <img loading="eager" style={{ width: "100%" }} src="https://media-api.xogrp.com/images/4e6d4b00-022a-44af-aa38-577ff43cd1de~rt_auto-rs_1024.h?ordering=explicit" className="css-1ago99h" /> */}
                </picture>

                <div className="box-center">
                    <Link to="/">
                        <div className="headline-row">
                            <div className="headline">Melanie</div> <div className="headline-amp headline">&</div> <div className="headline">Andrew</div>
                        </div>
                    </Link>
                    <div className="date">are getting married on the ninth of September 2023</div>
                </div>


                <NavBar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/rsvp" element={<Rsvp />} />
                    <Route path="/about" element={<Story />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/registry" element={<RegistryPage />} />

                    <Route path="/emails" element={<Emails />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>




                {/* <iframe src="https://free.timeanddate.com/countdown/i8pa6mjd/n250/cf105/cm0/cu4/ct0/cs0/ca0/cr0/ss0/cac000/cpc000/pcfffef6/tcf1d8e7/fs100/szw320/szh135/tac000/tptTime%20since%20Event%20started%20in/tpc000/matMelanie%20and%20Andrew's%20Wedding/mac000/mpc000/iso2023-09-09T15:30:00" allowTransparency={true} frameBorder="0" width="320" height="135"></iframe> */}
            </div>
        </>
    );
}

export const App = (): JSX.Element => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <_App />
            </AuthProvider>
        </BrowserRouter>
    );
}