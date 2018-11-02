const submitButton = document.querySelector('#submit');
let order = 1;
let curentItemId ;
let nextItemId;
const blue = "hsl(28, 80%, 50%)";
const slider = document.getElementById("js-slider");
function changeQuestion(target,type) {

    // if (target.id==="reset"){
    //     if (type==="study") {
    //         slider.classList.toggle('move-left');
    //    }
    //    if (type==="implement") {
    //         slider.classList.toggle('move-right');
    //    }

    // }
    if (order===1) {
        curentItemId =type+'-first';
        nextItemId=type+'-second';
    }

    if (order===2) {
        curentItemId =type+"-second";
        nextItemId=type+"-third";
        if(target.id==="back"){
            nextItemId=type+"-first";
        }
    }
    
    if (order===3) {
        curentItemId =type+"-third";
        nextItemId=type+"-fourth";
        if(target.id==="back"){
            nextItemId=type+"-second";
        }
    }

    if (order===4) {
        curentItemId =type+"-fourth";
        nextItemId=type+"-fifth";
        if(target.id==="back"){
            nextItemId=type+"-third";
        }
    }

    if (order===5) {
        curentItemId =type+"-fifth";
        nextItemId = type +"-sixth";
        if(target.id==="back"){
            nextItemId=type+"-fourth";
        }
    }
    if (target.id==="next"){
    let nextItemSpanSelector = "#" + nextItemId + " span";
    let nextLine = document.getElementById(nextItemId);
    document.querySelector(nextItemSpanSelector).style.backgroundColor = blue;
    nextLine.style.color = blue;

    let nextSection = document.getElementById(nextItemId + "Question");
    let currentSection = document.getElementById(curentItemId + "Question");

    currentSection.classList.toggle('hidden');
    nextSection.classList.toggle('is-visible');
    nextSection.classList.toggle('hidden');

    order = order + 1;
    }
    if (target.id==="back"){
        if(order===1){
            if (type==="study") {
                slider.classList.toggle('move-left');
           }
           if (type==="implement") {
                slider.classList.toggle('move-right');
           }
        }
        else{
            let curentItemSpanSelector = "#" + curentItemId + " span";
            let curentLine = document.getElementById(curentItemId);
            document.querySelector(curentItemSpanSelector).style.backgroundColor = "hsl(204, 8%, 76%)";
            curentLine.style.color = "hsl(204, 8%, 76%)";
        
            let nextSection = document.getElementById(nextItemId + "Question");
            let currentSection = document.getElementById(curentItemId + "Question");
        
            currentSection.classList.toggle('hidden');
            nextSection.classList.toggle('is-visible');
            nextSection.classList.toggle('hidden');
            order= order-1;

        }
    }

};

document.getElementById("js-listing-type").addEventListener("click", (e) => {
   sliderMove(e.target);
} );

document.getElementById("js-listing-implement").addEventListener("click", (e) => {
    changeQuestion(e.target, "implement");
} );

 document.getElementById("js-listing-study").addEventListener("click", (e) => {
    changeQuestion(e.target, "study");
});

function sliderMove ( target ) {
   if (target.id === "js-study") {
        slider.classList.toggle('move-right');
   }
   if (target.id === "js-implement") {
        slider.classList.toggle('move-left');
   }

   order = 1;
}