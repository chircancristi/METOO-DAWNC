var submitButton = document.querySelector('#submit');
var order=1;
var curentItemId ;
var nextItemId;

function changeItem()
{
    if (order==1) {

        curentItemId ='first';
        nextItemId='second';
     
    }
    if (order==2) {
        curentItemId ="second";
        nextItemId="third";
    }
    if (order==3) {
        curentItemId ="third";
        nextItemId="fourth";
    }
    if (order==4) {
        curentItemId ="fourth";
        nextItemId="fifth";
    }
    if (order==5) {
        curentItemId ="fifth";
    }
    console.log(curentItemId+":before");
    var curentItem=document.querySelector(curentItemId+":before");
    var nextItem=document.getElementById(nextItemId);
    
    console.log(curentItem);
    
    console.log(order);
     
};