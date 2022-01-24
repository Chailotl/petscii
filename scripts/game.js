// Game state god object
var states = {
	openingBox: 0,
	openedBox: 1,
	pokingEgg: 2,
	pokedEgg: 3,
	pushingEgg: 4,
	pushedEgg: 5,
	lookingForWarmth: 6,
	warmingEgg: 7,
	warmedEgg: 8,
	hatchingEgg: 9,
	hatchedEgg: 10,
	watchPet: 11,
	petEscaped: 12,
	cookingFood: 13,
	cookedFood: 14,
	petFed: 15,
	finished: 16
}

var game = {
	tabs: {
		home: false,
		pda: false,
		map: false,
		save: false,
		config: false
	},
	state: states.openingBox,
	hasNest: false,
	hasHeater: false
}

// Useful functions
function setSprite(tag, file) {
	return fetch(`sprites/${file}.txt`, {cache: "no-store"})
	.then(r => r.text())
	.then(data => tag.innerHTML = data)
}

function replace(tag, index, replacement, length = 0) {
	var str = tag.innerHTML
	tag.innerHTML = str.substr(0, index) + replacement + str.substr(index + replacement.length + length)
}

var offsets = []
function createButton(index, length, func) {
	// Count up previous offsets
	var offset = 0
	offsets.forEach((obj) => {
		if (index > obj.pos) {
			offset += obj.len
		}
	})
	
	// Create button
	var str = map.innerHTML
	map.innerHTML = str.substr(0, index + offset)
	+ `<span class="click" onclick="${func}">`
	+ str.substr(index + offset, length)
	+ '</span>' + str.substr(index + offset + length)
	
	// Keep track of button offset
	offsets.push({pos: index, len: func.length + 38, func: func})
}

// Game logic
var timer = 0
setInterval(function() {
	// Game is paused when outside of the map
	if (tab != 'map') { return }
	++timer
	
	if (place == 'Lawn') {
		// Animate chimney smoke
		if (timer % 8 == 2) {
			replace(map, 99, ')')
			replace(map, 132, '(')
		} else if (timer % 8 == 3) {
			replace(map, 65, '(')
			replace(map, 132, ' ')
		} else if (timer % 8 == 4) {
			replace(map, 32, ')')
			replace(map, 99, ' ')
		} else if (timer % 8 == 5) {
			replace(map, 32, ' ')
			replace(map, 65, ' ')
		}
	} else if (place == 'Kitchen') {
		var date = new Date();
		replace(map, 1062, pad(date.getHours()) + (timer % 2 == 0 ? ':' : ' ') + pad(date.getMinutes()))
	} else if (place == 'Living Room') {
		replace(map, 1205, randomFire(3))
		replace(map, 1296, randomFire(4))
		replace(map, 1386, randomFire(2) + ' ' + randomFire(2))
	}
}, 1000)

var place = ''
function goToPlace(newPlace) {
	// Clear offsets and timer
	offsets = []
	timer = 0
	
	place = newPlace
	switch (place) {
		case 'Lawn':
			setSprite(map, 'places/lawn').then(() => {
				mapBack.style.visibility = 'hidden'
				mapBack.innerHTML = 'Back to the map'
				mapBack.setAttribute('onclick', 'goToPlace(\'Map\')')
				
				if (game.hasNest) {
					replace(map, 925, '    ')
					replace(map, 995, '       ')
					replace(map, 1069, '     ')
				} else {
					createButton(925, 4, 'getNest()')
					createButton(995, 7, 'getNest()')
					createButton(1069, 5, 'getNest()')
				}
				
				createButton(543, 6, 'goToPlace(\'House\')')
				createButton(608, 6, 'goToPlace(\'House\')')
				createButton(674, 6, 'goToPlace(\'House\')')
				createButton(741, 6, 'goToPlace(\'House\')')
			})
			break
		case 'House':
			setSprite(map, 'places/house').then(() => {
				mapBack.style.visibility = null
				mapBack.innerHTML = 'Back to the lawn'
				mapBack.setAttribute('onclick', 'goToPlace(\'Lawn\')')
				
				createButton(1552, 4, 'goToPlace(\'Lawn\')')
				createButton(515, 4, 'goToPlace(\'Bedroom\')')
				
				createButton(706, 1, 'goToPlace(\'Kitchen\')')
				createButton(767, 1, 'goToPlace(\'Kitchen\')')
				createButton(828, 1, 'goToPlace(\'Kitchen\')')
				createButton(889, 1, 'goToPlace(\'Kitchen\')')
				
				createButton(1181, 1, 'goToPlace(\'Living Room\')')
				createButton(1242, 1, 'goToPlace(\'Living Room\')')
				createButton(1303, 1, 'goToPlace(\'Living Room\')')
				createButton(1364, 1, 'goToPlace(\'Living Room\')')
				
				createButton(1194, 1, 'goToPlace(\'Closet\')')
				createButton(1255, 1, 'goToPlace(\'Closet\')')
				createButton(1316, 1, 'goToPlace(\'Closet\')')
				createButton(1377, 1, 'goToPlace(\'Closet\')')
			})
			break
		case 'Bedroom':
			setSprite(map, 'places/bedroom').then(() => {
				mapBack.innerHTML = 'Back to the house'
				mapBack.setAttribute('onclick', 'goToPlace(\'House\')')
			})
			break
		case 'Kitchen':
			setSprite(map, 'places/kitchen').then(() => {
				mapBack.innerHTML = 'Back to the house'
				mapBack.setAttribute('onclick', 'goToPlace(\'House\')')
				
				if (game.state >= states.cookingFood) {
					createButton(1137, 7, 'changeTab(\'cook\')')
					createButton(1228, 7, 'changeTab(\'cook\')')
				}
				
				// Oven timer
				var date = new Date();
				replace(map, 1062, pad(date.getHours()) + ':' + pad(date.getMinutes()))
			})
			break
		case 'Living Room':
			setSprite(map, 'places/living_room').then(() => {
				mapBack.innerHTML = 'Back to the house'
				mapBack.setAttribute('onclick', 'goToPlace(\'House\')')
				
				createButton(2046, 1, 'carpetLollipop()')
			})
			break
		case 'Closet':
			setSprite(map, 'places/closet').then(() => {
				mapBack.innerHTML = 'Back to the house'
				mapBack.setAttribute('onclick', 'goToPlace(\'House\')')
				
				if (game.hasHeater) {
					replace(map, 892, '=')
					replace(map, 944, '         ‾')
					replace(map, 1004, '___________')
					replace(map, 1065, '         ')
					replace(map, 1126, '      ')
					replace(map, 1187, '     ')
				} else {
					createButton(1004, 6, 'getHeater()')
					createButton(1065, 6, 'getHeater()')
					createButton(1126, 6, 'getHeater()')
					createButton(1187, 5, 'getHeater()')
				}
			})
			break
	}
}

