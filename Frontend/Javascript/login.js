import Admin from "./class_Admin.js";
import Customer from "./class_Customer.js";

//html elements
const nameField = document.getElementById('name');
const passField = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

//Onclick function that takes input data from the user and sends a POST request to the API.
//Request body contains the user input data.
//Two different responses are sent from the API, based on whether an admin or user has successfully logged in.
//Objects are created, and the logIn method is called to redirect the user
loginBtn.onclick = ()=>{
    const data = {
        email: nameField.value,
        password: passField.value
    };
    fetch('http://localhost:3000/loginpage/auth', {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(json =>{
            if (json === 'adm'){
                var admin = new Admin('Admin', data.email, data.password);
                admin.logIn();

            } else if (json === 'cus') {
                var customer = new Customer();
                customer.email = data.email;
                customer.password = data.password;
                customer.logIn();
            } else{
                alert(json);
            }
        });

};

