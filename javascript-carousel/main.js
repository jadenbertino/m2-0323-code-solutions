const pokemonImgs = [
  { active: true, src: './images/pokemon/001.png', alt: 'Bulbasaur'},
  { active: false, src: './images/pokemon/004.png', alt: 'Charmander'},
  { active: false, src: './images/pokemon/007.png', alt: 'Squirtle'},
  { active: false, src: './images/pokemon/025.png', alt: 'Pikachu'},
  { active: false, src: './images/pokemon/039.png', alt: 'Jigglypuff'},
]

const $pokemonCarousel = document.querySelector('#pokemon-carousel')
const $pokemonCarouselImg = document.querySelector('#pokemon-carousel img')
const $pokemonCarouselNavDots = document.querySelector('#pokemon-carousel .navigation-dots')
const $leftArrow = document.querySelector('#pokemon-carousel .btn.nav-right')
const $rightArrow = document.querySelector('#pokemon-carousel .btn-nav-left')

function insertNavDot({active, ind}) {
  const navDotBtn = document.createElement('button')
  navDotBtn.className = 'btn'

  const navDot = document.createElement('i')
  navDot.className = active ? 'fa-solid fa-circle' : 'fa-regular fa-circle'

  navDotBtn.appendChild(navDot)
  $pokemonCarouselNavDots.appendChild(navDotBtn)
}

pokemonImgs.forEach(img => insertNavDot(img))
  
function setNewImage(target) {
  if (target !== 'left' && target !== 'right' && (target < 0 || target >= pokemonImgs.length)) {
    throw new TypeError(`setNewImage expected "left", "right", or the index of the target image`)
  }
  
  // get old img and it's index
  const oldImg = pokemonImgs.find(img => img.active)
  const oldInd = pokemonImgs.indexOf(oldImg)
  
  // set new img & it's index based off *target* argument
  let newInd
  if (typeof target === 'string') {
    newInd = target === 'right' ? (oldInd + 1) % pokemonImgs.length : oldInd - 1
    if (newInd === -1) newInd = pokemonImgs.length - 1 // loop carousel
  } else if (typeof target === 'number') {
    newInd = target
  }
  const newImg = pokemonImgs[newInd]

  // update active property on old & new img
  oldImg.active = false
  newImg.active = true

  // update img
  $pokemonCarouselImg.src = newImg.src
  $pokemonCarouselImg.alt = newImg.alt
  
  // update navDots, note that dots are wrapped in a button
  $pokemonCarouselNavDots.children[oldInd].firstChild.className = 'fa-regular fa-circle'
  $pokemonCarouselNavDots.children[newInd].firstChild.className = 'fa-solid fa-circle'
}

$pokemonCarousel.addEventListener('click', (e) => {

  // arrow clicks
  if (e.target.classList.contains('nav-right')) setNewImage('right')
  if (e.target.classList.contains('nav-left')) setNewImage('left')
})