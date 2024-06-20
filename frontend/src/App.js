import { useEffect, useState } from "react";
// import "./App.css";
import Form from "./components/Form";
import Heading from "./components/Heading";
import Table from "./components/Table";
import axios from "axios";

function App() {
  const [employee, setEmployee] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);

  const fetchData = () => {
    axios.get('http://localhost:8081/')
      .then(res => setEmployee(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <Heading/>
      <div className="main row justify-content-center">
        <Form refreshData={fetchData} editEmployee={editEmployee}/>
        <Table employee={employee} refreshData={fetchData} setEditEmployee={setEditEmployee}/>
      </div>
    </div>
  );
}

export default App;
