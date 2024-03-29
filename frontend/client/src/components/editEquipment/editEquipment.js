import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import URL from '../../constants/constanUrl';
import './editEquipment.css'


export default function EditEquipment() {
    const [form, setForm] = useState({
        name: "",
        type: "",
        amount: ""
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`${URL}equipment/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const equipment = await response.json();
            if (!equipment) {
                window.alert(`Record with id ${id} not found`);
                navigate("/equipment");
                return;
            }

            setForm(equipment);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedEquipment = {
            name: form.name,
            type: form.type,
            amount: form.amount
        };

        // This will send a post request to update the data in the database.
        await fetch(`${URL}equipment/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedEquipment),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        navigate("/equipment");
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div className="edit-equipment-main">
            <h3>Update Equipment</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="type"
                        value={form.type}
                        onChange={(e) => updateForm({ type: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="amount"
                        value={form.amount}
                        onChange={(e) => updateForm({ amount: e.target.value })}
                    />
                </div>
                <br />
                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Equipment"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}