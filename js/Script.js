// 接資料
let data = [];
let dist = [];
var select =document.querySelector('.Selection');
var area=[];
var selectarea = '';
var selectarr =[];
var pagenum = 1;
var totalnum = 0;
const contentnum = 6;
var list =document.querySelector('.List');
var page =document.querySelector('.page');
var title=document.querySelector('.HotTitle');

//接資料
var xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
xhr.send(null);
xhr.onload = function (){
    var list = JSON.parse(xhr.responseText);
    var len = list.result.records.length;

    for (var i = 0; i<len;i++){
        data.push(list.result.records[i]);
        dist.push(list.result.records[i].Zone);
    }
    //製作選單
    `<option disabled selected>- - 請選擇行政區- -</option>`;
    var str='<option value="--請選擇行政區--" disabled selected>--請選擇行政區--</option>';
    dist.forEach(function filterdist(item,index,array){   
        if (array.indexOf(item) == index){
            str += `<option value="${item}">${item}</option>`;
            area.push = item;
             }
        }
    );
    select.innerHTML=str;
    filter('苓雅區');//一開始就先指定一個區域
}
//監聽被選到的地區
function chooseselection(e){
    e.preventDefault();
    selectarea = e.target.value;
    if (e.target.nodeName == "A"){selectarea = e.target.textContent;}
    filter(selectarea);
}

//function(從陣列篩選地區,更新地區的時候才會用到)
function filter(selectarea){
    let i =0;
    selectarr=[];
    data.forEach(function(item,index,array){
        if (selectarea==item.Zone){
            selectarr.push(i);}
        i++;
    });
    totalnum = Math.ceil(selectarr.length/6);
    showpage(totalnum);
    Showlist(selectarea,selectarr,0);
}
//update info(更新圖片/資料顯示)
function Showlist(Selection,arr,pagenum) {
    var str =`<p class="Selection_result">${Selection}</p>`;
    let i =contentnum*pagenum;
    for (i ; i<contentnum*(pagenum+1);i++){
        x=arr[i];
            str +=
            `<ul>
                <li class="upperli">
                    <img class="piture1" src= ${data[x].Picture1}>
                    <li class="upperli_Name">${data[x].Name}</li>
                    <li class="upperli_Tag">${data[x].Zone}</li>
                </li>
                <li class="lowerli">
                    <p class="Opentime"><img src="css/assets/icons_clock.png">${data[x].Opentime}</p>
                    <p class="Add"><img src="css/assets/icons_pin.png">${data[x].Add}</p>
                    <p class="Tel"><img src="css/assets/icons_phone.png">${data[x].Tel}</p>    
                    <p class="Ticketinfo"><img src="css/assets/icons_tag.png">${data[x].Ticketinfo=='' ? '無票價資料': data[x].Ticketinfo}</p>
                </li>
            </ul>`
        if (i>= arr.length-1) { i = contentnum*(pagenum+1);}
            }
        list.innerHTML= str;
}

 //換算頁數即顯示頁數
function showpage(num){
    var content = '';
    if (num >1){
        for (var i =0;i<num;i++){content +=`<li><a href="">${i+1}</a></li>`}
         content =`<ul><li><a href=""><</a></li>`+content+ `<li><a href="">></a></li></ul>`;
    }
    page.innerHTML = content;
}
//監聽變化及換頁
function changepage(e) {
    e.preventDefault();
    switch (e.target.textContent){
        case '>':
            if(pagenum < totalnum){pagenum = pagenum+1;}
                break;
        case '<':
            if (pagenum > 1){pagenum = pagenum-1;}
            break;
        default:
            pagenum = Number(e.target.textContent);    
    }
    Showlist(selectarea,selectarr,pagenum-1);
}
    //給他什麼函示，然後n-1，第一頁或最後一夜就不能顯示<>

select.addEventListener('change',chooseselection,false);
page.addEventListener('click',changepage,false);
title.addEventListener('click',chooseselection,false);