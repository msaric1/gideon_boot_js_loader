"use strict;"
var planets = [];
var ships = [];
var people = [];
var data = { people, planets, ships };

var numberOfDisplayingCards = 12;

var ratio = Math.ceil(numberOfDisplayingCards / 10);

function createFirstView(iconName, sectionNumber) {

    var section = document.getElementById("section" + sectionNumber);
    if (sectionNumber == "1") {
        numberOfDisplayingCards
            = Math.min(Math.max(parseInt(numberOfDisplayingCards), 1), 87);
        for (i = 0; i < numberOfDisplayingCards
            ; i++) {
            var div = document.createElement("div")
            var icon = document.createElement("i");
            var tbody= document.createElement("tbody");
            var table = document.createElement("table");
            tbody.setAttribute("id", "section_" + sectionNumber + "_tbody_" + i);
            table.setAttribute("id", "section_" + sectionNumber + "_tableNumber_" + i);
            table.className = 'table-condensed table-hover ';
            div.className = "card col-lg-3 col-sm-6 col-md-4 col-12";
            icon.className = "fa " + iconName + " fa-4x";
            div.setAttribute("id", "section_" + sectionNumber + "_icon_" + i);
            div.setAttribute("onmouseenter", "getCardLocation(this)");
            table.appendChild(tbody);
            div.appendChild(icon);
            div.appendChild(table);
            section.appendChild(div);
        }
    }
    else if (sectionNumber == "2") {
        numberOfDisplayingCards
            = Math.min(Math.max(parseInt(numberOfDisplayingCards), 1), 61);
        for (i = 0; i < numberOfDisplayingCards
            ; i++) {
            var div = document.createElement("div")
            var icon = document.createElement("i");
            var tbody= document.createElement("tbody");
            var table = document.createElement("table");
            tbody.setAttribute("id", "section_" + sectionNumber + "_tbody_" + i);
            table.setAttribute("id", "section_" + sectionNumber + "_tableNumber_" + i)
            table.className = 'table-condensed table-hover ';
            div.className = "card col-lg-3 col-sm-6 col-md-4 col-12";
            icon.className = "fa " + iconName + " fa-4x";
            div.setAttribute("id", "section_" + sectionNumber + "_icon_" + i);
            div.setAttribute("onmouseenter", "getCardLocation(this)");
            table.appendChild(tbody);
            div.appendChild(icon);
            div.appendChild(table);
            section.appendChild(div);
        }
    }
    else {
        numberOfDisplayingCards
            = Math.min(Math.max(parseInt(numberOfDisplayingCards), 1), 37);
        for (i = 0; i < numberOfDisplayingCards
            ; i++) {
            var div = document.createElement("div")
            var icon = document.createElement("i");
            var tbody= document.createElement("tbody");
            var table = document.createElement("table");
            tbody.setAttribute("id", "section_" + sectionNumber + "_tbody_" + i);
            table.setAttribute("id", "section_" + sectionNumber + "_tableNumber_" + i)
            table.className = 'table-condensed table-hover ';
            div.className = "card col-lg-3 col-sm-6 col-md-4 col-12";
            div.setAttribute("onmouseenter", "getCardLocation(this)");
            icon.className = "fa " + iconName + " fa-4x";
            div.setAttribute("id", "section_" + sectionNumber + "_icon_" + i);
            table.appendChild(tbody);
            div.appendChild(icon);
            div.appendChild(table);
            section.appendChild(div);
        }
    }
};
createFirstView("fa-user-o", "1");
createFirstView("fa-sun-o", "2");
createFirstView("fa-anchor", "3");



function getCardsData(dataName, pageNumber, sectionNumber, iconName) {
    openModal();

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var cardsData = JSON.parse(this.responseText);
            if (dataName == "people") {
                data.people = data.people.concat(cardsData.results);
                if (data.people.length >= numberOfDisplayingCards ) {


                    var peopleData = getRelatedData(data.people);
                    
                    for (x in peopleData) {
                        getIndexNumber(peopleData[x],peopleData);
                        /*createViewAfterRecievedData("fa-user-o", "1", peopleData);*/
                        for (k in peopleData[x]) {
                            if (k != "url" && k != "created" && k != "edited") { fillTable(peopleData, "1"); }

                        }
                    }
                }

            }
            else if (dataName == "planets") {
                data.planets = data.planets.concat(cardsData.results);
                if (data.planets.length >= numberOfDisplayingCards ) {


                    var planetsData = getRelatedData(data.planets);
                    for (x in planetsData) {
                        /*createViewAfterRecievedData("fa-sun-o", "2", planetsData);*/
                        for (k in planetsData[x]) {
                            if (k != "url" && k != "created" && k != "edited") { fillTable(planetsData, "2"); }
                        }
                    }
                }


            }
            else {
                data.ships = data.ships.concat(cardsData.results);
                if (data.ships.length >= numberOfDisplayingCards ) {


                    var shipsData = getRelatedData(data.ships);
                    for (x in shipsData) {
                       /* createViewAfterRecievedData("fa-anchor", "3", shipsData);*/
                        for (k in shipsData[x]) {
                            if (k != "url" && k != "created" && k != "edited") { fillTable(shipsData, "3"); }
                        }
                    }

                }

                closeModal();
            }

        }
    }
    xmlhttp.open("GET", "https://swapi.co/api/" + dataName + "/?page=" + pageNumber, true);
    xmlhttp.send();
}


