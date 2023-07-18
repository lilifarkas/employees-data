import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Select from 'react-select'
import URL from '../constants/constanUrl';

export default function Create() {

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        position: "",
        level: "",
        equipment: []
    });
    const navigate = useNavigate();


    // These methods will update the state properties.
    function updateForm(value) {
        console.log(value)
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

// This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

// When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };

        await fetch(`${URL}record/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        console.log(newPerson)
        setForm({ firstName: "", lastName: "", middleName:"", position: "", level: "", equipment: []});

        form.equipment.map(element => {
            equipment.map(async x => {
                if( x.name === element && Number(x.amount) > 0){
                    
                    const updatedEquipment = {
                        name: x.name,
                        type: x.type,
                        amount: Number(x.amount) - 1,
                    };

                    await fetch(`${URL}equipment/update/${x._id}`, {
                        method: "POST",
                        body: JSON.stringify(updatedEquipment),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                } else {
                    console.log("no")
                }
            })
        })
        navigate("/");
    }

    // get equipments data from database and setEquipments
    const [equipment, setEquipment] = useState([]);

    useEffect(() => {
        async function getData() {
            const response = await fetch(`${URL}equipment/`);
            const equipments = await response.json();
            setEquipment(equipments);
        }

        getData();
    }, []);

    const [positions, setPositions] = useState([])

    useEffect(() => {
        async function getPositions(){
            const res = await fetch(`${URL}position/`);
            const positions = await res.json();
            setPositions(positions)
        }
        getPositions()
    }, [])

    console.log(positions)

    const [isSelected, setIsSelected] = useState(false)

    // function pickOnePosition(e) {
    //
    //     setIsSelected(true)
    //
    //     if(setIsSelected){
    //         console.log(e.target.value)
    //         updateForm( {position: e.target.value})
    //         return (
    //             <div>
    //
    //             </div>
    //         )
    //     }
    // }

    function pickEquipment(selectedEquipment) {
        setIsSelected(true);

        if (setIsSelected) {
            const selectedNames = selectedEquipment.map((equipment) => equipment.name);
            
            setForm((prevForm) => ({
                ...prevForm,
                equipment: selectedNames,
            }));
        }
    }

    const isFormValid =
        form.firstName.trim() !== "" &&
        form.lastName.trim() !== "" &&
        form.level.trim() !== "";

    const filteredEquipment = equipment.filter((item) => Number(item.amount) > 0);

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Create New Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fisrtName"
                        value={form.firstName}
                        onChange={(e) => updateForm({ firstName: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={form.lastName}
                        onChange={(e) => updateForm({ lastName: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Middle Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="middleName"
                        value={form.middleName}
                        onChange={(e) => updateForm({ middleName: e.target.value })}
                    />
                </div>
                {/*<div className="form-group">*/}
                {/*    <Select options={positions}*/}
                {/*            getOptionLabel={(positions) => positions['name']}*/}
                {/*            getOptionValue={(position) => positions['name']}*/}
                {/*            className="basic-multi-select" name="equipmentList" isMulti*/}
                {/*            defaultValue={equipment[0]} classNamePrefix="select"*/}
                {/*            onChange={ (e) => pickOnePosition(e)}/>*/}
                {/*</div>*/}
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionIntern"
                            value="Intern"
                            checked={form.level === "Intern"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionIntern" className="form-check-label">Intern</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionJunior"
                            value="Junior"
                            checked={form.level === "Junior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionJunior" className="form-check-label">Junior</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionSenior"
                            value="Senior"
                            checked={form.level === "Senior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionSenior" className="form-check-label">Senior</label>
                    </div>
                </div>
                <br />
                <label htmlFor="equipments">Equipments:</label>
                <div className="form-group">
                    <Select options={filteredEquipment}
                            getOptionLabel={(equipment) => equipment['name']}
                            getOptionValue={(equipment) => equipment['name']}
                            className="basic-multi-select" name="equipmentList" isMulti
                            defaultValue={[]} classNamePrefix="select"
                            onChange={(selectedEquipment) => pickEquipment(selectedEquipment)}/>

                    {/*equipment.map(element => {
              return (
                  <div className="form-check form-check-inline" key={element.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={element.name}
                      id={element.name}
                      value={element.name}
                      onClick={ (e) => updateForm( {equipment: e.target.value})}
                    />
                    <label htmlFor="equipments" className="form-check-label">{element.name}</label>
                  </div>
              )
            })*/}
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Create record"
                        className="btn btn-primary"
                        disabled={!isFormValid}
                    />
                </div>
            </form>
        </div>
    );
}