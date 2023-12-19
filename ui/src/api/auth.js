const api_base = process.env.REACT_APP_API_BASE;

export function login() {
    fetch(`${api_base}/login/`, {
        method: 'post',
        body: JSON.stringify(inputs),
    })
        .then((res) => res.json())
        .then((result) => {}
}