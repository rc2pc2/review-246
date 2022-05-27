const images = [
    {
        url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
        title: 'Svezia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Perù',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
        title: 'Chile',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Argentina',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
        title: 'Colombia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
];

let itemsContent = '';
let thumbnailsContent = '';
let isForwardScroll = true;

for (let i = 0 ; i < images.length ; i++){
    itemsContent += `
    <div class="my-carousel-item" carousel-item="${i}">
        <img class="img-fluid" src="${images[i].url}" alt="${images[i].title} picture">
        <div class="item-description px-3">
            <h2>${images[i].title}</h2>
            <p>${images[i].description}</p>
        </div>
    </div>`

    thumbnailsContent += `
    <div class="my-thumbnail">
        <img class="img-fluid" src="${images[i].url}" alt="Thumbnail of ${images[i].title} picture">
    </div>`
}

// recupero il wrapper dei singoli items
const itemsElement = document.querySelector('div#my-carousel .my-carousel-images');

// ne riempio il contenuto sovrascrivendolo
itemsElement.innerHTML = itemsContent;

// recupero il wrapper dei thumbnails
const thumbnailsElement = document.querySelector('div#my-carousel  .my-thumbnails');

// lo aggiungo al contenuto già presente (i bottoni prev e next)
thumbnailsElement.innerHTML += thumbnailsContent;

// inizializzo gli elementi che voglio visualizzare in active per primi
let activeElement = 1;

//  ho preso la lista degli items e da questa ho preso l'elemento all'indice activeElement, al quale ho aggiunto la classe active
document.getElementsByClassName('my-carousel-item')[activeElement].classList.add('active');

//  ho preso la lista dei thumbnail e da questa ho preso l'elemento all'indice activeElement, al quale ho aggiunto la classe active
document.getElementsByClassName('my-thumbnail')[activeElement].classList.add('active');

// recupero l'elemento sul quale voglio applicare il comportamento "previous"
const prev = document.querySelector('div.my-previous');

// gli aggiungo un event listener con una funzione anonima che controlla il comportamento di click sul bottone previous
prev.addEventListener('click', function() {
    if( activeElement === 0){
        activeElement = images.length - 1;
    } else {
        activeElement--;
    }
    switchToImage(activeElement);
});

// recupero l'elemento sul quale voglio applicare il comportamento "next"
const next = document.querySelector('div.my-next');

// gli aggiungo un event listener con una funzione anonima che controlla il comportamento di click sul bottone next
next.addEventListener('click', function() {
    if( activeElement === images.length - 1){
        activeElement = 0;
    } else {
        activeElement++;
    }
    switchToImage( activeElement);
});

let autoScroll = setInterval(function(){
    if (isForwardScroll) {
        next.click();
    }
    else {
        prev.click();
    }
}, 5000);

const thumbnails = document.getElementsByClassName('my-thumbnail');
console.log(thumbnails)
for (let index = 0; index < thumbnails.length; index++) {
    thumbnails[index].addEventListener( "click", function(){
        switchToImage(index);

        clearInterval(autoScroll);
    });
}

/**
 * Funzione che cambia l'immagine attiva con quella con indice dato come argomento
 */
function switchToImage(activeElementIndex){
    console.log(activeElementIndex)
    activeElement = activeElementIndex;
    const carouselItems = document.getElementsByClassName("my-carousel-item");
    const thumbnailItems = document.getElementsByClassName("my-thumbnail");

    // Ciclo per ogni immagine disponibile
    for (let index = 0; index < images.length; index++) {
        //  se è la nuova immagine attiva
        if (activeElementIndex === index){
            carouselItems[index].classList.add('active');
            thumbnailItems[index].classList.add('active');
        } else { //  in tutti gli altri casi
            carouselItems[index].classList.remove('active');
            thumbnailItems[index].classList.remove('active');
        }
    }
}

document.getElementById('my-after-carousel').innerHTML += `
<button id="my-button" class="btn btn-primary">Inverti l\'ordine di scorrimento</button>
<button id="my-stop-button" class="btn btn-primary">Interrompi lo scorrimento</button>`;

document.getElementById('my-button').addEventListener('click', function(){
    isForwardScroll = !isForwardScroll;
});

document.getElementById('my-stop-button').addEventListener('click', function(){
    clearInterval(autoScroll);
});