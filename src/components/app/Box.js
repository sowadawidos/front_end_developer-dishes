import React from "react"
import {Form} from "../from/Form";
import {FormTitle} from "../from/FormTitle";

export const Box = () => {
    return (
        <>
            <div className="container">
                <FormTitle/>
                <Form/>
            </div>
        </>
    )
}