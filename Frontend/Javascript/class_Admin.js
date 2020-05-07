import User from "./class_User.js";

export default class Admin extends User{
    constructor(name, email, password) {
        super(name, email, password);
    }
    //An example of polymorphism. The method redirects the admin after a successful login
    logIn() {
        console.log('adm login');
        window.location = '../html/Adminpage.html';
    }
}