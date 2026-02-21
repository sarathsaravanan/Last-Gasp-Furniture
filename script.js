const catalogItems = ["chair", "recliner", "table", "umbrella"];
const catalogPrices = [25.50, 37.75, 49.95, 24.89];
const TAX_RATE = 0.15;
// array with all the area state codes
const stateCodes = [
    "WA", "OR", "CA", "NV", "ID", "MT", "WY", "UT", "AZ", "NM", 
    "CO", "ND", "SD", "NE", "KS", "OK", "TX", "MN", "IA", "MO", 
    "AR", "LA", "WI", "IL", "MI", "IN", "OH", "KY", "TN", "MS", 
    "AL", "NY", "PA", "WV", "VA", "NC", "SC", "GA", "FL", "ME", 
    "NH", "VT", "MA", "RI", "CT", "NJ", "DE", "MD", "DC", "AK", "HI"
];
// state shipping zones numbered from 1-6 corresponding with the statecode array
const stateZones = [
    1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 
    3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 
    4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 
    5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6
];


var purchasedItems = [];
var purchasedQuantities = [];

//function to make the purchase button
function makePurchase() {
    let keepShopping = true;
    

    purchasedItems = [];
    purchasedQuantities = [];

    // steps 1-3 with shopping
    while (keepShopping) {
        let itemInput = prompt("What item would you like to buy today: Chair, Recliner, Table or Umbrella?");
        

        if (itemInput === null) {
            alert("Transaction cancelled.");
            return; 
        }

        itemInput = itemInput.toLowerCase(); 

        let itemIndex = catalogItems.indexOf(itemInput);

        if (itemIndex !== -1) {
            let qtyInput = prompt("How many " + itemInput + " would you like to buy?");
            let quantity = parseInt(qtyInput);

            if (quantity > 0) {
                purchasedItems.push(itemInput);
                purchasedQuantities.push(quantity);
            } else {
                alert("Invalid quantity. Item not added.");
            }
        } else {
            alert("Sorry, we don't sell that item.");
        }

        let continueInput = prompt("Continue shopping? y/n");
        if (continueInput !== null && continueInput.toLowerCase() !== 'y') {
            keepShopping = false;
        }
    }

    if (purchasedItems.length === 0) {
        alert("Your cart is empty. Have a nice day!");
        return;
    }

    // step 4 with asking what the state is shipped to
    let validState = false;
    let userState = "";
    let stateIndex = -1;

    while (!validState) {
        userState = prompt("Enter the two-letter abbreviation for the state shipped to:");
        
        if (userState === null) {
            alert("Transaction cancelled.");
            return;
        }

        userState = userState.toUpperCase();
        stateIndex = stateCodes.indexOf(userState);

        if (stateIndex !== -1) {
            validState = true;
        } else {
            alert("Invalid state abbreviation. Please enter a valid two-letter code.");
        }
    }
    // fifth step with performing business calculations
    let zone = stateZones[stateIndex];
    let subtotal = 0;
    // for loop to calculate subtotal
    for (let i = 0; i < purchasedItems.length; i++) {
        let itemName = purchasedItems[i];
        let itemQty = purchasedQuantities[i];
        let catalogIndex = catalogItems.indexOf(itemName);
        let price = catalogPrices[catalogIndex];
        
        subtotal += (price * itemQty);
    }
    // calculate shopping using a switch statement
    let shippingCost = 0;
    switch (zone) {
        case 1:
            shippingCost = 0.00;
            break;
        case 2:
            shippingCost = 20.00;
            break;
        case 3:
            shippingCost = 30.00;
            break;
        case 4:
            shippingCost = 35.00;
            break;
        case 5:
            shippingCost = 45.00;
            break;
        case 6:
            shippingCost = 50.00;
            break;
        default:
            shippingCost = 0.00;
    }

    // see if the user is ellegible for free shipping or not
    shippingCost = (subtotal > 100) ? 0.00 : shippingCost;
    // tax total
    let taxAmount = subtotal * TAX_RATE;
    let grandTotal = subtotal + shippingCost + taxAmount;

    displayInvoice(userState, subtotal, shippingCost, taxAmount, grandTotal);
}

// function to print the invoice to the screen
function displayInvoice(stateCode, subtotal, shipping, tax, total) {
    // hide store, show invoice
    document.getElementById('store-container').style.display = 'none';
    document.getElementById('invoice-container').style.display = 'block';

    let itemsHtml = "<h3>Items Purchased:</h3><ul>";
    // for loop for purchased parallel arrays to show the items
    for (let i = 0; i < purchasedItems.length; i++) {
        let itemName = purchasedItems[i];
        let itemQty = purchasedQuantities[i];
        let catalogIndex = catalogItems.indexOf(itemName);
        let price = catalogPrices[catalogIndex];
        let lineTotal = price * itemQty;
        // capitalizing for show
        let displayItemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);

        itemsHtml += "<li>" + itemQty + " " + displayItemName + " @ $" + price.toFixed(2) + " = $" + lineTotal.toFixed(2) + "</li>";
    }
    itemsHtml += "</ul>";

    document.getElementById('invoice-items').innerHTML = itemsHtml;
    // displaying the total transaction part
    let totalsHtml = "<h3>Transaction Details:</h3>";
    totalsHtml += "<p>State Shipped To: <strong>" + stateCode + "</strong></p>";
    totalsHtml += "<p>Subtotal: $" + subtotal.toFixed(2) + "</p>";
    totalsHtml += "<p>Shipping: $" + shipping.toFixed(2) + "</p>";
    totalsHtml += "<p>Tax (15%): $" + tax.toFixed(2) + "</p>";
    totalsHtml += "<h3>Grand Total: $" + total.toFixed(2) + "</h3>";

    document.getElementById('invoice-totals').innerHTML = totalsHtml;
}
// fuction to make steps 7 and 8
function resetPage() {
    document.getElementById('invoice-container').style.display = 'none';
    document.getElementById('store-container').style.display = 'block';
}