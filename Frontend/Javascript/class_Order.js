
export default class Order {
    constructor(products, orderDay, orderMonth, orderYear, timePeriod, orderPrice, orderId, userId, order_placed_at) {
        this.products = products;
        this.orderDay = orderDay;
        this.orderMonth = orderMonth;
        this.orderYear = orderYear;
        this.timePeriod = timePeriod;
        this.orderPrice = orderPrice;
        this.orderId = orderId;
        this.userId = userId;
        this.order_placed_at = order_placed_at;
    }


    //Method that displays the property values of an order object on the page.
    //Creates an html p tag and appends it to the element passed as a parameter
    showOrder (element){
        element.appendChild(document.createElement('hr'));
        var orderEl = document.createElement("P");
        orderEl.innerHTML = "<b> Ordre ID: </b>" + this.orderId + "</b></br></br><b> Bruger ID</b>: "
            + this.userId +  "</br></br><b>Dato for leje: </b>" + this.orderDay
            + "/" + this.orderMonth + "/" + this.orderYear + "</br></br>"
            + "<b>Tidspunkt for leje: kl. </b>" + this.timePeriod + "</br></br>"
            + "<b>Pris total: </b> " + this.orderPrice
            + "</br></br> <b> Ordre lavet d. : </b>" + this.order_placed_at;
        element.appendChild(orderEl);

        //Calling the showProducts method from the Orderproduct class on the objects to display those as well
        this.products.forEach((item)=>{
            item.showProducts(element);
        });
        element.appendChild(document.createElement('hr'));
    }


    //Method that makes a DELETE request to an endpoint with the objects' orderId as a parameter
    //Takes an html select element as parameter to remove the option after the order has been deleted
    deleteOrder(selection){
        fetch(`http://localhost:3000/profile/orders/${this.orderId}`, {
            credentials: "include",
            method: 'DELETE'
        }).then(response => response.json())
            .then(json => {
                if (json === 'ok') {
                    for (let i = 0; i < selection.length; i++) {
                        if (selection[i].value === this.orderId) {
                            selection.remove(i);
                            break;
                        }
                    }
                }
            })
    }


    //Sends a post request with the object in JSON-format in the request body
    //The header, which contains metadata about the request body, specifies json data
    createOrder() {
        fetch('http://localhost:3000/orderPage/submitOrder', {
            credentials: "include",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        }).then(response => response.json())
            .then(json => {
                if (json == 'ok') {
                    window.location = "orderConfirmation.html";
                }
            })
    }
}