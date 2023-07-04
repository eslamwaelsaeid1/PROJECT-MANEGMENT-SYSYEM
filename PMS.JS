let title     =document.getElementById('title')
let price     =document.getElementById('price')
let taxes     =document.getElementById('taxes')
let ads       =document.getElementById('ads')
let discount  =document.getElementById('discount')
let total     =document.getElementById('total')
let count     =document.getElementById('count')
let category  =document.getElementById('category')
let create    =document.getElementById('create')
//console.log(title,price,taxes,ads,discount,total,count,category,create)

let mood = 'create';//(update)
let tmp;       //ده متغير جلوبال هنستخدمو فى الابديت لان معرفناش نحط .. فالسطر55

//get total
function gettotal()
{
    if(price.value != ''){
        let result= (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.background = 'green';
    }
    else{
        total.innerHTML = '';
        total.style.background='rgb(154, 9, 9)';
    }
}

//create product
//save in local storage

let dataproduct = [];

if(localStorage.product != null)
  {dataproduct = JSON.parse(localStorage.product)
}else{ dataproduct = [] }

create.onclick = function()
{
  let newproduct = {
    title:title.value,
     price:price.value, taxes:taxes.value,
    ads:ads.value , discount:discount.value,
    total:total.innerHTML,
    count:count.value, 
    category:category.value,
  }
  if(title.value != '' && price.value != '' && newproduct.count<=100){ //(clean data)
//(update)
if(mood ==='create'){
//(count)
if(newproduct.count>1)
{
  for(let i=0; i<newproduct.count; i++)
  {dataproduct.push(newproduct)}
}else{dataproduct.push(newproduct);}
//
}else{dataproduct[tmp] = newproduct; 
  mood='create'; create.innerHTML = 'create'; count.style.display='block'}
//
clear() //clean data  //حطتها هنا بؤل تحت عشان اقلو متمسح البيانات الا لو اتعمل منتج جديد
                      }  //clean data
  //dataproduct.push(newproduct); 
  localStorage.setItem('product' , JSON.stringify(dataproduct) )
  
  //clear()  //اول متضغط على زرارcreateشغل الداله ده الى وظيفتها المسح
  showdata()
}

//clear inputs after click on create
function clear(){
title.value=''; price.value=''; taxes.value=''; ads.value=''; discount.value='';
total.innerHTML=''; count.value=''; category.value='';
}

//read
function showdata() //جيب بيانات الاراى وحطها فمتغير اسمو table
{
  gettotal()

    let table = '';
    for(let i=0; i<dataproduct.length; i++){
     table += `
     <tr>
     <td>${i+1}</td>  <td>${dataproduct[i].title}</td>  <td>${dataproduct[i].price}</td>  <td>${dataproduct[i].taxes}</td> <td>${dataproduct[i].ads}</td> <td>${dataproduct[i].discount}</td> <td>${dataproduct[i].total}</td> <td>${dataproduct[i].category}</td> 
     <td><button id="update" onclick='updatedata(${i})' >update</button></td> 
     <td><button id="delete" onclick='deleteproduct(${i})'>delete</button></td>
     </tr>`
    }
    document.getElementById('tbody').innerHTML = table;

  //deleteall
    let btndelete = document.getElementById('deleteall');
    if(dataproduct.length>0){  //لو فى بيانات فى المكان ده حطلى زرار
     btndelete.innerHTML = `<button id="styledeleteall"  onclick='deleteall()' >DELETE ALL(${dataproduct.length})</button>`
    }
    else{btndelete.innerHTML ='';}

}
showdata()

//delete
function deleteproduct(i)
{
    dataproduct.splice(i,1); //هيمسح عنصر واحد بس من الاراى بس
    localStorage.product = JSON.stringify(dataproduct);
    showdata()              //عشان يحدث بعد المسح فيظهر انو اتمسح من غير ريلود
}

//delete all
//at 78


//count  //add 50 product by one click
//at 44 
function deleteall(){
  localStorage.clear()
  dataproduct.splice(0) //امسح من الصفر لحد ما لا نهايه
  showdata()
 }

//update/edit
function updatedata(i){
  title.value = dataproduct[i].title; price.value=dataproduct[i].price;
  taxes.value =dataproduct[i] .taxes; ads.value=dataproduct[i].ads;
  discount.value=dataproduct[i].discount; 
gettotal()                      //لازم تستدعيها لان من غيرها مش هيحسبلك التوتال لان البينات اترفعت انت مكتبتهاش بمعنى انك معملتشonclick

count.style.display = 'none';   //مش عايز المربع ده
category.value=dataproduct[i].category;
create.innerHTML='UPDATE';      //غثر كلمه انشاء وخليها تحديث

mood = 'update';            // at 12 and 46

tmp=i; //at 55

scroll( {top:0 , behavior:'smooth' })//اول مدوس تحديث ارفع الاسكرول لفوق ببطء
}

//search
let searchmood = 'title';
        let search= document.getElementById('search')

function getsearchmood(id)
{
  if(id == 'searchbytitle')
  {searchmood='title'; }
  else{searchmood='category';}
  search.placeholder='search by '+searchmood;
        search.focus()

  search.value = ''; showdata();  //لو انا ضغط على زرار وكتبت عشان اعمل سيرش لما اضغط عالزرار التانى الغى الكتابه واعمل سيرش جديد
}


function searchdata(value) //ختشتغل لما تكتب فالسيرش,اى حاجه اكتبها تلروح للداله ده
{
  let table='';
if(searchmood == 'title')
{
  for(let i=0; i<dataproduct.length; i++)
  {if(dataproduct[i].title.toLowerCase(). includes(value.toLowerCase()))
    {table += `
    <tr>
    <td>${i+1}</td>  <td>${dataproduct[i].title}</td>  <td>${dataproduct[i].price}</td>  <td>${dataproduct[i].taxes}</td> <td>${dataproduct[i].ads}</td> <td>${dataproduct[i].discount}</td> <td>${dataproduct[i].total}</td> <td>${dataproduct[i].category}</td> 
    <td><button id="update" onclick='updatedata(${i})' >update</button></td> 
    <td><button id="delete" onclick='deleteproduct(${i})'>delete</button></td>
    </tr>`}
  }

} else
  {
    for(let i=0; i<dataproduct.length; i++)
    {if(dataproduct[i].category.toLowerCase() .includes(value.toLowerCase()))
      {table += `
      <tr>
      <td>${i+1}</td>  <td>${dataproduct[i].title}</td>  <td>${dataproduct[i].price}</td>  <td>${dataproduct[i].taxes}</td> <td>${dataproduct[i].ads}</td> <td>${dataproduct[i].discount}</td> <td>${dataproduct[i].total}</td> <td>${dataproduct[i].category}</td> 
      <td><button id="update" onclick='updatedata(${i})' >update</button></td> 
      <td><button id="delete" onclick='deleteproduct(${i})'>delete</button></td>
      </tr>`}
    }
  }
  document.getElementById('tbody').innerHTML = table;
}
//الاتنين لوب خليهم لوب واحده لان المبرمج الشاطر هو الى عدد سطور الكود بتاعتو اقل

//clean data











