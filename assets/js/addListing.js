const submitButton = document.querySelector('#submit');
let order = 1;
let curentItemId ;
let nextItemId;
const blue = "hsla(204, 70%, 53%, 0.9)";
// var styling=class{
//     applyStyle(elementToBeStyled,translate,opacity){
//         elementToBeStyled.style.transform=translate;
//         elementToBeStyled.style.opacity=opacity;  
//     }
// }

function changeItem() {

    if (order===1) {
        curentItemId ='first';
        nextItemId='second';
    }

    if (order===2) {
        curentItemId ="second";
        nextItemId="third";
    }
    
    if (order===3) {
        curentItemId ="third";
        nextItemId="fourth";
    }

    if (order===4) {
        curentItemId ="fourth";
        nextItemId="fifth";
    }

    if (order===5) {
        curentItemId ="fifth";
    }

    // let style=new styling();

    let nextItemSpanSelector = "#" + nextItemId + " span";
    let nextLine = document.getElementById(nextItemId);
    document.querySelector(nextItemSpanSelector).style.backgroundColor = blue;
    nextLine.style.color = blue;

    let nextSection = document.getElementById(nextItemId + "Question");
    let currentSection = document.getElementById(curentItemId + "Question");

    // style.applyStyle(currentSection,"translateY(-80em)",0)
    // style.applyStyle(nextSection,"translateY(0em)",1)

    // currentSection.style.transform = "translateY(-100%)";
    // currentSection.style.opacity = 0;

    // nextSection.style.transform = "translateY(0)";
    // nextSection.style.opacity = 1;

    currentSection.classList.toggle('hidden');
    nextSection.classList.toggle('is-visible');
    nextSection.classList.toggle('hidden');
    
    
    order = order + 1;
};