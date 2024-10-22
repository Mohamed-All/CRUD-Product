let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create'
let temp; //  متغير وهمي

   // console.log(title, price, taxes,ads, discount, total, count, category, submit);

// get total


function getTotal() {
    // console.log("hello world")
    if (price.value != ""){
       let result= (Number(price.value) + Number(taxes.value) + Number(ads.value)) - discount.value
       total.innerHTML = `${result} $`
       total.style.backgroundColor = "orange";
    }
    else {
        total.style.backgroundColor = "blue";

    }
    
}
// create product

let dataPro = [];

if (localStorage.dataPro != null) {
    dataPro = JSON.parse(localStorage.dataPro)
    showData()
} 
else{
    dataPro = [];
}
submit.addEventListener('click', function(){
       let newPro = {
        title: title.value.toUpperCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toUpperCase()
       }
    if (title.value != '' &&
        count.value <20 &&
        price.value !="" && 
        category.value != ''){
        if ( mood === 'create'){
            if (newPro.count > 1){
                for(let i = 0; i < newPro.count; i++){
                    dataPro.push(newPro)
                }
            }else {
                dataPro.push(newPro)
            }}
        else { // can not use I from another function so we use fake variable "temp" by declaring it in global and then letting it take value from function updateItem line 156
            dataPro[temp] = newPro
            mood = "create"
            submit.innerHTML = "create"
            count.style.display = 'unset'
        }
        clearData()
    }       

    // *save localstorge
    localStorage.setItem('dataPro',JSON.stringify(dataPro) );   
    showData()
    //    console.log(dataPro);
})

// clear inputs 
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// *read
function showData() {
    getTotal()
    let table = ""
    for (let i = 0; i < dataPro.length; i++) {
        table += `
                <tr>
                    <td>${[i+1]}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <th>${dataPro[i].total}</th>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateItem(${i})" id="update">update</button></td>
                    <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
                </tr>
        `
        // console.log(table)
        
    }
     document.getElementById('table').innerHTML = table;

     //delete all
     let deleteAll = document.getElementById("deleteAll")
     if (dataPro.length > 0) {
        deleteAll.innerHTML = `
        <button onclick="deleteAll()" >delete All (${dataPro.length})</button>
        `
     }else{
        deleteAll.innerHTML = ''
     }

}
// *delete and delete all

function deleteItem(i) {
    dataPro.splice(i, 1); // 1= number of items
    localStorage.dataPro = JSON.stringify(dataPro);
    console.log(i)
    showData()
}

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData()
}
// *count => it happend in line 58-64 by using for loop

//*update 

        // return data to form
function updateItem(i) {
    // console.log(i)
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = "none" ;
    category.value = dataPro[i].category;
    submit.innerHTML ='update';
    mood = 'update';
    temp =i;
    scroll({
        top :0,
        behavior: 'smooth',
    })
    
}


// *search
let searchMood = 'title'; 
let search = document.getElementById("search")
function getSearchMood (id){
//  console.log(id)

    if (id == "searchTitle"){
        searchMood = 'title';
        // search.setAttribute("placeholder", "search by title")
        search.placeholder = "search by title";
    }
    else{
        searchMood = 'category';
        search.setAttribute("placeholder", "search by category")
    }
    search.focus()
    search.value = '';
    showData();
    // console.log(searchMood)
}
function searchData(value){
    let table ='';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == "title"){
        
            if (dataPro[i].title.includes(value.toUpperCase())){
                table += `
                <tr>
                    <td>${[i]}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <th>${dataPro[i].total}</th>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateItem(${i})" id="update">update</button></td>
                    <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
                </tr>
        `
    }}
        else {
    
        if (dataPro[i].category.includes(value.toUpperCase())){
            table += `
            <tr>
                <td>${[i]}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <th>${dataPro[i].total}</th>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateItem(${i})" id="update">update</button></td>
                <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
            </tr>
    `
}}}
    document.getElementById('table').innerHTML = table;
} 

// *clean the data => it happened above by don't let the user enter empty data in line 56-59