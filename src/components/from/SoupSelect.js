import React from "react"

export const SoupSelect = ({handleInputs, inputs}) => {
    return (
        <>
            <input name="spiciness" type="number" min="0" max="10" id="spiciness_scale" placeholder="Spiciness scale:" onChange={e => handleInputs(e)} value={inputs.spiciness}/>
        </>
    )
}