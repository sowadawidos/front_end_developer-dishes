import React, { useState, useEffect } from "react"
import "./Errors.scss"

export const Errors = ({errors}) => {
    return (
        <>
            <ul className="form__error">
                {
                    errors ? errors.map((error, key) => <li className="form__error-list" key={key}>Empty field {error}</li>) : null
                }
            </ul>
        </>
    )
}