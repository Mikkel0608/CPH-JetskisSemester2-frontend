import Customer from "./class_Customer.js";

const registration_button = document.getElementById('registration_button');
/*MD:
The purpose of the code is validate the input in the registration form. We achieve this by using a boolean value
that returns false if some of the text fields are invalid.
 */
//This code is written by Morten Dyberg
registration_button.onclick =()=>{
  register();
};
function register() {
    var name = document.getElementById("customerName").value;
    var streetName = document.getElementById("streetName").value;
    var streetNumber = document.getElementById("streetNumber").value;
    var postalCode = document.getElementById("postalCode").value;
    var city = document.getElementById("city").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    //The following lines of code will validate whether the inputs are valid.
    //1. Validating the form
    var form_valid = true;
    var validation_message = "";

    //2. Validating the name
    if (customerName==null || customerName=="")
    {
        document.getElementById('customerName').style.borderColor = "red";
        validation_message += "Venligst udfyld navn! \n";
        form_valid = false;
    }

    //3. Validating the address (same method as the name)
    if (streetName==null || streetName=="")
    {
        document.getElementById('streetName').style.borderColor = "red";
        validation_message += "Venligst udfyld vejnavn!\n";
        form_valid = false;
    }

    //4. Validating the City
    if (city==null || city=="")
    {
        document.getElementById('city').style.borderColor = "red";
        validation_message += "Venligst udfyld by!\n";
        form_valid = false;
    }

    //5. Validating the phone number using isNaN method
    if (isNaN(phone) || phone==null || phone=="")
    {
        document.getElementById('phone').style.borderColor = "red";
        validation_message += "Venligst udfyld telefonnummer!\n";
        form_valid = false;
    }

    //6. Validating the e-mail
    if (email==null || email=="")
    {
        document.getElementById('email').style.borderColor = "red";
        validation_message += "Venligst udfyld E-mail!\n";
        form_valid = false;
    }

    /*7. Validating the password(s).
     */
    if (password==null || password=="" || confirmPassword==null || confirmPassword=="")
    {
        document.getElementById('password').style.borderColor = "red";
        document.getElementById('confirmPassword').style.borderColor = "red";
        validation_message += "Venligst udfyld password!\n";
        form_valid = false;
    }

    //This if statement checks whether the password and confirmPassword values are equal to eachother.
    if (document.getElementById("password").value!=document.getElementById("confirmPassword").value) {
        document.getElementById('confirmPassword').style.borderColor = "red";
        validation_message += "Passwords er ikke ens";
        form_valid = false;
    }


    //Creates a Customer object. The createCustomer method is then called to make a POST request to the server.
    if (form_valid) {
        console.log(password);
        const customer = new Customer(name, streetName, streetNumber, postalCode, city, phone, email, password);
        customer.createCustomer();
        return true;
    } else {
        alert(validation_message);
        return false;
    }
}




