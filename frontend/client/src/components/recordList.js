import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import URL from '../constants/constanUrl';
import { Spinner } from 'react-spinners';

const Record = (props) => (
    <tr>
        <td>{props.record.firstName}</td>
        <td>{props.record.lastName}</td>
        <td>{props.record.middleName}</td>
        <td>{props.record.position}</td>
        <td>{props.record.level}</td>
        <td>
            {props.record.equipment.map((equipmentName) => (
                <div key={equipmentName}>{equipmentName}</div>
            ))}
        </td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
            <button className="btn btn-link"
                    onClick={() => {
                        props.deleteRecord(props.record._id);
                    }}
            >
                Delete
            </button>
        </td>
    </tr>
);

export default function RecordList() {
    const [isLoading, setIsLoading] = useState(true);
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            setIsLoading(true);
            
            const response = await fetch(`${URL}record/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                setIsLoading(false);
                return;
            }

            const records = await response.json();
            setRecords(records);
            setIsLoading(false);
        }

        getRecords();

        return;
    }, []);

    // This method will delete a record
    async function deleteRecord(id) {
        await fetch(`${URL}${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    // This method will arrange employees
    async function arrangeEmployees(e) {
        const response = await fetch(`${URL}record/`);
        const records = await response.json();

        if(e === "---Arrange---") {
            setRecords(records)
        } else if( e === "First name") {
            const sortedByFirstName = records.sort((a,b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0))
            setRecords(sortedByFirstName)
        }else if( e === "Last name") {
            const sortedByLastName = records.sort((a,b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0))
            setRecords(sortedByLastName)
        }else if( e === "Middle name") {
            const sortedByMiddleName = records.sort((a,b) => (a.middleName > b.middleName) ? 1 : ((b.middleName > a.middleName) ? -1 : 0))
            setRecords(sortedByMiddleName)
        }else if( e === "Position") {
            const sortedByPosition = records.sort((a,b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0))
            setRecords(sortedByPosition)
        }else if( e === "Level") {
            const sortedByLevel = records.sort((a,b) => (a.level > b.level) ? 1 : ((b.level > a.level) ? -1 : 0))
            setRecords(sortedByLevel)
        }
    }

    async function filterPosition(e) {
        const response = await fetch(`${URL}record/`);
        const records = await response.json();

        let filtered = []
        records.map(record => {
            if((record.position.toLowerCase()).includes(e.toLowerCase())){
                filtered.push(record)
            }
        })
        setRecords(filtered)
    }

    async function filterLevel(e) {
        const response = await fetch(`${URL}record/`);
        const records = await response.json();

        let filtered = []
        records.map(record => {
            if((record.level.toLowerCase()).includes(e.toLowerCase())){
                filtered.push(record)
            }
        })
        setRecords(filtered)
    }

    // This following section will display the table with the records of individuals.
    return (
        <div>
            {isLoading ? (
                <div><Spinner speed={5} customText={"Loading..."}/></div>
            ) : (
                <>
                    <h3>Record List</h3>
                    <select id = "arrange" onChange={(e) => arrangeEmployees(e.target.value)} >
                        <option> ---Arrange--- </option>
                        <option> First name </option>
                        <option> Last name </option>
                        <option> Middle name </option>
                        <option> Position </option>
                        <option> Level </option>
                    </select>
                    <input id="filterPosition" type="text"
                           placeholder="Filter by position" onChange={(e) => filterPosition(e.target.value)}></input>
                    <input id="filterLevel" type="text"
                           placeholder="Filter by level" onChange={(e) => filterLevel(e.target.value)}></input>
                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>
                        <tr>
                            <th>Fisrt Name</th>
                            <th>Last Name</th>
                            <th>Middle Name</th>
                            <th>Position</th>
                            <th>Level</th>
                            <th>Equipment</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>{recordList()}</tbody>
                    </table>
                </>
            )}
        </div>
    );
}