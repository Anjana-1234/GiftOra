document.getElementById("bouquetOptions").addEventListener("change", function() {
    CheckOptions();
});

document.getElementById("flowerForm").addEventListener("reset", function() {
    resetOrder();
});

function getRadioValue(name) {
    let radios = document.getElementsByName(name);
    for (let radio of radios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return null;
}

function CheckOptions() {
    let select = document.getElementById("bouquetOptions").value;
    let images = document.querySelectorAll(".product img");

    if (select.includes("Champagne")) {
        images[0].src = "images/white-gift.jpeg";
        images[1].src = "images/pink-gift.jpeg";
        images[2].src = "images/red-gift.jpeg";
    } else {
        images[0].src = "images/white.jpeg";
        images[1].src = "images/pink.jpeg";
        images[2].src = "images/red.jpeg";
    }

    displayBouquet();
}

function displayBouquet() {
    let chosenBouquet = getRadioValue("colour");
    let orderDiv = document.getElementById("order");

    if (chosenBouquet) {
        let productDiv = document.getElementById("product" + (chosenBouquet === "white" ? "1" : chosenBouquet === "pink" ? "2" : "3")).innerHTML;

        // Wrap copied content inside a div with class="product"
        orderDiv.innerHTML = `<div class="product">${productDiv}</div>`;
    } else {
        orderDiv.innerHTML = "";
    }
}


function resetOrder() {
    document.getElementById("order").innerHTML = "";
    document.querySelectorAll(".product img")[0].src = "images/white.jpeg";
    document.querySelectorAll(".product img")[1].src = "images/pink.jpeg";
    document.querySelectorAll(".product img")[2].src = "images/red.jpeg";
}
