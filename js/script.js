/*******************************************************************
Dynamically Builds the Content and Containers
********************************************************************/
//Adds the search box
$('.search-container')
    .append('<input type="search" id="search-input" class="search-input" placeholder="Search...">')
    .append('<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">');



/**********************************************************************************
Code after this point handles the interaction of data and on screen characteristics
***********************************************************************************/
let modal;
let allModals = [];
// Hide the modal container until a card is clicked
$('.modal-container').hide();


$.ajax({
  url: 'https://randomuser.me/api/1.2/?results=12&nat=us&inc=gender,name,location,email,dob,cell,id,picture,nat',
  dataType: 'json',
  async: 'false',
  success: function(data) {
    data.results.forEach( dataModal => {
      let image = dataModal.picture.medium;
      let firstName = dataModal.name.first;
      let lastName = dataModal.name.last;
      let email = dataModal.email;
      let city = dataModal.location.city;
      let state = dataModal.location.state;
      let phone = dataModal.cell;
      let dob = /[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(dataModal.dob.date)[0];
      let nat = dataModal.nat;
      modal = new Modal(`${image}`,`${firstName}`,`${lastName}`,`${email}`
          ,`${city}`,`${state}`,`${phone}`,`${dob}`,`${nat}`);
      modal.createCard();
      modal.createContent();
      allModals.push(dataModal);
    });
  }

});



//Creates the modal popup container
function createInfoContainer(e) {
  let targetCard = e.target.closest('.card');
  let targetName = targetCard.children[1].children[0].textContent.split(' ');
  let firstName;
  let lastName;
  let picture;
  let email;
  let city;
  let phone;
  let street;
  let state;
  let zipcode;
  let dob;
  allModals.forEach(person => {
    if (person.name.first == targetName[0]) {
      firstName = person.name.first;
      lastName = person.name.last;
      picture = person.picture.medium;
      email = person.email;
      city = person.location.city;
      phone = person.cell;
      street = person.location.street;
      state = person.location.state;
      zipcode = person.location.postcode;
      dob = /[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(person.dob.date)[0];
      fillInfoContainer(firstName, lastName, picture, email, city, phone, street, zipcode, dob,state);
    }
  });
}

function fillInfoContainer(firstName,lastName,picture,email,city,phone,street,zipcode,dob,state){
  //Creates the Modal container div
  $('body')
      .append('<div class="modal-container">');
  $('.modal-container')
      .append('<div class="modal">')
      .append('<div class="modal-btn-container">');

  //Attaches a button to the modal for closing the div
  $('.modal')
      .append('<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>')
      .append('<div class="modal-info-container">')
      .click(function(){
        $('.modal-container').hide();
        $('.modal-container').remove();
      console.log($('.modal-container').children());
      });
  //Adds the picture to the modal info container
  $('.modal-info-container')
      .append(`<img class="modal-img" src="${picture}" alt="profile picture">`)
      .append(`<h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>`)
      .append(`<p class="modal-text">${email}</p>`)
      .append(`<p class="modal-text cap">${city}</p>`)
      .append('<hr>')
      .append(`<p class="modal-text">${phone}</p>`)
      .append(`<p class="modal-text">${street}, ${city}, ${state} ${zipcode}</p>`)
      .append(`<p class="modal-text">Birthday: ${dob}</p>`);
}
