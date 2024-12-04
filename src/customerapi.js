export function getCustomers() {
    return fetch(import.meta.env.VITE_API_URL + "customers")
    .then(response =>{
        if(!response.ok)
            throw new Error("Error in fetch: " + response.statusText);

        return response.json();
    })
}

export function getCustomer(url) {
    return fetch(url)
    .then(response =>{
        if(!response.ok)
            throw new Error("Error in fetch: " + response.statusText);

        return response.json();
    })
}

export function getTrainings() {
    return fetch(import.meta.env.VITE_API_URL + "trainings")
    .then(response =>{
        if(!response.ok)
            throw new Error("Error in fetch: " + response.statusText);

        return response.json();
    })
}

export function deleteFunction(url) {
    return fetch(url, { method: "DELETE"})
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in delete: " + response.statusText);    

                return response.json();
            })
}

export function saveCustomer(newCustomer) {
    return fetch(import.meta.env.VITE_API_URL + "customers", {
    method: "POST", 
    headers: { "Content-Type" : "application/json" }, 
    body: JSON.stringify(newCustomer)
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error in saving: " + response.statusText);

    return response.json();
    })
}

export function saveTraining(newTraining) {
    return fetch(import.meta.env.VITE_API_URL + "trainings", {
    method: "POST", 
    headers: { "Content-Type" : "application/json" }, 
    body: JSON.stringify(newTraining)
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error in saving: " + response.statusText);

    return response.json();
    })
}

export function updateCustomer(url, customer) {
    return fetch(url, {
    method: "PUT", 
    headers: { "Content-Type" : "application/json" }, 
    body: JSON.stringify(customer)
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error in saving: " + response.statusText);

    return response.json();
    })
}