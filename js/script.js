let modal;
let allModals = [];
let targetCard;
let firstPassIndex = 0;
let scrollIndex;

//Adds the search box and search function
$('.search-container')
    .append('<input type="search" id="search-input" class="search-input" placeholder="Search...">')
    .keyup(search)
    .append('<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">')
    .click(search);

function search (){
  let searchText = $('#search-input').val();
  //hide all containers on the page
  hideAllCards();
  if (searchText.length === 0){
    $('.gallery').children()
        .each(()=>{
          this.style.display = '';
        })
  }
  let $children = $('.gallery').find('.card-name');
  for(let i = 0; i < $children.length; i++){
    let names = $children[i].innerText;
    if(names.includes(searchText)) {
      $children[i].closest('.card').style.display = '';
    } else {
      $children[i].closest('.card').style.display = 'none';
    }
  }
}


function hideAllCards (){
  $('.gallery').children()
      .each(function(){
        this.style.display = 'none';
      });
}


// Hide the modal container until a card is clicked
$('.modal-container').hide();


$.ajax({
  url: 'https://randomuser.me/api/1.2/?results=12&nat=us&inc=gender,name,location,email,dob,cell,id,picture,nat',
  dataType: 'json',
  timeout: 7000,
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
  targetCard = e.target.closest('.card');
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
    if ((person.name.first === targetName[0]) && (person.name.last === targetName[1])) {
      firstName = person.name.first;
      lastName = person.name.last;
      picture = person.picture.large;
      email = person.email;
      city = person.location.city;
      phone = person.cell;
      street = person.location.street;
      state = person.location.state;
      zipcode = person.location.postcode;
      dob = /[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(person.dob.date)[0];
      firstPassIndex = person;
      scrollIndex = allModals.indexOf(firstPassIndex);
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
        $('.modal-container').remove();
      });
  //Adds the picture to the modal info container
  $('.modal-info-container')
      .append(`<img class="modal-img" src="${picture}" alt="profile picture">`)
      .append(`<h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>`)
      .append(`<p class="modal-text">${email}</p>`)
      .append(`<p class="modal-text cap">${city}</p>`)
      .append('<hr>')
      .append(`<p class="modal-text cap">${phone}</p>`)
      .append(`<p class="modal-text cap">${street}, ${city}, ${state} ${zipcode}</p>`)
      .append(`<p class="modal-text cap">Birthday: ${dob}</p>`);
  //Adds the arrows for scrolling through the modal info container
  $('.modal-btn-container').append(`<button type="button" id="modal-scroll-left-btn" class="btn"><strong> < </strong></button>`);
  $('#modal-scroll-left-btn').click(function(e){
    infoBtnAction('left');
  });
  $('.modal-btn-container').append(`<button type="button" id="modal-scroll-right-btn" class="btn"><strong> > </strong></button>`);
  $('#modal-scroll-right-btn').click(function(){
    infoBtnAction('right');
  });
}

/*capture target ID on click, search the allModals array for the target id and set it as the scrollIndex starting point*/
function updateInfoContainer (firstName,lastName,picture,email,city,phone,street,zipcode,dob,state){
  $('.modal-info-container')
      .empty()
      .append(`<img class="modal-img" src="${picture}" alt="profile picture">`)
      .append(`<h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>`)
      .append(`<p class="modal-text">${email}</p>`)
      .append(`<p class="modal-text cap">${city}</p>`)
      .append('<hr>')
      .append(`<p class="modal-text">${phone}</p>`)
      .append(`<p class="modal-text">${street}, ${city}, ${state} ${zipcode}</p>`)
      .append(`<p class="modal-text">Birthday: ${dob}</p>`);
}
//Triggered by the click event handler on the info container, scrolls to the next modal information
function infoBtnAction(direction){
  if (direction === 'left'){
    if((allModals[(scrollIndex)]) !== (allModals[0])){
      returnDetails(allModals[(scrollIndex - 1)]);
      scrollIndex += -1;
    } else if ((allModals[(scrollIndex)]) === (allModals[0])){
      returnDetails(allModals[allModals.length-1]);
      scrollIndex = allModals.length-1;
    }
  }
  if (direction === 'right'){
    if((allModals[(scrollIndex +1)]) !== (allModals[allModals.length])){
      returnDetails(allModals[(scrollIndex + 1)]);
      scrollIndex += 1;
    } else if ((allModals[scrollIndex +1]) === (allModals[allModals.length])){
      returnDetails(allModals[0]);
      scrollIndex = 0;
    }
  }
}

function returnDetails(card) {
  firstName = card.name.first;
  lastName = card.name.last;
  picture = card.picture.large;
  email = card.email;
  city = card.location.city;
  phone = card.cell;
  street = card.location.street;
  state = card.location.state;
  zipcode = card.location.postcode;
  dob = /[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(card.dob.date)[0];
  return updateInfoContainer(firstName,lastName,picture,email,city,phone,street,zipcode,dob,state);
}
