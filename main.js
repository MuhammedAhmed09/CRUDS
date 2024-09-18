let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discout = document.getElementById('discout');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let forged;


//getTotal 
function calculateTotal() {
    if(price.value != ''){
        let getTotal = (+price.value + +taxes.value + +ads.value) - +discout.value
        total.innerHTML = getTotal;
        total.style.backgroundColor = 'green';
    }else {
        total.style.backgroundColor = 'red';
        total.innerHTML = '';
    }
}

//onsubmit
let dataProduct;

if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product);
}else{
    dataProduct = [];
}

//create || update
submit.onclick = function(){
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discout: discout.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if(title.value != '' && category.value != '' && count.value <= 100){
        if(mood === 'create'){
        //count
        if(newProduct.count > 1){
        for(let i = 0; i < newProduct.count; i++){
            dataProduct.push(newProduct)
        }
        }else{
            dataProduct.push(newProduct)
        }
        }else{
            dataProduct[forged] = newProduct;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'inline';
        }
        clearInputs();
    }else{
        alert('Please fill all fields and count must be less than 100')
    }
    

    // save storage
    localStorage.setItem('product', JSON.stringify(dataProduct));
    readProducts();
    calculateTotal();
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
        table +=  
        `<tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discout}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button id="update" onclick={updateProduct(${i})}>update</button></td>
            <td><button onclick={deleteProduct(${i})} id="delete">delete</button></td>
        </tr>`
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

//update
function updateProduct(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discout.value = dataProduct[i].discout;
    calculateTotal();
    category.value = dataProduct[i].category;
    submit.innerHTML = 'update';
    count.style.display = 'none';
    mood = 'update';
    forged = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

//search
let search = 'Title';
let searchbtn = document.getElementById('search');

function getSearchMood(id) {
    if(id === 'searchByTitle'){
        search = 'Title';
    }else{
        search = 'Category';
    }
    searchbtn.placeholder = 'Search By '+ search;
    searchbtn.focus();
    searchbtn.value = '';
    readProducts();
}

function getSearch(value){
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        if(search == 'Title'){
                if (dataProduct[i].title.includes(value.toLowerCase())) {
                    table += 
                    `<tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discout}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button id="update" onclick={updateProduct(${i})}>update</button></td>
                        <td><button onclick={deleteProduct(${i})} id="delete">delete</button></td>
                    </tr>`    
                }
        }else{
                if (dataProduct[i].category.includes(value.toLowerCase())) {
                    table += 
                    `<tr>
                    <td>${i}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discout}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button id="update" onclick={updateProduct(${i})}>update</button></td>
                    <td><button onclick={deleteProduct(${i})} id="delete">delete</button></td>
                </tr>` 
                }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