function getNest() {
	if (game.hasNest) { return }
	game.hasNest = true
	checkHeatedNest()
	
	offsets.forEach(obj => {
		if (obj.func == 'getNest()') {
			// Count up previous offsets
			var index = obj.pos
			offsets.forEach((obj2) => {
				if (index > obj2.pos) {
					index += obj2.len
				}
			})
			
			// Remove button
			var str = map.innerHTML
			switch (obj.pos) {
				case 925: replace(map, index, '    ', obj.len); break
				case 995: replace(map, index, '       ', obj.len); break
				case 1069: replace(map, index, '     ', obj.len); break
			}
			
			// Nullify offset
			obj.len = 0
		}
	})
}

function getHeater() {
	if (game.hasHeater) { return }
	game.hasHeater = true
	checkHeatedNest()
	
	replace(map, 892, '=')
	replace(map, 944, '         ‾')
	
	offsets.forEach((obj) => {
		if (obj.func == 'getHeater()') {
			// Count up previous offsets
			var index = obj.pos
			offsets.forEach((obj2) => {
				if (index > obj2.pos) {
					index += obj2.len
				}
			})
			
			// Remove button
			var str = map.innerHTML
			switch (obj.pos) {
				case 1004: replace(map, index, '___________', obj.len); break
				case 1065: replace(map, index, '         ', obj.len); break
				case 1126: replace(map, index, '      ', obj.len); break
				case 1187: replace(map, index, '     ', obj.len); break
			}
			
			// Nullify offset
			obj.len = 0
		}
	})
}

function checkHeatedNest() {
	var sprite = 'egg_0'
	
	if (game.hasNest && game.hasHeater && game.state == states.lookingForWarmth) {
		game.state = states.warmingEgg
		sprite = 'eggHeatedNest'
		pdaPages[4] = 'pda_4b'
	}
	else if (game.hasHeater) { sprite = 'eggHeater' }
	else if (game.hasNest) { sprite = 'eggNest' }
	
	setSprite(pet, sprite)
}

function carpetLollipop() {
	offsets.forEach((obj) => {
		if (obj.func == 'carpetLollipop()') {
			// Count up previous offsets
			var index = obj.pos
			offsets.forEach((obj2) => {
				if (index > obj2.pos) {
					index += obj2.len
				}
			})
			
			// Remove button
			var str = map.innerHTML
			replace(map, index - 3, 'o---', obj.len)
			
			// Nullify offset
			obj.len = 0
		}
	})
}

function randomFire(len) {
	var str = ''
	
	for (var i = 0; i < len; ++i) {
		str += Math.random() > 0.5 ? ')' : '('
	}
	
	return str
}

function pad(num) {
	return ('0' + parseInt(num)).substr(-2);
}

// Element selectors
var textbox = document.getElementById('textbox')
var button = document.getElementById('button')

var map = document.getElementById('map_sprite')
var mapBack = document.getElementById('map_button')

function setText(text) {
	textbox.innerHTML = text
}