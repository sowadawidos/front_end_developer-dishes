import React, {useState} from "react"

export const SoupSelect = ({handleSpiciness}) => {


    const handleSpicines = e => {
        handleSpiciness(e.target.value);
    }
    return (
        <>
            <input type="number" min="0" max="10" id="spiciness_scale" placeholder="Spiciness scale:" onChange={handleSpicines}/>
        </>
    )
}