import { getImgs } from "./pixabay-api";



const refs = {
    gallery: document.querySelector(".js-gallery"),
    loader: document.querySelector('.js-loader'),
    loadMoreBtn: document.querySelector('.more-btn'),
}

export function createGallery(imgs) {
    const markup = createMarkup(imgs);
    refs.gallery.innerHTML += markup;
    refs.gallery.classList.add('gallery');
    
    
    
    const totalHits = imgs.length ? imgs[0].totalHits : 0;
    const currentHits = refs.gallery.children.length;
    if (currentHits >= totalHits) {
        refs.loadMoreBtn.style.display = 'none';
        iziToast.error({
            title: 'Error',
            messages: "We're sorry, but you've reached the end of search results",
            titleColor: 'white',
            messageColor: 'white',
            backgroundColor: 'red',
            theme: 'dark',
        });
    } else { 
        refs.loadMoreBtn.style.display = 'block';
    }

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

export function scroll() { 
    const galleryItem = document.querySelector('.js-gallery-item');
    if (!galleryItem) return;
    const postHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
        top: postHeight * 3.20,
        behavior: 'smooth'
    });
}