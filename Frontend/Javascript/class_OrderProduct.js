export default class OrderProduct {
    constructor(productId, price, modelName, quantity){
        this.productId = productId;
        this.price = price;
        this.modelName = modelName;
        this.quantity = quantity;
    }
    //Displays the products on the site. This method gets called in the showOrder method as well.
    //Takes the html element that the products are to be appended to as a parameter
    showProducts (element){
        var product = document.createElement('p');
        product.innerHTML = '<b>Produkt: </b>' + this.modelName +'<br>' +
            '<b>Antal: </b>' + this.quantity + '<br>' +
            '<b>Pris pr. : </b>' + this.price;
        element.appendChild(product);
    }
}