import {getOrderId, removeNode, showOrder} from "./modules/showOrderFunctions.js";
import Customer from "./class_Customer.js";
import Order from "./class_Order.js";

//html elements
const selection = document.getElementById("orderId");
const nodes = document.getElementById('orderList');
const userInfoList = document.getElementById('userInfoList');


//This function populates the select menu with order ID's from the orders the user has made
getOrderId('http://localhost:3000/profile/orders', selection);

//The showOrder is called. The url is made dynamic by using the select menu value.
//The function displays the chosen order on the page.
const showOrderBtn = document.getElementById('showOrderBtn');
showOrderBtn.onclick = ()=>{
    if (selection.value === '0'){
        alert(`Vælg venligst et ordre ID i menuen`)
    } else {
        showOrder(`http://localhost:3000/profile/ordersbyorderid/${selection.value}`, nodes);
    }
};


const delOrderBtn = document.getElementById('delOrderBtn');
delOrderBtn.onclick = ()=>{
    deleteOrder();
};

const delUserBtn = document.getElementById('delUserBtn');
delUserBtn.onclick = ()=>{
    deleteUser();
};

const logOutBtn = document.getElementById('logOutBtn');
logOutBtn.onclick =()=>{
    fetch('http://localhost:3000/profile/logout', {
        credentials: "include",
        method: "GET"
    }).then(response => response.json())
        .then(json => {
            if (json == 'ok'){
                window.location = '../html/index.html'
            }
        })
};


//The function makes a get request to the /profile/user endpoint where the server sends back user data of the user
//that is currently logged in.
//Customer object is created so the method showUserInfo can be called.
window.onload = function getCustomerInfo() {
    fetch('http://localhost:3000/profile/user', {
        credentials: "include",
    })
        .then(response => response.json())
        .then(json => {
            var userInfo = json;
            var customer = new Customer(userInfo.username, userInfo.streetname, userInfo.streetnumber,
            userInfo.postalcode, userInfo.city, userInfo.phone, userInfo.email, '', userInfo.created_at, userInfo.userid);
            customer.showUserInfo(userInfoList);

            document.getElementById('loginPhone').innerHTML = "Logget ind med ID: <br>" + customer.userId;
        })
};


//The following function deletes the order that is currently selected.
//An order object is created depending on which order ID has been chosen by the user.
//deleteOrder method is then called.
function deleteOrder (){
    if (selection.value === '0'){
        alert(`Vælg venligst et ordre ID i menuen`)
    } else {
        var choice = window.confirm(`Er du sikker på, at du vil slette ordre med ordre ID ${selection.value}?`);
        if (choice === true) {
            var order = new Order();
            order.orderId = selection.value;
            order.deleteOrder(selection);
            removeNode(nodes);
            alert(`Ordren er blevet slettet`);
        }
    }
}

/*
MM: The deleteUser function deletes the current user.
 */

//Function that retrieves info about the user that is currently logged in.
//Creates Customer object and calls the deleteCustomer method. The method makes a DELETE request to the server.
function deleteUser() {
    var choice = window.confirm("Er du sikker på, at du vil slette din bruger?");
    if (choice === true) {
        fetch('http://localhost:3000/profile/user', {
            credentials: "include",
        })
            .then(response => response.json())
            .then(json => {
                var customer = new Customer();
                customer.userid = json.userid;
                customer.deleteCustomer();
            });
    }
}





