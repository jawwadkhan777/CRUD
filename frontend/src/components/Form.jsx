import axios from "axios";
import React, { useEffect, useState } from "react";

const Form = ({refreshData, editEmployee}) => {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    
    useEffect(()=> {
      if(editEmployee) {
        setName(editEmployee.employee_name);
        setTitle(editEmployee.job_title);
        setEmail(editEmployee.employee_email);
      }
    }, [editEmployee])



    const submitHandler = (event)=> {
        event.preventDefault();
        if(editEmployee){

          axios.put(`http://localhost:8081/${editEmployee.id}`, {name, title, email})
          .then(res => {console.log(res);
            refreshData();
            clearForm();
          })
          .catch(err => console.log(err))
        } else {
          axios.post('http://localhost:8081/', {name, title, email})
        .then(res => {console.log(res)
          refreshData();
          clearForm();
        })
        .catch(err => console.log(err))
        }
    }

    const clearForm = ()=> {
      setName('');
      setTitle('');
      setEmail('');
    }


  return (
    <form
      action=""
      id="employee-form"
      className="row justify-content-center mb-4"
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <div className="col-8 mb-3">
        <label htmlFor="name">Employee Name</label>
        <input
          type="text"
          id="name"
          className="form-control"
          placeholder="enter employee's name..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="col-8 mb-3">
        <label htmlFor="title">Job Title</label>
        <input
          type="text"
          id="title"
          className="form-control"
          placeholder="enter job title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="col-8 mb-3">
        <label htmlFor="email">Employee Email</label>
        <input
          type="email"
          id="email"
          className="form-control"
          placeholder="enter employee's email..."
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="col-8 mb-3">
        <button className="btn btn-success">Submit</button>
      </div>
    </form>
  );
};

export default Form;
