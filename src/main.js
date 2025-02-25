import { getImgs } from './js/pixabay-api.js';
import { createGallery, resetGallery } from './js/render-functions.js'

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const refs = {
    searchForm: document.querySelector(".js-search-form"),
    loader: document.querySelector('.js-loader'),
    gallery: document.querySelector('.js-gallery'),
}

refs.searchForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) { 
    e.preventDefault();


    refs.loader.style.display = 'block';

    const request = e.target.elements['search-bar'].value;

    resetGallery();

    getImgs(request).then(imgs => {
        createGallery(imgs);
        galleryModals.refresh();
        refs.loader.style.display = 'none';
    });

    e.target.reset();
}

let galleryModals = new SimpleLightbox('.gallery a');

