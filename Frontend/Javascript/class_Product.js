export default class Product {
    constructor(productId, price, modelName, modelDescription, quantity, imageSRC) {
        this.productId = productId;
        this.price = price;
        this.modelName = modelName;
        this.modelDescription = modelDescription;
        this.quantity = quantity;
        this.imageSRC = imageSRC;
    }

    generateProduct(clonedElement, i) {
        var container = document.getElementById(clonedElement);
        var clone = container.cloneNode(true);
        //MM: Gives each product clone its own id
        clone.id = "modelContainer" + i;
        //MM: Makes each product clone visible
        clone.style.display = "initial";
        //MM: Inserts each product clone onto the "productContainer" node
        document.getElementById(clonedElement).parentElement.appendChild(clone);
        //MM: The following lines insert the fetched product information onto each clone
        //MM: Inserts product title
        document.getElementById(clonedElement + i).getElementsByTagName('div')[0].getElementsByTagName("h2")[0].innerHTML = this.modelName;
        //MM: Inserts product photo source
        document.getElementById(clonedElement + i).getElementsByTagName('div')[1].getElementsByTagName('img')[0].src = this.imageSRC;
        //MM: Inserts product description
        document.getElementById(clonedElement + i).getElementsByTagName('div')[2].getElementsByTagName('p')[0].innerHTML = this.modelDescription;
        //MM: Inserts maximum amount of available products. It cycles through the product quantity and creates the amount of select options needed.
        var selectElement = document.getElementById(clonedElement + i).getElementsByTagName('div')[2].getElementsByTagName('select')[0];
        for (let x = 0; x < this.quantity; x++) {
            selectElement.options[selectElement.options.length] = new Option([x + 1], [x + 1]);
        }
    }


    generateBasketProduct(clonedElement, modelElement, x) {
        if (document.getElementById(modelElement + x) !== null) {
            //MM: Saves the select element of product number x in the loop
        console.log(modelElement + [x]);
            var selectElement2 = document.getElementById(modelElement + x).getElementsByTagName('div')[2].getElementsByTagName('select')[0];
            //MM: If statement checks if there are more than 0 selected of the product, and that the product has not been generated in the basket already
            if (selectElement2.options[selectElement2.selectedIndex].value > 0 && document.getElementById(clonedElement + x) == null) {
                //MM: Creates a clone of the "basketProduct" div
                var basketProduct = document.getElementById(clonedElement);
                var clone = basketProduct.cloneNode(true);
                //MM: Gives each product clone its own id
                clone.id = clonedElement+ x;
                //MM: Makes each product clone visible
                clone.style.display = "initial";
                //MM: Inserts each product clone onto the "productContainer" node
                document.getElementById(clonedElement).parentElement.appendChild(clone);
                //MM: Inserts all the product information for the corresponding product stored in the storedProducts array
                document.getElementById(clonedElement+ x).innerHTML = "<img style=\"width:30%; float:left; \" src=" + this.imageSRC + "> " + this.modelName + " <br> Antal: " + selectElement2.options[selectElement2.selectedIndex].value + "<br> Pris: " + selectElement2.options[selectElement2.selectedIndex].value * this.price + " kr.";

                //MM: If the product element already exists in the basket, and the "select" element is changed to "0", it hides the element from the basket:
            } else if (selectElement2.options[selectElement2.selectedIndex].value == 0 && document.getElementById(clonedElement + x) != null) {
                document.getElementById(clonedElement + x).style.display = "none";

                //MM: If the product element already exists, but has been hidden previously, it makes the div visible and updates the div with correct amount/price:
            } else if (selectElement2.options[selectElement2.selectedIndex].value > 0 && document.getElementById(clonedElement + x) != null) {
                document.getElementById(clonedElement + x).style.display = "initial";
                document.getElementById(clonedElement + x).innerHTML = "<img style=\"width:30%; float:left; \" src=" + this.imageSRC + "> " + this.modelName + " <br> Antal: " + selectElement2.options[selectElement2.selectedIndex].value + "<br> Pris: " + selectElement2.options[selectElement2.selectedIndex].value * this.price + " kr.";
            }
        }
    }
}