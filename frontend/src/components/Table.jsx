import axios from "axios";

const Table = ({employee, refreshData, setEditEmployee}) => {
  
  const updateHandler = (data) => {
    setEditEmployee(data);
  }
  
  
  const deleteHandler = async(id) => {
    try {
      await axios.delete(`http://localhost:8081/employee_info/${id}`)
      refreshData();
    } catch(err) {
      console.log(err);
    } 
  }

  return (
    <div className="col-8 mt-2">
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th style={{color:"#FFD700"}}>ID</th>
            <th style={{color:"#FFD700"}}>Employee Name</th>
            <th style={{color:"#FFD700"}}>Job Title</th>
            <th style={{color:"#FFD700"}}>Employee Email</th>
            <th style={{color:"#FFD700"}}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employee.map((data, id) => (
            <tr key={id}>
              <td>{data.id}</td>
              <td>{data.employee_name}</td>
              <td>{data.job_title}</td>
              <td>{data.employee_email}</td>
              <td>
                <button className="btn btn-warning" onClick={()=> updateHandler(data)}>Update</button>
                <button className="btn btn-danger ms-2" onClick={() => deleteHandler(data.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
