import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import RecordList from "./components/RecordList/recordList";
import Edit from "./components/editRecord/edit";
import Create from "./components/createRecord/create";
import EquipmentList from "./components/equipmentList/equipmentList";
import CreateEquipment from "./components/createEquipment/createEquipment";
import EditEquipment from "./components/editEquipment/editEquipment";

const App = () => {
  return (
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<RecordList />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
          <Route path="/equipment" element={<EquipmentList />} />
          <Route path="/createequipment" element={<CreateEquipment/>} />
          <Route path="/equipment/edit/:id" element={<EditEquipment/>} />
        </Routes>
      </div>
  );
};

export default App;
