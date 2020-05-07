import User from "./class_User.js";

export default class Admin extends User{
    constructor(name, email, password) {
        super(name, email, password);
    }
    //Methods that redirects after a successful login.
    logIn() {
        console.log('adm login');
        window.location = '../html/Adminpage.html';
    }
}