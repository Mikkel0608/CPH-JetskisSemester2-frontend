import Order from "../class_Order.js";
import OrderProduct from "../class_OrderProduct.js";

//Fetches data from a specific path to make new options with an order id in a select-menu
function getOrderId(path, node) {
    removeNode(node);
    fetch(path, { credentials: "include",})
        .then(response => response.json())
        .then(json => {
            json.forEach((item) => {
                var orderId = new Option(`Ordre ${item.orderid}`, item.orderid);
                document.getElementById("orderId").appendChild(orderId);
            })
        })
}

//Function that removes nodes inside an html element
//While loop used since the amount of iterations is not known
function removeNode (node){
    while (node.firstChild){
        node.removeChild(node.lastChild);
    }
}

//Function that fetches data about a specific order
//Creates Orderproduct objects to store in the order object, so methods can be called on the Orderproduct objects
//showOrder method is called on the order to display the order on the site
function showOrder(path, node){
        removeNode(node);

        fetch(path, {credentials: "include"})
            .then(response => response.json())
            .then(json => {
                var orderProducts = [];
                json.products.forEach((item)=>{
                    var orderProduct = new OrderProduct(item.productId, item.price, item.modelname, parseInt(item.count));
                    orderProducts.push(orderProduct);
                });
                var order = new Order(orderProducts, json.orderday, json.ordermonth, json.orderyear, json.timeperiod,
                            json.orderprice, json.orderid, json.userid, json.order_placed_at);
                console.log(order);

                order.showOrder(node);
            });
}

//Exporting the functions so they can be used various places in the program
export {getOrderId, removeNode, showOrder};




