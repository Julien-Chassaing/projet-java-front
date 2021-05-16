import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/Api";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsersFunc();
  }, [users]);

  const getAllUsersFunc = () => {
    getAllUsers().then((response) => {
      setUsers(response);
    });
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <h2>Gestion des utilisateurs</h2>
      </div>
      <br />
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Pseudo</th>
            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">Rôle</th>
          </tr>
        </thead>
        <tbody>
          {users.map((response) => (
            <tr>
              <td>{response.email}</td>
              <td>{response.identifier}</td>
              <td>{response.surname}</td>
              <td>{response.name}</td>
              <td>{response.role === 1 ? "Gestionnaire" : "Utilisateur"}</td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default Users;
