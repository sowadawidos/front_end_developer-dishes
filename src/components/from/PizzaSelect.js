import React from "react"

export const PizzaSelect = ({handleInputs, inputs}) => {
    return (
        <>
            <input name="no_of_slices" type="number" id="no_of_slices" placeholder="Number of slices:"  min="0" onChange={e => handleInputs(e)} value={inputs.slices}/>
            <input name="diameter" type="number" step="0.01" id="diameter" placeholder="Diameter:" min="0" onChange={e => handleInputs(e)} value={inputs.diameter}/>
        </>
    )
}