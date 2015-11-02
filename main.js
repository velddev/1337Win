// ==UserScript==
// @name         1337Win
// @namespace    http://www.mikeveldsink.nl/1337Win
// @version      1.0.8
// @description  winning!
// @author       You
// @match        http://1337online.com/
// @match        http://mikeveldsink.nl/1337Win.html
// @grant        none
// ==/UserScript==

// Version
var version = "1.0.8";

// Options
var targetDateTime = "13:37:00";
var resetDateTime = "13:38:00";
var pressed = false;
var serverMode = false;

// Create UI
var title = document.createElement("h1");
var titleValue = document.createTextNode("1337Win v" + version);
title.appendChild(titleValue);
document.body.appendChild(title);

var serverDate=document.createElement("p");
var serverDateValue = document.createTextNode(document.getElementById("serverClock").textContent);  
serverDate.appendChild(serverDateValue);
document.body.appendChild(serverDate);  

var targetDate=document.createElement("p");
var targetDateValue = document.createTextNode("target: " + targetDateTime);  
targetDate.appendChild(targetDateValue);
document.body.appendChild(targetDate);  

var inputTextDiv = document.getElementById("name");
var inputText = inputTextDiv.getElementsByTagName("input")[0];
inputText.style.visibility = "hidden";

var sendButtonDiv = document.getElementById("button");
var sendButton = sendButtonDiv.getElementsByTagName("button")[0];
sendButton.style.height = 0;
sendButton.style.width = 0;
sendButton.textContent = "";
sendButton.style.visibility = "hidden";

var optionsTitle = document.createElement("h2");
optionsTitle.textContent = "Options";
document.body.appendChild(optionsTitle);

var nameText = document.createElement("p");
nameText.textContent = "name:";
document.body.appendChild(nameText);

var textfield_name = document.createElement("input");
textfield_name.type = "text";
textfield_name.placeholder = "name";
textfield_name.value = inputText.value;
textfield_name.oninput = function () { inputText.value = textfield_name.value; }
document.body.appendChild(textfield_name);  

var smode = document.createElement("p");
smode.textContent = "server mode:";
document.body.appendChild(smode);

var serverMode=document.createElement("input");
serverMode.type = "checkbox";
document.body.appendChild(serverMode);  

var updateTitle = document.createElement("h2");
updateTitle.textContent = "Updates";
document.body.appendChild(updateTitle);

document.getElementsByTagName("div")[4].remove();

var updateLog = document.createElement("div");
updateLog.class = "updateLog";
updateLog.style.overflowY = "scroll";
updateLog.style.position = "block";
updateLog.style.x = "500px";
updateLog.style.y = "20px";
updateLog.style.maxHeight = "200px";
updateLog.style.maxWidth = "400px";
updateLog.innerHTML = "1.0.8 - added server mode<br>1.0.7 - Optimistions<br>1.0.6 - better UI<br>1.0.5 - optimised API calls<br>1.0.4 - added a automatic reset<br>1.0.3 - automatic reset<br>1.0.2 - automatic pressing<br>1.0.0 - actual release<br><br><br><br><br><br>";

document.body.appendChild(updateLog);  

var tick = setInterval(MainLoop, 0);

// Update
function MainLoop()
{
    var timeString = document.getElementById("serverClock").textContent;
    var seconds = timeString.split(":");
    if(targetDateTime == timeString && !pressed)
    {
        Send();
        sendButton.click();
        pressed = true;
    }
    if(resetDateTime == timeString)
    {
        pressed = false;
    }
    serverDate.textContent = "Current Server Time: " + timeString;  
}

function UpdateText()
{
    inputText.value = textfield_name.value;
}

function Send()
{
 var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  }
  xhttp.open("POST", "action=new&data=" + inputText.value, true);
  xhttp.send();   
}