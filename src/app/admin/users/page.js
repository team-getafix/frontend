'use client'

import { useState, useEffect } from "react";

async function getUsers() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:4000/api/auth/all-users`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) {
            throw new Error(`Can not get users (${response.status} ${response.statusText})`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        alert(error);
        return null;
    }
}

function deleteUser(id) {
    const token = localStorage.getItem('token');

    try {
        const response = fetch(`http://localhost:4000/api/auth/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) {
            throw new Error(`Can not delete user (${response.status} ${response.statusText})`);
        }

        window.location.reload();

    } catch (error) {
        alert(error);
    }
}

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const userData = await getUsers();
            setUsers(userData);
        }

        fetchUsers();
    }, [])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            Id
                        </th>
                        <th>
                            First Name
                        </th>
                        <th>
                            Last Name
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Role
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td><button onClick={ () => deleteUser(user.id) }>Delete</button></td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </div>
    )
}