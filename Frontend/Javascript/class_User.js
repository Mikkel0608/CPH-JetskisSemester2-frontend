export default class User {
    constructor(name, email, password){
        this.name = name;
        this.email = email;
        this.password = password;
    }
    logIn(){
        console.log('customer login');
        window.location = '../html/index.html'
    }
}

