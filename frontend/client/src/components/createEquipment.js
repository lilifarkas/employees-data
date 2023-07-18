import React, { useState } from "react";
import { useNavigate } from "react-router";
import URL from '../constants/constanUrl';


export default function CreateEquipment() {
    const [form, setForm] = useState({
        name: "",
        type: "",
        amount: "",
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the createequipment url, we'll add a new record to the database.
        const newEquipment = { ...form };

        await fetch(`${URL}equipment/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEquipment),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ name: "", type: "", amount: "" });
        navigate("/equipment");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Create New Equipment</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <input
                        type="text"
                        className="form-control"
                        id="type"
                        value={form.type}
                        onChange={(e) => updateForm({ type: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">amount</label>
                    <input
                        type="text"
                        className="form-control"
                        id="amount"
                        value={form.amount}
                        onChange={(e) => updateForm({ amount: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create equipment"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}