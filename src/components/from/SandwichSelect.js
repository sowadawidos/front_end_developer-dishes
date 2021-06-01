import React from "react"

export const SandwichSelect = ({handleInputs, inputs}) => {

    return (
        <>
            <input name="breadSlices" type="number"  id="slices_of_bread" placeholder="Slices of bread:" onChange={e => handleInputs(e)} value={inputs.breadSlices}/>
        </>
    )
}