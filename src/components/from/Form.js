import React, {useState, useEffect} from "react"
import "./Form.scss"
import {PizzaSelect} from "./PizzaSelect";
import {SoupSelect} from "./SoupSelect";
import {SandwichSelect} from "./SandwichSelect";
import {Errors} from "../errors/Errors";

export const Form = () => {
    const [name, setName] = useState();
    const [preparation_time, setPreparation_time] = useState();
    const [type, setType] = useState();
    const [slices, setSlices] = useState();
    const [diameter, setDiameter] = useState();
    const [spiciness, setSpiciness] = useState();
    const [breadSlices, setBreadSlices] = useState();
    const [errors, setErrors] = useState([]);

    const handleSubmit = event => {
        event.preventDefault();
        setErrors('');
        if (!name) {
            setErrors(prev => [...prev, "name"])
        }
        if (!preparation_time) {
            setErrors(prev => [...prev, "preparation time"])
        }
        if (!type) {
            setErrors(prev => [...prev, "type"])
        }
        if (type === "pizza") {
            if (!slices) {
                setErrors(prev => [...prev, "pizza slices"])
            }
            if (!diameter) {
                setErrors(prev => [...prev, "pizza diameter"])
            }
        }
        if (type === "soup") {
            if (!spiciness) {
                setErrors(prev => [...prev, "soup spiciness"])
            }
        }
        if (type === "sandwich") {
            if (!breadSlices) {
                setErrors(prev => [...prev, "sandwich bread slices"])
            }
        }
    }

    const handleName = e => {
        setName(e.target.value);
    }
    const handlePreparation = e => {
        setPreparation_time(e.target.value);
    }

    const handleType = e => {
        setType(e.target.value);
    }

    const handlePizzaSlices = slices => {
        setSlices(slices);
    }
    const handlePizzaDiameter = diameter => {
        setDiameter(diameter);
    }
    const handleSpiciness = spiciness => {
        setSpiciness(spiciness);
    }
    const handleBreadSlices = breadSlices => {
        setBreadSlices(breadSlices);
    }


    return (
        <>
            <h1 className="form__title">Dishes</h1>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" value={name} onChange={handleName} placeholder="Name:"/>
                <input type="time" value={preparation_time} onChange={handlePreparation}
                       placeholder="Preparation time:" step="1"/>
                <select name="" id="" value={type} onChange={handleType} placeholder="Type:">
                    <option value="pizza">pizza</option>
                    <option value="soup">soup</option>
                    <option value="sandwich">sandwich</option>
                </select>
                {
                    type === "pizza" ? <PizzaSelect handlePizzaSlices={handlePizzaSlices} handlePizzaDiameter={handlePizzaDiameter}/> : null
                }
                {
                    type === "soup" ? <SoupSelect handleSpiciness={handleSpiciness}/> : null
                }
                {
                    type === "sandwich" ? <SandwichSelect handleBreadSlices={handleBreadSlices}/> : null
                }
                <button>Submit</button>
            </form>
            <Errors errors={errors}/>
        </>
    )
}