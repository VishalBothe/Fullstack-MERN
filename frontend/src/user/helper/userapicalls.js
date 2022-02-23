import { API } from "../../backend";

export const getUser = (userId, token) => {
    return fetch(`${API}user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const updateUser = (userId, token, details) => {
    return fetch(`${API}user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(details)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}