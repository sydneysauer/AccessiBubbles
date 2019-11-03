$(document).ready(function(){
    $('.utility-selector').on('click',function(){
        console.log($(this).val())
        var value=$(this).val();
        var queryString = "?para1="+ value;
        window.location.href = "dashboard.html" + queryString;
         $('#dashboardVal').text(value);

      })
});


// variables that map element ID to user-friendly strings
var energyIDs = ["electricity", "cold-water", "hot-water", "steam"]
var energyTypes = ["Electricity", "Cold Water", "Hot Water", "Steam"];

//Fill the energy value by parsing queryString
function fillContentType() {
    //Get energy type from url
    console.log(queryString);
    var queryString = decodeURIComponent(window.location.search); //parsing
    queryString = queryString.substring(1);
    var queries = queryString.split("=");
    var energy = queries[1];
    var i = energyIDs.indexOf(energy);
    energy = energyTypes[i];

    // Change header to say what is being viewed 
    var viewing = "VIEWING DATA FOR: ";
    document.getElementById("data-view").innerHTML = viewing + energy;

    //Change unit text (kWh or BTU)
    var unitInfo = "";
    var unit = ""
    if (energy=="electricity") {
        unit = "kWh";
        unitInfo = "Scientifically speaking, one kWh (kilowatt hour) is equal to the power necesary to use a thousand watts of energy for an hour. In the real world, think of a kilowatt hour as the amount of energy needed to run a lightbulb all day.";
    }
    else {
        unit = "BTU";
        unitInfo = "Scientifically speaking, one BTU (British Thermal Unit) is the amount of energy needed to raise a pound of water by one degree Farenheit. In the real world, think of one BTU as the energy released when you burn a match.";
    }
    console.log(unitInfo);
    document.getElementById("unit").innerHTML = "WHAT DOES " + unit + " MEAN?";
    document.getElementById("unitInfo").innerHTML = unitInfo;

}   

/*
function fillHeader() {
    console.log("Page loaded");

    // Get the selection data from index.html
    var queryString = decodeURIComponent(window.location.search); //parsing
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    var viewing = "VIEWING DATA FOR: ";
    var components = "";

    // Iterate through the queried elements, delete metadata, and print to dashboard.html
    for (var i = 0; i < queries.length; i++)
    {
        var splitQuery = queries[i].split("=");
        var toPrint = splitQuery[1];
        if (toPrint == "See All") {

        }
        else {
            if (i == 0) {
                components = toPrint;
            }
            else {
                components = components + " & " + toPrint;
            }
        }
    }   
    if (components.length == 0) {
        components = "All";
    }
    document.getElementById("data-view").innerHTML = viewing + components;
}
*/

/*
function getSearchCriteria() {
    var dropdownMenu = document.getElementById("search-criteria");
    var searchCriteria = dropdownMenu.options[dropdownMenu.selectedIndex].text;
    if (searchCriteria == "energy-type") {
        document.getElementById("energy-choice-label").style.display = "block";
        document.getElementById("energy-choice").style.display = "block";
    }
    else {
        document.getElementById("building-choice-label").style.display = "block";
        document.getElementById("building-choice").style.display = "block";
    }

    document.getElementById("next-button").style.display = "none";
    document.getElementById("submit-button").style.display = "block";
}
*/

/*
function getSubmitValues() {
    // GETTING VALUES AT CLICK INSTANT 
    //var energy = document.getElementById(this.id).text;

    // ERROR MANAGEMENT 
    console.log("Energy is ", energy);
    var queryString = "?para1="+ energy;
    window.location.href = "dashboard.html" + queryString;
}
*/