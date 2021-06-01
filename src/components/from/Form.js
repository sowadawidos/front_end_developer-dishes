import React, {useState} from "react"
import "./Form.scss"
import {PizzaSelect} from "./PizzaSelect";
import {SoupSelect} from "./SoupSelect";
import {SandwichSelect} from "./SandwichSelect";
import {Errors} from "../errors/Errors";
import {fetch} from "whatwg-fetch";

const API = "https://frosty-wood-6558.getsandbox.com:443/dishes"

export const Form = () => {
    const [inputs, setInputs] = useState({
        id: '',
        name: '',
        preparation_time: '',
        type: '',
        slices: '',
        diameter: '',
        spiciness: '',
        breadSlices: ''
    })

    const [errors, setErrors] = useState([]);

    const handleInputs = e => {
        const {name, value} = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const sendToServer = dish => {
        fetch(`${API}`, {
            method: "POST",
            body: JSON.stringify(dish),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            });
    }

    const handleSubmit = event => {
        event.preventDefault();
        setErrors('');
        if (!inputs.name) {
            setErrors(prev => [...prev, "name"])
        }
        if (!inputs.preparation_time) {
            setErrors(prev => [...prev, "preparation time"])
        }
        if (!inputs.type || inputs.type === "Dish type:") {
            setErrors(prev => [...prev, "type"])
        }

        if (inputs.type === "pizza") {
            if (!inputs.slices) {
                setErrors(prev => [...prev, "pizza slices"])
            }
            if (!inputs.diameter) {
                setErrors(prev => [...prev, "pizza diameter"])
            }
            const newPizza = {
                name: inputs.name,
                preparation_time: inputs.preparation_time,
                pizza: {
                    slices: inputs.slices,
                    diameter: inputs.diameter
                }
            }
            sendToServer(newPizza);
        }
        if (inputs.type === "soup") {
            if (!inputs.spiciness) {
                setErrors(prev => [...prev, "soup spiciness"])
            }
            const newSoup = {
                name: inputs.name,
                preparation_time: inputs.preparation_time,
                soup: {
                    spiciness: inputs.spiciness
                }
            }
            sendToServer(newSoup);
        }
        if (inputs.type === "sandwich") {
            if (!inputs.breadSlices) {
                setErrors(prev => [...prev, "sandwich bread slices"])
            }
            const newSandwich = {
                name: inputs.name,
                preparation_time: inputs.preparation_time,
                sandwich: {
                    breadSlices: inputs.breadSlices
                }
            }
            sendToServer(newSandwich);
        }
        setInputs({
            id: '',
            name: '',
            preparation_time: '',
            type: '',
            slices: '',
            diameter: '',
            spiciness: '',
            breadSlices: ''
        });
    }

    return (
        <>
            <h1 className="form__title">Dishes</h1>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" value={inputs.name} name="name" onChange={handleInputs} placeholder="Name:"/>
                <input type="time" value={inputs.preparation_time} name="preparation_time" onChange={handleInputs}
                       placeholder="Preparation time:" step="1"/>
                <select value={inputs.type} onChange={handleInputs} name="type">
                    <option value="" disabled selected>Dish type:</option>
                    <option value="pizza">Pizza</option>
                    <option value="soup">Soup</option>
                    <option value="sandwich">Sandwich</option>
                </select>
                {
                    inputs.type === "pizza" ? <PizzaSelect handleInputs={handleInputs} inputs={inputs}/> : null
                }
                {
                    inputs.type === "soup" ? <SoupSelect handleInputs={handleInputs} inputs={inputs}/> : null
                }
                {
                    inputs.type === "sandwich" ? <SandwichSelect handleInputs={handleInputs} inputs={inputs}/> : null
                }
                <button>Submit</button>
            </form>
            <Errors errors={errors}/>
        </>
    )
}