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

    nextLine=document.getElementById(nextItemId);
    document.querySelector("#"+nextItemId+" span").style.backgroundColor = "hsla(204, 70%, 53%, 0.9)";
    nextLine.style.color="hsla(204, 70%, 53%, 0.9)";

    nextSection=document.getElementById(nextItemId+"Question");
    currentSection=document.getElementById(curentItemId+"Question");

    currentSection.style.transform="translateY(-30em)";
    currentSection.style.opacity=0;
    
    nextSection.style.transform="translateY(0em)";
    nextSection.style.opacity=1;
  
 
  
    order=order+1;
};