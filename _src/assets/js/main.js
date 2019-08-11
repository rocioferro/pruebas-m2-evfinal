'use strict';

const input = document.querySelector('.input');
const button = document.querySelector('.btn');
const list = document.querySelector('.result-list');
const api = 'http://api.tvmaze.com/search/shows?q=';
const altPicture = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
let favSeries= [];

function pickFavorite (event) {
  const currentSerie = event.currentTarget;
  const showCurrentName = currentSerie.querySelector('.show-name').innerHTML;
  const showCurrentImage = currentSerie.querySelector('.show-img').src;
  const showCurrentId = currentSerie.getAttribute('id');
  const myObjects = { 'name': showCurrentName, 'image': showCurrentImage, 'id':showCurrentId };

  currentSerie.classList.toggle('favorite');
  // if (currentSerie.classList.contains('favorite')) {
  //   favSeries.push(myObjects);
  //   if (currentSerie.classList.contains('favorite')=== false) {
  //   favSeries.splice(myObjects); }
  // }


  if (currentSerie.classList.contains('favorite')) {
    let obj = favSeries.find(data => data.id === `${showCurrentId}`);
    if (obj === undefined) {
      favSeries.push(myObjects);
    }
    console.log(favSeries);
  }
}
function startFavorite() {
  const listElements = document.querySelectorAll('.li-elements');

    for (const item of listElements){
    item.addEventListener('click',pickFavorite);
  }
}

function showSerie() {
  let listSeries='';
  const query = input.value;
  const endpoint = api + query;
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      for (const item of data) {
        const itemName = item.show.name;
        let itemImage = item.show.image;

        if (itemImage === null) {
          itemImage = altPicture;
        }
        else {
          itemImage = item.show.image.medium;
        }

          listSeries +=
            `<li class="li-elements" id="${item.show.id}" data-name="${itemName}">
               <h2 class="show-name" id="item-name">${itemName}</h2>
               <img class="show-img" data-image="${itemImage}" src=${itemImage} alt="${itemName}">
             </li>`;

      list.innerHTML = listSeries;

      }
      startFavorite();

    })}




button.addEventListener('click', showSerie);
