/*******************************************************************
Dynamically Builds the Content and Containers
********************************************************************/
//Adds the search box
$('.search-container')
    .append('<input type="search" id="search-input" class="search-input" placeholder="Search...">')
    .append('<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">');

//Creates the gallery container
$('#gallery')
    .append('<div class="card">');

//Creates the image and information containers
$('.card')
    .append('<div class="card-img-container">')
    .append('<div class="card-info-container">');

//Inserts the profile picture in the image container for each card
$('.card-img-container')
    .append('<img class="card-img" src="https://placehold.it/90x90" alt="profile picture">');

//Inserts the profile info in the card info container
$('.card-info-container')
    .append('<h3 id="name" class="card-name cap">first last</h3>')
    .append('<p class="card-text">email</p>')
    .append('<p class="card-text cap">city, state</p>');

//Creates the Modal container div
$('body')
    .append('<div class="modal-container">');

//Adds content to the modal container div
$('.modal-container')
    .append('<div class="modal">')
    .append('<div class="modal-btn-container">');

//Attaches a button to the modal for closing the div
$('.modal')
    .append('<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>')
    .append('<div class="modal-info-container">');

//Adds the picture to the modal info container
$('.modal-info-container')
    .append('<img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">')
    .append('<h3 id="name" class="modal-name cap">name</h3>')
    .append('<p class="modal-text">email</p>')
    .append('<p class="modal-text cap">city</p>')
    .append('<hr>')
    .append('<p class="modal-text">(555) 555-5555</p>')
    .append('<p class="modal-text">123 Portland Ave., Portland, OR 97204</p>')
    .append('<p class="modal-text">Birthday: 10/21/2015</p>');
/**********************************************************************************
Code after this point handles the interaction of data and on screen characteristics
***********************************************************************************/

// Hide the modal container until a card is clicked
$('.modal-container').hide();