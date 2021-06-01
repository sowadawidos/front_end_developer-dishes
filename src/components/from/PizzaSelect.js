import React, {useState} from "react"

export const PizzaSelect = ({handlePizzaSlices, handlePizzaDiameter}) => {

    const handleSlices = e => {
        handlePizzaSlices(e.target.value);
    }

    const handleDiameter = e => {
        handlePizzaDiameter(e.target.value);
    }

    return (
        <>
            <input type="number" id="no_of_slices" placeholder="Number of slices:"  onChange={handleSlices}/>
            <input type="number" step="0.01" id="diameter" placeholder="Diameter" onChange={handleDiameter} />
        </>
    )
}