let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discout = document.getElementById('discout');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


//getTotal 

function calculateTotal() {
    if(price.value != ''){
        let getTotal = (+price.value + +taxes.value + +ads.value) - +discout.value
        total.innerHTML = getTotal;
        total.style.backgroundColor = 'green';
    }else {
        total.innerHTML = '';
        total.style.backgroundColor = 'red';
    }
}

//onsubmit
let dataProduct;

if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product);
}else{
    dataProduct = [];
}

submit.onclick = function(){
    let newProduct = {
        Title: title.value,
        Price: price.value,
        Taxes: taxes.value,
        Ads: ads.value,
        Discout: discout.value,
        Total: total.innerHTML,
        Count: count.value,
        Category: category.value,
    }
    dataProduct.push(newProduct);
    // save storage
    localStorage.setItem('product', JSON.stringify(dataProduct));
    {clearInputs()}
}

// clear inputs
function clearInputs(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discout.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
