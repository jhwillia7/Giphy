/*Start Psuedocode
For this project we will be creating an array which we will use to populate a row of buttons
These buttons when clicked will use AJAX to dynamically create 10 returns from GIPHY based
on the inputs associated with each button.
The images returned will be still.
The user will need to click the images to toggle whether or not the GIF is animated or still.
There is an option to add additional items to the array and display that to the html.
End Pseudocode */

// Starting array of NBA teams
let teams = [
    "Golden State Warriors",
    "Los Angles Lakers",
    "San Antonio Spurs",
    "Boston Celtics",
    "Toronto Raptors",
    "Houston Rockets",
    "New York Knicks",
    "Philadelphia Sixers",
    "Brooklyn Nets",
    "Miami Heat",
    "Orlando Majic",
    "New Orleans Pelicans"
];

//Optional sounds
let audioClick = new Audio("assets/sounds/mouse_click.wav");

$(document).ready(function () {
    renderButtons();
    // Function for displaying the array
    function renderButtons() {
        // Deleting the content prior to adding new content
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttonSection").empty();
        // Looping through the array of movies
        for (let i = 0; i < teams.length; i++) {
            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            let a = $("<button>");
            // Adding a class of movie-btn to our button
            a.addClass("teamBtn");
            // Adding a data-attribute
            a.attr("teamName", teams[i]);
            a.attr("value", i);
            // Providing the initial button text
            a.text(teams[i]);
            // Adding the button to the buttons-view div
            $("#buttonSection").append(a);
        }//End For Loop
    }//End render Function

    // This function handles events where a movie button is clicked
    $("#formSubmit").on("click", function (event) {
        event.preventDefault();
        audioClick.play();
        // This line grabs the input from the textbox
        let newTeam = $("#inputTeam").val().trim();
        if (newTeam.length > 0) { //Prevent null teams from being pushed into the array
            // Adding team from the textbox to our array
            teams.push(newTeam);
            $("#inputTeam").val("");
            // Calling renderButtons which handles the processing of our team array
            renderButtons();
        };//end If
    });//End Submit click

    $("body").on("click", ".teamBtn", function () {
        //alert("I was clicked!");
        $("#gifSection").empty();
        audioClick.play();
        const apiKey = "&api_key=dc6zaTOxFJmzC&limit=10";
        let queryURL = "https://api.giphy.com/v1/gifs/search?q="
        let team = $(this).attr("teamName");
        queryURL += team;
        queryURL += apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (let i = 0; i < response.data.length; i++) {
                let teamDiv = $("<div>");
                let rating = response.data[i].rating;
                let p = $("<p>").text("Rating: " + rating);
                // Gets the animated gif URL
                let active = response.data[i].images.fixed_width.url;
                // Gets the still gif URL
                let still = response.data[i].images.fixed_width_still.url;
                let teamImg = $("<img>");
                teamImg.attr({ "src": still, "class": "gif img-responsive", "state": "still", "dataStill": still, "dataAnimate": active });
                teamDiv.attr("class", "col-lg-3");
                teamDiv.append(p, teamImg);
                $("#gifSection").append(teamDiv);
            }//End for Loop
        });//End Function Response 
    });//End AJAX call
    $("body").on("click", ".gif", function () {
        //alert("I was clicked");
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("state");
        audioClick.play();
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("dataAnimate"));
            $(this).attr("state", "animate");
        } else {
            $(this).attr("src", $(this).attr("dataStill"));
            $(this).attr("state", "still");
        }//end If
    });//End gif click
});//End document ready