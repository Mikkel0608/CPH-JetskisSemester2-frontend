import {removeNode, showOrder} from "./modules/showOrderFunctions.js";
import Order from "./class_Order.js";
import OrderProduct from "./class_OrderProduct.js";

//Html elements
const sortBtn = document.getElementById('sortBtn');
const sort = document.getElementById('sort');
const searchBtn = document.getElementById('searchBtn');
const search = document.getElementById('search');
const node = document.getElementById("orderList");

//Setting the values of the options in the select menu
const datE = document.getElementById('date');
datE.value = 1;
const id = document.getElementById('id');
id.value = 2;
const price = document.getElementById('price');
price.value = 3;


//onclick function that makes a get request for all orders depending on a specific sorting criteria.
//The function creates Orderproduct objects as well as order objects. The showOrder method is then called on all the
//order objects, so the orders will get displayed on the site.
sortBtn.onclick = () => {
    fetch(`http://localhost:3000/adminpage/allOrders/${sort.value}`, {
        credentials: "include",
        method: 'GET',
    }).then(response => response.json())
        .then(json => {
            console.log(json);
            var orders = json;
            removeNode(node);
            let i;
            for (i = 0; i < orders.length; i++) {
                var orderProducts = [];
                orders[i].products.forEach((item)=>{
                    var orderProduct = new OrderProduct(item.productId, item.price, item.modelname, item.count);
                    orderProducts.push(orderProduct);
                });
                var order = new Order(orderProducts, orders[i].orderday, orders[i].ordermonth, orders[i].orderyear, orders[i].timeperiod,
                    orders[i].orderprice, orders[i].orderid, orders[i].userid, orders[i].order_placed_at);
                order.showOrder(node);
            }
        })
};

//Function that makes a request for an endpoint with an order Id as a route parameter.
//The function makes sure that the search contains a value of type number.
searchBtn.onclick = ()=>{
    if(isNaN(parseInt(search.value))){
           alert("Søg efter ordre-id'et")
    } else {
        showOrder(`http://localhost:3000/profile/ordersbyorderid/${parseInt(search.value)}`, node);
    }
};







