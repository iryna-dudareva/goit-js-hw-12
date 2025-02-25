import { getImgs } from "./pixabay-api";


const refs = {
    gallery : document.querySelector(".js-gallery"),
}

export function createGallery(imgs) {
    resetGallery();
    const markup = createMarkup(imgs);
    refs.gallery.innerHTML = markup;
    refs.gallery.classList.add('gallery');
}

export function resetGallery() { 

        refs.gallery.innerHTML = '';

}

function imgTemplate(img) { 
const {webformatURL, largeImageURL, tags, likes, views, comments, downloads} = img;
    return `<li class="js-gallery-item">
        <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" width="360" height="158"/>
        </a>
        <ul class="stats">
          <li class="stats-item">Likes<span class="stats-span">${likes}</span></li>
          <li class="stats-item">Comments<span class="stats-span">${comments}</span></li>
          <li class="stats-item">Views<span class="stats-span">${views}</span></li>
          <li class="stats-item">Downloads<span class="stats-span">${downloads}</span></li>
        </ul>
      </li>`;
}

function createMarkup(arr) { 
    return arr.map(imgTemplate).join('');
}

