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
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discout: discout.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }

    //create count 
        if(newProduct.count > 1){
        for(let i = 0; i < newProduct.count; i++){
            dataProduct.push(newProduct)
        }
    }else{
        dataProduct.push(newProduct)
    }
    
    // save storage
    localStorage.setItem('product', JSON.stringify(dataProduct));

    clearInputs()
    readProducts();
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

//reading products

function readProducts () {
    let table = '';

    for (let i = 0; i < dataProduct.length; i++) {
        table += `        
        <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discout}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button id="update">update</button></td>
            <td><button onclick={deleteProduct(${i})} id="delete">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;


    //create btn to delete all
    let btnDeleteAll = document.getElementById('btn-delete-all');
    if(dataProduct.length > 0) {
        btnDeleteAll.innerHTML = `<button onclick={deleteAll()} id="delete-all">delete all (${dataProduct.length})</button></button>`
    }else{
        btnDeleteAll.innerHTML = '';
    }
    
}
readProducts();


//delete index 
function deleteProduct(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    readProducts();
}

//delete all 
function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    readProducts();
}