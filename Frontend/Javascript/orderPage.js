import Product from "./class_Product.js";
import Order from "./class_Order.js";
import OrderProduct from "./class_OrderProduct.js";

/*MM: The following function is activated by the confirm time button. It requests the products from the API, and clones the modelContainer for each product in the DB.
The product information stored for each product in the database is then inserted into each clone. The API automatically adjusts the quantity available to adjust for existing reservations.
 */
//MM: The global variable storedProducts stores the product objects that are received from the database
const confirmTimeBtn = document.getElementById('confirmTime');
confirmTimeBtn.onclick = (event) => {
    event.preventDefault();
    confirmTime();
};
var storedProducts = [];
var shownProducts = [];
function confirmTime() {
    // MM: Creating variables that represent the user selection of date and time on the page
    var rentDayID = document.getElementById("rentDay");
    var rentDayValue = rentDayID.options[rentDayID.selectedIndex].value;
    var rentMonthID = document.getElementById("rentMonth");
    var rentMonthValue = rentMonthID.options[rentMonthID.selectedIndex].value;
    var rentYearID = document.getElementById("rentYear");
    var rentYearValue = rentYearID.options[rentYearID.selectedIndex].value;

    var rentTimeID = document.getElementById("rentTime");
    var rentTimeValue = rentTimeID.options[rentTimeID.selectedIndex].value;

    //MM: Checks that all date/time fields have been filled out.
    if (rentDayValue != "00" && rentMonthValue != "00" && rentYearValue != "00" && rentTimeValue != "00") {
        var selectedDate = {
            rentDayValue: rentDayValue,
            rentMonthValue: rentMonthValue,
            rentYearValue: rentYearValue,
            rentTimeValue: rentTimeValue
        };
        //MM: Locks the date/time selection elements so that they can't be changed once a date/time has been confirmed.
        document.getElementById('rentDay').disabled = true;
        document.getElementById('rentMonth').disabled = true;
        document.getElementById('rentYear').disabled = true;
        document.getElementById('rentTime').disabled = true;
        //MM: Fetches the products from the database.
        fetch('http://localhost:3000/orderPage/products', {
            credentials: "include",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedDate)
        }).then(response => response.json())
            .then(json => {
                console.log(json);
                console.log(json.length);
                //MM: Checks if the products have already been generated on the page. This is to avoid JS creating duplicates of the same products if the button is pressed repeatedly
                if (storedProducts.length !== json.length) {
                    //MM: Clones "modelContainer" for each product fetched from database, and creates objects for each product
                    for (let i = 0; i < json.length; i++) {
                        //MM: Creates a new Product object from the received information and pushes it to the storedProducts array
                        var newProduct = new Product(json[i].productid, json[i].price, json[i].modelname, json[i].modeldescription, json[i].quantity, json[i].imagesrc);
                        storedProducts.push(newProduct);
                        if (json[i].quantity !== 0) {
                            //MM: The shown products array only contains the objects that are shown on the page
                            shownProducts.push(newProduct);
                            //The generateProduct method creates an HTML element with the found product information
                            newProduct.generateProduct("modelContainer", [i]);
                            //An event listener is added to the select element which activates the calculatePrice function
                            document.getElementById("modelContainer"+ [i]).getElementsByTagName('div')[2].getElementsByTagName('select')[0].addEventListener('change', calculatePrice);
                        }
                    }
                }
                //If no products are available, a text message is shown
                if (shownProducts.length === 0) {
                    document.getElementById('noProducts').style.display = "initial";
                }
            });
        //MM: If the user has not filled out all the date/time fields, an error is shown:
    } else {
        alert("Udfyld venligst alle felter.");
    }
}

/*MM: The following function is activated when the user changes the amount of selected products. It has the following functionality:
1. It adds up the total price of the selected products and shows it in the basket.
2. It shows the basket whenever a product is selected, and hides the basket if no products are selected
3. It generates the product name, photo, and price in basket.
 */
//Function written by: MM
var finalPrice;
function calculatePrice() {
    //MM: Goes through all the stored products and adds their individual prices and quantities to the finalPrice var
    finalPrice = 0;
    for (let i = 0; i < storedProducts.length; i++) {
        if (document.getElementById('modelContainer' + [i]) !== null) {
            var selectElement = document.getElementById("modelContainer" + [i]).getElementsByTagName('div')[2].getElementsByTagName('select')[0];
            finalPrice += selectElement.options[selectElement.selectedIndex].value * storedProducts[i].price;
        }
    }
    document.getElementById('totalPrice').innerHTML = "Samlet Pris: " + finalPrice + " kr.";
    document.getElementById('basketDivFull').style.display = "initial";
    //MM: Hides the basket if the basket is empty
    if (finalPrice === 0) {
        document.getElementById('basketDivFull').style.display = "none";
    }

    //MM: The following for loop cycles through the storedProducts, creates clones of the basketProduct div, and inserts the product information, along with the selected amount
    for (let x = 0; x < storedProducts.length; x++) {
            storedProducts[x].generateBasketProduct("basketProduct","modelContainer", [x]);
    }
}

//MM: The storeOrder function collects the order information and sends it to the API
const storeOrderBtn = document.getElementById('confirmPurchaseButton');
storeOrderBtn.onclick = () => {
    storeOrder();
};

function storeOrder() {
    //MM: The Products array is created. It will contain all the selected products.
    var products = [];
    //MM: The for loop cycles through the storedProducts array and creates objects for each product selected. All product objects are pushed to the Products array.
    for (let i = 0; i < storedProducts.length; i++) {
        if (document.getElementById('modelContainer'+[i]) !== null) {
            var selectElement = document.getElementById("modelContainer" + [i]).getElementsByTagName('div')[2].getElementsByTagName('select')[0];
            if (selectElement.options[selectElement.selectedIndex].value > 0) {
                var newOrderProduct = new OrderProduct(storedProducts[i].productId, storedProducts[i].price, storedProducts[i].modelName, parseInt(selectElement.options[selectElement.selectedIndex].value));
                products.push(newOrderProduct);
            }
        }
    }
    console.log(products);
    
    //MM: The newOrder object is created, and is send to the API with a post request. The client is then redirected to the orderconfirmation page.
    const newOrder = new Order(products, document.getElementById('rentDay').value, document.getElementById('rentMonth').value, document.getElementById('rentYear').value, document.getElementById('rentTime').value, finalPrice);
    newOrder.createOrder();

}