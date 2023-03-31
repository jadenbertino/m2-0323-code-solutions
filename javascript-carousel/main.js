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

function insertNavDot({active}) {
  const navDotBtn = document.createElement('button')
  navDotBtn.className = 'btn'

  const navDot = document.createElement('i')
  navDot.className = active ? 'fa-solid fa-circle' : 'fa-regular fa-circle'

  navDotBtn.appendChild(navDot)
  $pokemonCarouselNavDots.appendChild(navDotBtn)
}

pokemonImgs.forEach(img => insertNavDot(img))

function handleArrowClick(direction) {
  /**
   * get index of currently active img
   * get target img (left or right by 1, and handle literal edge cases)
    * right = +1 then % by length
    * left = -1
   * update pokemonImgs active property for old and new
   * update dom for img and navdots
   */

  // get old img & it's index
  const oldImg = pokemonImgs.find(img => img.active)
  const oldInd = pokemonImgs.indexOf(oldImg)

  // get new img & it's index
  let newInd = direction === 'right' ? (oldInd + 1) % pokemonImgs.length : oldInd - 1
  if (newInd === -1) newInd = pokemonImgs.length - 1
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
  if (e.target.classList.contains('nav-right')) handleArrowClick('right')
  if (e.target.classList.contains('nav-left')) handleArrowClick('left')
})