// Dialog system
var section = 0
var dialog = null

function setDialog(newDialog) {
	section = 0
	dialog = newDialog
	advance()
}

function advance() {
	if (dialog == null) { return }
	dialog[section++]()
}

// Hardcoded dialogs
var openingPackage = [
	() => {
		button.innerHTML = 'Open'
		setSprite(pet, 'package_0')
	},
	() => {
		setSprite(pet, 'package_1').then(() => {
			button.innerHTML = 'Read'
			setText('There\'s a letter inside.')
		})
	},
	() => {
		setSprite(pet, 'package_2').then(() => {
			button.innerHTML = 'Continue'
			setText('" Thank you for choosing \\o/ Enterprises™! "')
		})
	},
	() => setText('" We hope you enjoy this egg of questionable origin! "'),
	() => setText('" Our product is guaranteed to synergize with\nyour home decor or your money back! "'),
	() => {
		textbox.style['font-size'] = '10px'
		setText('" Home decor not included,\nmoney back not guaranteed. "')
	},
	() => {
		textbox.style['font-size'] = null
		menu.style.visibility = null
		game.tabs.pda = true
		updateMenu()
		setSprite(pda, 'pda/pda_0')
		setText('" We have included an \\o/ Enterprises™ PDA that\nwill assist you with taking care of your egg. "')
	},
	() => setText('" Since we care about our customers, we will\nbe remotely observing the egg\'s development. "'),
	() => {
		textbox.style['font-size'] = '10px'
		setText('" \\o/ Enterprises™ is not liable for any bodily\nharm as a result of the egg\'s development. "')
	},
	() => {
		textbox.style['font-size'] = null
		setText('" And most important of all... "')
	},
	() => {
		button.innerHTML = 'Finish'
		setText('" Follow us on social media! @FTW_Enterprises "')
	},
	() => {
		game.state = states.openedBox
		
		setSprite(pet, 'egg_0').then(() => {
			button.style.display = 'none'
			setText('')
		})
		pdaPages.push('pda_1a')
	}
]

var pokingEgg = [
	() => {
		button.style.display = null
		button.innerHTML = 'Poke'
	},
	() => {
		game.state = states.pokedEgg
		
		setText('You poke the egg, and nothing happens.')
		pdaPages[1] = 'pda_1b'
		pdaPages.push('pda_2a')
	},
	() => setText('You poke the egg again, and nothing happens.'),
	() => setText('You poke the egg a third time, and nothing still happens.'),
	() => {
		button.style.display = 'none'
		setText('As you poke the egg yet again, you think to yourself that\nyou should perhaps check what\'s next in the PDA.')
	}
]

var pushingEgg = [
	() => {
		button.style.display = null
		button.innerHTML = 'Push'
		setText('')
	},
	() => {
		game.state = states.pushedEgg
		
		setSprite(pet, 'eggPushed').then(() => {
			button.style.display = 'none'
			setText('You push the egg to its side.')
		})
		pdaPages[2] = 'pda_2b'
		pdaPages.push('pda_3')
		pdaPages.push('pda_4a')
	}
]

var hatchingEgg = [
	() => {
		button.style.display = null
		button.innerHTML = 'Continue'
		setText('The egg is about to hatch!')
	},
	() => {
		game.state = states.hatchingEgg
		
		setSprite(pet, 'egg_0').then(() => {
			button.style.display = 'none'
			setText('')
		})
		setTimeout(advance, 1000)
	},
	() => {
		setSprite(pet, 'egg_1')
		setTimeout(advance, 1000)
	},
	() => {
		setSprite(pet, 'egg_2')
		setTimeout(advance, 1000)
	},
	() => {
		setSprite(pet, 'egg_3')
		setTimeout(advance, 1000)
	},
	() => {
		setSprite(pet, 'egg_4')
		setTimeout(advance, 1000)
	},
	() => {
		setSprite(pet, 'egg_5')
		setTimeout(advance, 1000)
	},
	() => {
		game.state = states.hatchedEgg
		
		setSprite(pet, 'egg_6')
		pdaPages.push('pda_5a')
	}
]

var feedingPet = [
	() => {
		button.style.display = null
		button.innerHTML = 'Place down food'
		setSprite(pet, 'feeding_0')
		setText('')
	},
	() => {
		setSprite(pet, 'feeding_1').then(() => {
			textbox.style.display = 'none'
			button.style.display = 'none'
		})
		setTimeout(advance, 1000)
	},
	() => {
		setSprite(pet, 'feeding_2')
		setTimeout(advance, 1000)
	},
	() => {
		setSprite(pet, 'feeding_3')
		setTimeout(advance, 1000)
	},
	() => {
		setSprite(pet, 'feeding_4')
		setTimeout(advance, 1000)
	},
	() => {
		game.state = states.petFed
		
		pdaPages.push('pda_6')
		
		setSprite(pet, 'feeding_5')
		setTimeout(advance, 1000)
	},
	() => {
		setSprite(pet, 'feeding_6')
		setTimeout(advance, 1000)
	},
	() => {
		setSprite(pet, 'feeding_5')
		section -= 2
		setTimeout(advance, 1000)
	}
]

// Start dialog
setDialog(openingPackage)