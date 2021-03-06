import React, {useState, useEffect} from "react"
import "./Form.scss"
import {PizzaSelect} from "./PizzaSelect";
import {SoupSelect} from "./SoupSelect";
import {SandwichSelect} from "./SandwichSelect";
import {Errors} from "../errors/Errors";
import {fetch} from "whatwg-fetch";
import {Button} from "../button/Button";

const API = "https://frosty-wood-6558.getsandbox.com:443/dishes"

export const Form = () => {
    const [inputs, setInputs] = useState({
        id: '',
        name: '',
        preparation_time: '',
        type: '',
        no_of_slices: '',
        diameter: '',
        spiciness: '',
        breadSlices: ''
    });
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setErrors('');
    }, [inputs])

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
            .then(response => alert("Form has been sent!"))
            .catch(error => {
                console.log(error);
            });

        setInputs({
            id: '',
            name: '',
            preparation_time: '',
            type: '',
            no_of_slices: '',
            diameter: '',
            spiciness: '',
            breadSlices: ''
        });
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (!inputs.name) {
            setErrors(prev => [...prev, "dish name"])
        }
        if (!inputs.preparation_time) {
            setErrors(prev => [...prev, "preparation time"])
        }
        if (!inputs.type || inputs.type === "Dish type:") {
            setErrors(prev => [...prev, "type"])
        }

        if (inputs.type === "pizza") {
            if (!inputs.no_of_slices) {
                setErrors(prev => [...prev, "pizza slices"])
            }
            if (!inputs.diameter) {
                setErrors(prev => [...prev, "pizza diameter"])
            }
            if (inputs.no_of_slices && inputs.diameter) {
                const newPizza = {
                    name: inputs.name,
                    preparation_time: inputs.preparation_time,
                    type: inputs.type,
                    no_of_slices: parseInt(inputs.no_of_slices),
                    diameter: parseFloat(inputs.diameter)
                }
                sendToServer(newPizza);
            }
        }
        if (inputs.type === "soup") {
            if (!inputs.spiciness) {
                setErrors(prev => [...prev, "soup spiciness"])
            } else {
                const newSoup = {
                    name: inputs.name,
                    preparation_time: inputs.preparation_time,
                    type: inputs.type,
                    spiciness_scale: parseInt(inputs.spiciness)
                }
                sendToServer(newSoup);
            }
        }
        if (inputs.type === "sandwich") {
            if (!inputs.breadSlices) {
                setErrors(prev => [...prev, "sandwich bread slices"])
            } else {
                const newSandwich = {
                    name: inputs.name,
                    preparation_time: inputs.preparation_time,
                    type: inputs.type,
                    slices_of_bread: parseInt(inputs.breadSlices)
                }
                sendToServer(newSandwich);
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" value={inputs.name} name="name" onChange={handleInputs} placeholder="Dish name:"/>
                <label>
                    Preparation time:
                    <input type="time" defaultValue={"00:00:00"} name="preparation_time" onChange={handleInputs} step="1"/>
                </label>
                <select value={inputs.type} onChange={handleInputs} name="type">
                    <option value="" disabled selected>Dish type:</option>
                    <option value="pizza">Pizza</option>
                    <option value="soup">Soup</option>
                    <option value="sandwich">Sandwich</option>
                </select>
                {
                    inputs.type === "pizza" && <PizzaSelect handleInputs={handleInputs} inputs={inputs}/>
                }
                {
                    inputs.type === "soup" && <SoupSelect handleInputs={handleInputs} inputs={inputs}/>
                }
                {
                    inputs.type === "sandwich" && <SandwichSelect handleInputs={handleInputs} inputs={inputs}/>
                }
                <Button/>
            </form>
            <Errors errors={errors}/>
        </>
    )
}