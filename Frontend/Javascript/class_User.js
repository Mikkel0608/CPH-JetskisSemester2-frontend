export default class User {
    constructor(name, email, password){
        this.name = name;
        this.email = email;
        this.password = password;
    }
    logIn(){
        console.log('Regular user login');
        window.location = '../html/index.html'
    }
}

