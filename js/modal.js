class Modal{
  constructor (image, firstName, lastName, email, city, state, phone, dob, nat){
    this.image = image;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email= email;
    this.city = city;
    this.state = state;
    this.phone = phone;
    this.dob = dob;
    this.nat = nat;
  }
  //creates each
  createCard () {
    //Creates the gallery container
    $('#gallery')
        .append(`<div class="card" id="card_${this.firstName}_${this.lastName}">`);

    //Creates the image and information containers within the card
    $(`#card_${this.firstName}_${this.lastName}`)
        .append(`<div class="card-img-container" id="card_img_${this.firstName}_${this.lastName}">`)
        .append(`<div class="card-info-container" id="card_info_${this.firstName}_${this.lastName}">`)
        .click(function(e){createInfoContainer(e)});
  }

  createContent(){
    //Insert the picture holder into the card
    $(`#card_img_${this.firstName}_${this.lastName}`).prop('src',`${this.image}`);
    $(`#card_info_${this.firstName}_${this.lastName}`).prop('src',`${this.image}`);

    //Inserts the profile picture in the image holder for each card
    $(`#card_img_${this.firstName}_${this.lastName}`)
        .append(`<img class="card-img" src="${this.image}" alt="profile picture" id="${this.cardCount}">`);

    //Inserts the profile info in the card info container
    $(`#card_info_${this.firstName}_${this.lastName}`)
        .append(`<h3 id="name" class="card-name cap" id="card_">${this.firstName} ${this.lastName}</h3>`)
        .append(`<p class="card-text" id="card_${this.cardCount}">${this.email}</p>`)
        .append(`<p class="card-text cap" id="card_${this.cardCount}">${this.city}, ${this.state}</p>`);
  }
}