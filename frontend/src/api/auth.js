import client from "."

export function login() {
    client.post(`/login/`, {
        body: JSON.stringify(inputs),
    })
        .then((res) => res.json())
        .then((result) => {})
}