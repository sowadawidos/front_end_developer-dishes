import './App.scss';
import {Form} from "../from/Form";
import React, { useState, useEffect } from "react"

export const App = () => {
    return (
        <>
            <div className="main__page">
                <div className="container">
                    <Form/>
                </div>
            </div>
        </>
    );
}

export default App;