for (var i = 1; i < ratio + 1; i++) {
    getCardsData("people", i);
    getCardsData("planets", i);
    getCardsData("starships", i);
}

function getRelatedData(array) {
    var relatedData = array.slice(0, numberOfDisplayingCards);
    return relatedData;
}

function getIndexNumber(singleData, dataName){
    var singleDataIndex=dataName.indexOf(singleData);
 return singleDataIndex;
}

function openModal() {
    document.getElementById('modal').style.display = 'block';

}

function closeModal() {
    document.getElementById('modal').style.display = 'none';

}


function findUrls(dataValue) {
    if (typeof dataValue == "string") {
        return dataValue.search("http");
    }
    else if (typeof dataValue == "object" && typeof dataValue[0] == "string")
        return (dataValue[0].search("http"));
}


    
function fillTable(dataName, sectionNumber,singleData) {
   var y = getIndexNumber(dataName[x], dataName);
    var txtdataNameKeys = document.createTextNode(k.replace(/_/g, " ") + ":");
    var txtdataNameValues = document.createTextNode(dataName[x][k]);
    if (dataName[x][k] == "") { var txtdataNameValues = document.createTextNode(["----"]); }
    if (findUrls(dataName[x][k]) > -1) {
       
        var txtdataNameValues = document.createElement("i");
        txtdataNameValues.className = "fa fa-spinner fa-pulse fa-fw";
         txtdataNameValues.setAttribute("data-type", "spinner");
       

    }

    var tr = document.createElement("tr");
    var td_keys = document.createElement("td")
    var td_values = document.createElement("td")
   
    var tbody = document.getElementById("section_" + sectionNumber + "_tbody_" + y);
    var table = document.getElementById("section_" + sectionNumber + "_tableNumber_" + y);

    tr.appendChild(td_keys);
    td_keys.appendChild(txtdataNameKeys);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    tr.appendChild(td_values);
    td_values.appendChild(txtdataNameValues);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    txtdataNameValues.parentElement.setAttribute("data-name", k);

}




