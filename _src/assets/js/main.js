'use strict';

const input = document.querySelector('.input');
const button = document.querySelector('.btn');
const list = document.querySelector('.result-list');
const api = 'http://api.tvmaze.com/search/shows?q=';
const altPicture = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';


function showSerie() {
  let listSeries='';
  const query = input.value;
  const endpoint = api + query;
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      for (const item of data) {
        const itemName = item.show.name;
        let itemImage = item.show.image
        if (itemImage === null) {
          itemImage = altPicture;
        }
        else {
          itemImage = item.show.image.medium;
        }
        listSeries +=
          `<li class="li-elements" id="name-id" data-name="${itemName}">
             <h2 class="show-name" id="item-name">${itemName}</h2>
             <img class="show-img" data-image="${itemImage}" src=${itemImage} alt="${itemName}">
           </li>`;

        list.innerHTML = listSeries;

      }

    })}



button.addEventListener('click', showSerie);
