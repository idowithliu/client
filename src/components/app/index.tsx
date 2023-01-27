import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../util/auth";
import { Home } from "../home";
import { RegistryPage } from "../registry";
import { Rsvp } from "../rsvp";
import { Story } from "../story";
import { NavBar } from "./nav";


export const _App = (): JSX.Element => {
    return (
        <>
            <div className="page">
                <picture className="banner">
                    {/* <img loading="eager" style={{ width: "100%" }} src="https://media-api.xogrp.com/images/4e6d4b00-022a-44af-aa38-577ff43cd1de~rt_auto-rs_1024.h?ordering=explicit" className="css-1ago99h" /> */}
                </picture>

                <div className="box-center">
                    <div className="headline">Melanie & Andrew</div>
                    <div className="date">are getting married on the ninth of September 2023</div>
                </div>


                <NavBar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/rsvp" element={<Rsvp />} />
                    <Route path="/about" element={<Story />} />
                    <Route path="/registry" element={<RegistryPage />} />
                </Routes>
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