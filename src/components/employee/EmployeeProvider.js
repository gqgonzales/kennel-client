import React, { useState } from "react";

/*
    The context is imported and used by individual components
    that need data
*/
export const EmployeeContext = React.createContext();

/*
 This component establishes what data can be used.
 */
export const EmployeeProvider = (props) => {
  const [employees, setEmployees] = useState([]);

  const getEmployees = () => {
    return fetch("http://localhost:8088/employees")
      .then((res) => res.json())
      .then(setEmployees);
  };

  const addEmployee = (employee) => {
    return fetch("http://localhost:8088/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }).then(getEmployees);
  };

  const releaseEmployee = (employee_id) => {
    return fetch(
      `http://localhost:8088/employees/${employee_id}`,
      {
        method: "DELETE",
      }
    ).then(getEmployees);
  };

  const updateEmployee = (employee) => {
    return fetch(
      `http://localhost:8088/employees/${employee.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      }
    ).then(getEmployees);
  };

  // Where is getAnimalById defined?
  const getEmployeeById = (employee_id) => {
    return fetch(
      `http://localhost:8088/employees/${employee_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
  };

  /*
        You return a context provider which has the
        `Employees` state, the `addEmployee` function,
        and the `getEmployee` function as keys. This
        allows any child elements to access them.
    */
  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        getEmployees,
        releaseEmployee,
        updateEmployee,
        getEmployeeById,
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};
