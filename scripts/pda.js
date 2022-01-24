// Element selectors
var pda = document.getElementById('pda_sprite')
var pdaPrev = document.getElementById('pda_prev')
var pdaNext = document.getElementById('pda_next')

// PDA system
var pdaPage = 0
var pdaPages = [
	'pda_0'
]

function pdaPrevPage() {
	if (pdaPage > 0) {
		setSprite(pda, 'pda/' + pdaPages[--pdaPage])
	}
	
	pdaButtons()
}

function pdaNextPage() {
	if (pdaPage < pdaPages.length - 1) {
		setSprite(pda, 'pda/' + pdaPages[++pdaPage])
	}
	
	pdaButtons()
}

function pdaButtons() {
	if (pdaPage == 0) {
		pdaPrev.style.visibility = 'hidden'
	} else {
		pdaPrev.style.visibility = null
	}
	
	if (pdaPage == pdaPages.length - 1) {
		pdaNext.style.visibility = 'hidden'
	} else {
		pdaNext.style.visibility = null
	}
	
	// Give next mission
	if (pdaPage == 1 && game.state == states.openedBox) {
		game.state == states.pokingEgg
		setDialog(pokingEgg)
	}
	
	if (pdaPage == 2 && game.state == states.pokedEgg) {
		game.state == states.pushingEgg
		setDialog(pushingEgg)
	}
	
	if (pdaPage == 4 && game.state == states.pushedEgg) {
		game.state = states.lookingForWarmth
		
		game.tabs.map = true
		updateMenu()
		Array.from(document.getElementsByClassName(tab.toLowerCase())).forEach(item => item.classList.add('highlight'))
		goToPlace('Lawn')
		setSprite(pet, 'egg_0')
		setText('')
	}
	
	if (pdaPage == 4 && game.state == states.warmingEgg) {
		game.state = states.warmedEgg
		setTimeout(() => setDialog(hatchingEgg), 10000)
	}
	
	if (pdaPage == 5 && game.state == states.hatchedEgg) {
		game.state = states.watchPet
		setSprite(pet, 'eggEmpty')
	}
	
	if (pdaPage == 5 && game.state == states.petEscaped) {
		game.state = states.cookingFood
	}
	
	if (pdaPage == 6 && game.state == states.petFed) {
		game.state = states.finished
		
		updateMenu()
		Array.from(document.getElementsByClassName(tab.toLowerCase())).forEach(item => item.classList.add('highlight'))
		dialog = null
		
		setSprite(pet, 'pet_idle')
		petInteract.style.display = null
		
		pdaPages.push('pda_end')
		pdaButtons()
	}
}