import User from "./class_User.js";


export default class Customer extends User{
    constructor(name, streetName, streetNumber, postalCode, city, phone, email, password, created_At, userId, userTypeId){
        super(name, email, password);
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.postalCode = postalCode;
        this.city = city;
        this.phone = phone;
        this.created_At = created_At;
        this.userId = userId;
        this.userTypeId = userTypeId;
    }
    //Method that makes a post request with body containing the Customer object.
    //User is redirected when the server sends a specific response back
    createCustomer (){
        fetch('http://localhost:3000/register', {
            credentials: "include",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        }).then(response => response.json())
            .then(json => {
                if (json.ok === true){
                    console.log(json.ok);
                    window.location = '../html/loginpage.html';
                }
            });
    }
    //An example of polymorphism. The method redirects the user after a successful login
    logIn(){
        console.log('customer login');
        window.location = '../html/index.html'
    }
    //Method that sends a DELETE request to the API. userid property is used to make the url dynamic
    //Redirects the user once the server sends a response after deletion
    deleteCustomer (){
        fetch(`http://localhost:3000/profile/user/${this.userid}`, {
            credentials: "include",
            method: 'DELETE'
        }).then(response => response.json())
            .then(json => {
                if (json === 'ok'){
                    alert('Brugeren er blevet slettet.');
                    window.location = '../html/index.html';
                }
            })
    }
    //Method that updates the user's password. The endpoint takes a specific user Id as a route parameter
    updatePassword(password){
        fetch(`http://localhost:3000/profile/updatepassword/update/${this.userId}`,{
            credentials: "include",
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(password)
        }).then(response => response.json())
            .then(json => {
                if (json === 'ok'){
                    window.location = '../html/Loginpage.html';
                }
            })
    }
    //Method that uses the DOM to show the property values of the object inside a html element.
    showUserInfo(element){
        element.appendChild(document.createElement('hr'));
        var userInfo = document.createElement('p');
        userInfo.innerHTML = '<b>Bruger ID: </b>' + this.userId + '<br><br><b>Navn: </b>' + this.name + '<br><br><b>Vejnavn: </b>'
                            + this.streetName + '<br><br><b>Vejnummer: </b>' + this.streetNumber + '<br><br><b>Postnummer: </b>'
                            + this.postalCode + '<br><br><b>By: </b>' + this.city + '<br><br><b>Telefonnummer: </b>' + this.phone
                            + '<br><br><b>E-mail: </b>' + this.email + '<br><br><b>Bruger oprettet d. : </b>' + this.created_At;
        element.appendChild(userInfo);
        element.appendChild(document.createElement('hr'));
    }
}
