import Customer from "./class_Customer.js";

const form = document.getElementById('updatepassword');

//Fetches userid of the active user. Creates a Customer object, and calls the updatePassword method taking the password
//as a parameter. The method makes a PUT request to the server to update the database.
window.onload = function(){
    fetch('http://localhost:3000/profile/user', {
        credentials: "include",
    })
        .then(response => response.json())
        .then(json => {
            console.log(json.userid);

            form.onsubmit = (event)=>{
                event.preventDefault();
                var password = {
                    password: document.getElementById('newPassword').value
                };
                var customer = new Customer();
                customer.userId = json.userid;
                customer.updatePassword(password);
            };
        });
};