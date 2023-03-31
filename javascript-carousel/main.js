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

function insertNavDot({active}, ind) {
  const navDotBtn = document.createElement('button')
  navDotBtn.className = 'btn nav-dot'
  navDotBtn.setAttribute('ind', ind)

  const navDot = document.createElement('i')
  navDot.className = active ? 'fa-solid fa-circle' : 'fa-regular fa-circle'

  navDotBtn.appendChild(navDot)
  $pokemonCarouselNavDots.appendChild(navDotBtn)
}

pokemonImgs.forEach((img, i) => insertNavDot(img, i))
  
function setNewImage(target) {
  // target must be "left", "right", or index of the target img
  if (target !== 'left' && target !== 'right' && (target < 0 || target >= pokemonImgs.length)) {
    throw new TypeError(`setNewImage expected "left", "right", or the index of the target image`)
  }
  
  // get oldImg & it's index
  const oldImg = pokemonImgs.find(img => img.active)
  const oldInd = pokemonImgs.indexOf(oldImg)
  
  // get newImg
  let newInd
  if (target === 'left' || target === 'right') {
    newInd = target === 'right' ? (oldInd + 1) % pokemonImgs.length : oldInd - 1
    if (newInd === -1) newInd = pokemonImgs.length - 1 // loop carousel
  } else {
    newInd = target
  }
  const newImg = pokemonImgs[newInd]

  // update active properties
  oldImg.active = false
  newImg.active = true

  // update dom img
  $pokemonCarouselImg.src = newImg.src
  $pokemonCarouselImg.alt = newImg.alt
  
  // update navDots (note that dots are wrapped in a <button>)
  $pokemonCarouselNavDots.children[oldInd].firstChild.className = 'fa-regular fa-circle'
  $pokemonCarouselNavDots.children[newInd].firstChild.className = 'fa-solid fa-circle'
}

// auto scroll every 3 seconds + user click resets the interval
let pokemonIntervalID

function resetInterval() {
  if (pokemonIntervalID) clearInterval(pokemonIntervalID)
  return setInterval(() => {
    setNewImage('right')
  }, 3000);
}

pokemonIntervalID = resetInterval()

// user click buttons to navigate through carousel
$pokemonCarousel.addEventListener('click', (e) => {

  // arrow clicks
  if (e.target.classList.contains('nav-right')) setNewImage('right'); pokemonIntervalID = resetInterval();
  if (e.target.classList.contains('nav-left')) setNewImage('left'); pokemonIntervalID = resetInterval();

  // nav dot clicks
  if (e.target.classList.contains('nav-dot')) {
    const targetInd = e.target.getAttribute('ind')
    setNewImage(targetInd)
    pokemonIntervalID = resetInterval();
  }
})