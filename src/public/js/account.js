
let xmlhttp = new XMLHttpRequest();
let displayName= document.getElementById("nameJS");
let profilePic= document.getElementById("profilePicJS");
let likes=document.getElementById("likesJS");
let dislikes=document.getElementById("dislikesJS");

var data = JSON.stringify({ 'username': username });

xmlhttp.open("POST", "userInformation", true);
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.send(data);

xmlhttp.onreadystatechange = function() { 
    if (xmlhttp.readyState == 4)
        if (xmlhttp.status == 200){
            
            let json_data = JSON.parse(xmlhttp.responseText); 
            console.log(json_data);
            console.log(json_data.fullName);
            displayName.innerHTML=json_data.fullName;
            profilePic.src=json_data.imgUrl;
            likes.innerHTML=json_data.likes;
            dislikes.innerHTML=json_data.dislikes;
            
        }
  };