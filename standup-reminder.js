// ==UserScript==
// @name         standup-reminder
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  a chrome userscript which remind you stand up ten minutes after sit an hour acting on google calendar use Tampermonkey
// @author       EricDeng
// @match        https://calendar.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // creat element
    var gb = document.getElementById("gb");
    var nav = gb.getElementsByTagName("div")[0];
    var stateDisplay = document.createElement("p");
    stateDisplay.style.marginLeft = "20px";
    stateDisplay.style.marginRight = "20px";
    stateDisplay.style.fontSize = "15px";
    stateDisplay.style.color="#6d6d6d";
    nav.appendChild(stateDisplay);

    // timing event control
    var confirmState;
    var stand = "Time to Stand Up!";
    var sit = "Time to Sit Down!";
    var standTimer;
    var sitTimer;
    var second = 1000;
    var standTenMinutes = second*60*10;
    var sitOneHour = standTenMinutes*6;
    var time;

    function standUp(){
        time = new Date();
        time = time.toLocaleString();
        alert(stand+"\n"+time);
        stateDisplay.innerHTML=stand+" "+time;
        standTimer = setTimeout(sitDown, standTenMinutes);
    }

    function sitDown(){
        time = new Date();
        time = time.toLocaleString();
        alert(sit+"\n"+time);
        stateDisplay.innerHTML=sit+" "+time;
        sitTimer = setTimeout(standUp, sitOneHour);
    }

    confirmState = confirm("stand up remind?");
    if (confirmState){
        sitDown();
    }

})();