function getCardLocation(card){
    var loc= card.getAttribute("id");
    var section = loc.match(/(.)*_icon_/);
    var sectionNumber= section[1];
    var cardIs = loc.match(/icon(.)*/);
    var cardNumber= cardIs[1];
   var tbody= document.getElementById("section_"+sectionNumber+"_tbody_"+cardNumber);
 for(i=0; i< tbody.children.length; i++){
      var attribute = tbody.children[i].lastChild.firstChild;
      var hasAttribute = attribute.getAttribute("data-type");
             console.log(hasAttribute)

     
 }
              /* if(sectionNumber=="1"){
                   tbody.children[i].lastChild.firstChild.innerText="" 
                   replaceSpinner(data.people,cardIs[1],tbody.children[i].lastChild.getAttribute("data-name"),tbody.children[i]);
               }
               else if (sectionNumber=="2"){
                   tbody.children[i].lastChild.firstChild.innerText="" 
                   replaceSpinner(data.planets,cardIs[1],tbody.children[i].lastChild.getAttribute("data-name"),tbody.children[i]);
               }
               else{
                   tbody.children[i].lastChild.firstChild.innerText="" 
                   replaceSpinner(data.ships,cardIs[1],tbody.children[i].lastChild.getAttribute("data-name"),tbody.children[i]);
               } 
           }*/
     
   
}


   function replaceSpinner(dataName,cardNumber,spinnerAtribute,trows){
for(i=0; i<dataName.length;i++){
     if (dataName[i] == cardNumber) {
    if( typeof dataName[i][spinnerAtribute]=="string"){
         var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var dataResults = JSON.parse(this.responseText);
                        if (dataResults.name) {
                            trows.lastChild.innerText="" 
                            var para = document.createElement("p");
                            var textNode = document.createTextNode(dataResults.name);
                            para.appendChild(textNode);
                            para.style.margin = "2px 0px"
                            tbody.children[i].lastChild.appendChild(para);
                        }
                        else {
                          
                            trows.lastChild.innerText="" 
                            var para = document.createElement("p");
                            var textNode = document.createTextNode(dataResults.title);
                            para.appendChild(textNode);
                            para.style.margin = "2px 0px"
                            tbody.children[i].lastChild.appendChild(para);
                        }
                    }
                };

                xhttp.open("GET", dataName[i][spinnerAtribute], true);
                xhttp.send();
            }
 else { 
                var urls = dataName[i][spinnerAtribute];
                tbody.children[i].lastChild.innerText = "";
                for (j = 0; j < urls.length; j++) {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            var dataResults = JSON.parse(this.responseText);
                            if (dataResults.name) {
                                var para = document.createElement("p");
                                var textNode = document.createTextNode(dataResults.name);
                                para.appendChild(textNode);
                                tbody.children[i].lastChild.appendChild(para);
                              
                            }
                            else {
                                var para = document.createElement("p");
                                var textNode = document.createTextNode(dataResults.title);
                                para.appendChild(textNode);
                                tbody.children[i].lastChild.appendChild(para);
                              
                            }
                        }
                    };

                    xhttp.open("GET", urls[j], true);
                    xhttp.send();
                }
 }   
        }
    }

}
   
  




            
                /*    console.log(tbody.children[1].lastChild.firstChild)
             console.log(tbody.children[2].lastChild.firstChild)
             console.log(tbody.children[3].lastChild.firstChild)
             console.log(tbody.children[4].lastChild.firstChild)
             console.log(tbody.children[5].lastChild.firstChild)
             console.log(tbody.children[6].lastChild.firstChild)
             console.log(tbody.children[7].lastChild.firstChild)
             console.log(tbody.children[8].lastChild.firstChild)
             console.log(tbody.children[9].lastChild.firstChild)
             console.log(tbody.children[10].lastChild.firstChild)
             console.log(tbody.children[11].lastChild.firstChild)
             console.log(tbody.children[12].lastChild.firstChild)*/
        /* var spinnerPlace=tbody.children[i].lastChild.firstChild;
          var atributes= tbody.children[i].lastChild.getAttribute("data-name");
          var trows= tbody.children[i];*/
          /*tbody.children[i].lastChild.innerText=""    */  
            
             
    


















/*
function createViewAfterRecievedData(iconName, sectionNumber, dataName) {

    var section = document.getElementById("section" + sectionNumber);
    if (sectionNumber == "1") {
        numberOfDisplayingCards
            = Math.min(Math.max(parseInt(numberOfDisplayingCards), 1), 87);
       var y = getIndexNumber(dataName[x], dataName);
        var div = document.createElement("div")
        var icon = document.createElement("i");
        var table = document.createElement("table");
        table.setAttribute("id", "section_" + sectionNumber + "_tableNumber_" + y)
        table.className = 'table-condensed table-hover ';
        div.className = "card col-lg-3 col-sm-6 col-md-4 col-12";
        icon.className = "fa " + iconName + " fa-4x";
        div.setAttribute("id", "section_" + sectionNumber + "_icon_" + y);
        div.setAttribute("onmouseenter", "getCardLocation(this)");
        div.appendChild(icon);
        div.appendChild(table);
        section.appendChild(div);

    }
    else if (sectionNumber == "2") {
        numberOfDisplayingCards
            = Math.min(Math.max(parseInt(numberOfDisplayingCards), 1), 61);
        var y = getIndexNumber(dataName[x], dataName);


        var div = document.createElement("div")
        var icon = document.createElement("i");
        var table = document.createElement("table");
        table.setAttribute("id", "section_" + sectionNumber + "_tableNumber_" + y)
        table.className = 'table-condensed  table-hover ';
        div.className = "card col-lg-3 col-sm-6 col-md-4 col-12";
        icon.className = "fa " + iconName + " fa-4x";
        div.setAttribute("id", "section_" + sectionNumber + "_icon_" + y);
        div.setAttribute("onmouseenter", "getCardLocation(this)");
        div.appendChild(icon);
        div.appendChild(table);
        section.appendChild(div);

    }
    else {
        numberOfDisplayingCards
            = Math.min(Math.max(parseInt(numberOfDisplayingCards), 1), 37);

        var y = getIndexNumber(dataName[x], dataName);
        var div = document.createElement("div")
        var icon = document.createElement("i");
        var table = document.createElement("table");
        table.setAttribute("id", "section_" + sectionNumber + "_tableNumber_" + y)
        table.className = 'table-condensed table-hover ';
        div.className = "card col-lg-3 col-sm-6 col-md-4 col-12";
        icon.className = "fa " + iconName + " fa-4x";
        div.setAttribute("id", "section_" + sectionNumber + "_icon_" + y);
        div.setAttribute("onmouseenter", "getCardLocation(this)");
        div.appendChild(icon);
        div.appendChild(table);
        section.appendChild(div);

    }
}*/