import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "../home";
import { RegistryPage } from "../registry";
import { Story } from "../story";
import { NavBar } from "./nav";


export const _App = (): JSX.Element => {
    return (
        <>
            <div className="page">
                <picture className="banner">
                    <img loading="eager" style={{ width: "100%" }} src="https://media-api.xogrp.com/images/4e6d4b00-022a-44af-aa38-577ff43cd1de~rt_auto-rs_1024.h?ordering=explicit" className="css-1ago99h" />
                </picture>

                <div className="box-center">
                    <div className="headline">Melanie & Andrew</div>
                    <div className="date">are getting married on <strong>September 9, 2023</strong></div>
                </div>


                <NavBar />

                <Routes>
                    <Route path="/" element={<Home />} />
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
            <_App />
        </BrowserRouter>
    );
}