import React, { useState } from "react"

export const SandwichSelect = ({handleBreadSlices}) => {

    const handleBreadSlice = e => {
        handleBreadSlices(e.target.value)
    }

    return (
        <>
            <input type="number"  id="slices_of_bread" placeholder="Slices of bread:" onChange={handleBreadSlice}/>
        </>
    )
}