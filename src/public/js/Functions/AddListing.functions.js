import * as login from "../Functions/Login.functions.js"
import * as requests from "../Functions/Requests.functions.js"
let listingType = ""
let listingName = ""
let listingLocation = ""
let listingConcept = ""
let listingShortDescription = ""
let listingSkills = []


export function sliderMove(target) {
    if (target.id === "js-study") {
        slider.classList.toggle('move-right');
    }
    if (target.id === "js-implement") {
        slider.classList.toggle('move-left');
    }

    order = 1;
}

const submitButton = document.querySelector('#submit');
let order = 1;
let curentItemId;
let nextItemId;
const blue = "hsl(28, 80%, 50%)";
const slider = document.getElementById("js-slider");
export function changeQuestion(target, type) {

    // if (target.id==="reset"){
    //     if (type==="study") {
    //         slider.classList.toggle('move-left');
    //    }
    //    if (type==="implement") {
    //         slider.classList.toggle('move-right');
    //    }

    // }
    if (order === 1) {
        curentItemId = type + '-first';
        nextItemId = type + '-second';
    }

    if (order === 2) {
        curentItemId = type + "-second";
        nextItemId = type + "-third";
        if (target.id === "back") {
            nextItemId = type + "-first";
        }
    }

    if (order === 3) {
        curentItemId = type + "-third";
        nextItemId = type + "-fourth";
        if (target.id === "back") {
            nextItemId = type + "-second";
        }
    }

    if (order === 4) {
        curentItemId = type + "-fourth";
        nextItemId = type + "-fifth";
        if (target.id === "back") {
            nextItemId = type + "-third";
        }
    }

    if (order === 5) {
        curentItemId = type + "-fifth";
        nextItemId = type + "-sixth";
        if (target.id === "back") {
            nextItemId = type + "-fourth";
        }
    }
    if (target.id === "next") {
    
           
        if (target.value === "title") {
            if (listingType === "implement") {
                if (document.getElementById("js-input-title-implement").value=="")
                {
                    alert("Please Fill All Required Field");
                    return false;
    
                }
                listingName = document.getElementById("js-input-title-implement").value
                
            }
            if (listingType === "study") {
                if (document.getElementById("js-input-title-study").value=="")
                {
                    alert("Please Fill All Required Field");
                    return false;
    
                }
                listingName = document.getElementById("js-input-title-study").value                
            }           
        }
        if (target.value === "place") {
            if (listingType === "implement") {
               
                let dropDownElement = document.getElementById("js-input-place-implement")
                listingLocation = dropDownElement.options[dropDownElement.selectedIndex].value;
            }
            if (listingType === "study") {
               
                let dropDownElement = document.getElementById("js-input-place-study")
                listingLocation = dropDownElement.options[dropDownElement.selectedIndex].value;
            }           
        }
        if (target.value === "concept"){
            if (listingType === "implement") {
                if (document.getElementById("js-input-concept-implement").value=="")
                {
                    alert("Please Fill All Required Field");
                    return false;
    
                }
                listingConcept= document.getElementById("js-input-concept-implement").value
                
            }
            if (listingType === "study") {
                if (document.getElementById("js-input-concept-study").value=="")
                {
                    alert("Please Fill All Required Field");
                    return false;
    
                }
                listingConcept = document.getElementById("js-input-concept-study").value
                
            }    
        }
        if (target.value === "description"){
            if (listingType === "implement") {
                if (document.getElementById("js-input-description-implement").value=="")
                {
                    alert("Please Fill All Required Field");
                    return false;
    
                }
                listingShortDescription= document.getElementById("js-input-description-implement").value
                
            }
            if (listingType === "study") {
                if (document.getElementById("js-input-description-study").value=="")
                {
                    alert("Please Fill All Required Field");
                    return false;
    
                }
                listingShortDescription = document.getElementById("js-input-description-study").value
                
            }  
        }
        if (target.value==="skills"){
            if (listingType === "implement") {
                if (document.getElementById("js-input-skills-implement").value=="")
                {
                    alert("Please Fill All Required Field");
                    return false;
    
                }
                listingSkills = document.getElementById("js-input-skills-implement").value.split(" ");
                
            }
            if (listingType === "study") {
                if (document.getElementById("js-input-skills-study").value=="")
                {
                    alert("Please Fill All Required Field");
                    return false;
    
                }
                listingSkills = document.getElementById("js-input-skills-study").value.split(" ");
                
            }  
           
            let username=login.getCookie("username");
            console.log(username);
            let data={
                author : username,
                type : listingType,
                title : listingName,
                description: listingShortDescription,
                skills : listingSkills,
                place : listingLocation,
                concept:listingConcept
            }
            requests.postDataToServer("addListing",data);

            document.location.href = "/browse-listings.html";
            
        }
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
    if (target.id === "back") {
        if (order === 1) {
            if (type === "study") {
                slider.classList.toggle('move-left');
            }
            if (type === "implement") {
                slider.classList.toggle('move-right');
            }
        }
        else {
            let curentItemSpanSelector = "#" + curentItemId + " span";
            let curentLine = document.getElementById(curentItemId);
            document.querySelector(curentItemSpanSelector).style.backgroundColor = "hsl(204, 8%, 76%)";
            curentLine.style.color = "hsl(204, 8%, 76%)";

            let nextSection = document.getElementById(nextItemId + "Question");
            let currentSection = document.getElementById(curentItemId + "Question");

            currentSection.classList.toggle('hidden');
            nextSection.classList.toggle('is-visible');
            nextSection.classList.toggle('hidden');
            order = order - 1;

        }
    }

};
export function setType(type) {
    listingType = type;

}