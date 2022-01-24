// Element selectors
var cookbook = document.getElementById('cookbook')
var cookPrev = document.getElementById('cook_prev')
var cookNext = document.getElementById('cook_next')

var cookAmount = document.getElementById('cook_amount')
var cookIngredient = document.getElementById('cook_ingredient')
cookIngredient.value = ''
var cookInPan = document.getElementById('cook_inPan')
var cookAction = document.getElementById('cook_action')
var cookResults = document.getElementById('cook_results')

// Cooking stuff
var steps = []
var inPan = {}
var action = {
	type: '',
	time: 0
}
var cookTimer = null

function cookPut() {
	cookStop()
	
	var ingredient = cookIngredient.value
	var amount = cookAmount.value
	if (ingredient == '' || amount == '') { return }
	amount = parseInt(amount)
	
	steps.push({
		type: 'put',
		ingredient: ingredient,
		amount: amount
	})
	
	// Update in pan
	if (inPan[ingredient] == null) {
		inPan[ingredient] = amount
	} else {
		inPan[ingredient] += amount
	}
	
	var str = ''
	for (var i in inPan) {
		str += `${inPan[i]}dkg ${i}\n`
	}
	cookInPan.innerHTML = str
	
	cookIngredient.value = ''
	cookAmount.value = ''
}

function cookStart(type) {
	if (action.type == type) { return }
	
	cookStop()
	action.type = type
	cookTimer = setInterval(cookTime, 1000)
	
	if (type == 'chop') { cookAction.innerHTML = 'Chopping... unchopped.' }
	else if (type == 'mix') { cookAction.innerHTML = 'Mixing... (0)' }
	else if (type == 'heat') { cookAction.innerHTML = 'Heating... cold.' }
}

function cookStop() {
	if (cookTimer == null) { return }
	clearInterval(cookTimer)
	cookTimer = null
	cookAction.innerHTML = ' '
	
	steps.push(Object.assign({}, action))
	
	action.type = ''
	action.time = 0
}

function cookFinish() {
	cookStop()
	
	
	var str = 'You didn\'t make anything edible.'
	var matchedRecipe = null
	
	recipes.forEach(recipe => {
		if (matchedRecipe != null) { return }
		
		// Ignore if not the same length
		var recSteps = recipe.steps
		if (steps.length != recSteps.length) { return }
		
		// Iterate through each step in the recipe
		for (var i = 0; i < recSteps.length; ++i) {
			if (steps[i].type != recSteps[i].type) {
				return
			}
			
			if (recSteps[i].type == 'put') {
				var amount = steps[i].amount
				if (steps[i].ingredient != recSteps[i].ingredient
					|| amount > recSteps[i].max_amount || amount < recSteps[i].min_amount) {
					return
				}
			} else {
				var time = steps[i].time
				if (time > recSteps[i].max_time || time < recSteps[i].min_time) {
					return
				}
			}
		}
		
		// Recipe didn't fail!
		str = `You made some ${recipe.name}!`
		matchedRecipe = recipe
	})
	
	cookResults.innerHTML = str
	
	steps = []
	inPan = {}
	cookInPan.innerHTML = ' '
	
	if (game.state == states.cookingFood && matchedRecipe != null) {
		game.state = states.cookedFood
		setDialog(feedingPet)
	}
}

var choppingLevels = [
	'unchopped.',
	'unchopped..',
	'unchopped...',
	'coarsely chopped.', // 3
	'coarsely chopped..',
	'coarsely chopped...',
	'chopped.', // 6
	'chopped..',
	'chopped...',
	'finely chopped.', // 9
	'finely chopped..',
	'finely chopped...',
	'very finely chopped.', // 12
	'very finely chopped..',
	'very finely chopped...'
]

var heatingLevels = [
	'cold.',
	'cold..',
	'cold...',
	'lukewarm.', // 3
	'lukewarm..',
	'lukewarm...',
	'warm.', // 6
	'warm..',
	'warm...',
	'hot.', // 9
	'hot..',
	'hot...',
	'very hot.', // 12
	'very hot..',
	'very hot...',
]

function cookTime() {
	++action.time
	var time = action.time
	
	switch (action.type) {
		case 'chop':
			var str = 'cold.'
			
			if (time < 15) {
				str = choppingLevels[time]
			}
			else { str = 'pulverized!?' }
			
			cookAction.innerHTML = `Chopping... ${str}`
			break
			
		case 'mix':
			cookAction.innerHTML = `Mixing... (${time})`
			if (time > 50) { cookAction.innerHTML = 'Mixing... your arms are hurting :(' }
			break
			
		case 'heat':
			var str = 'cold.'
			
			if (time < 15) {
				str = heatingLevels[time]
			}
			else if (time < 30) { str = 'searing hot!' }
			else { str = 'burnt :(' }
			
			cookAction.innerHTML = `Heating... ${str}`
			break
	}
}

// Recipes
var recipes = []

function addRecipe(file) {
	fetch(`recipes/${file}.json`, {cache: "no-store"})
	.then(r => r.text())
	.then(data => recipes.push(JSON.parse(data)))
}

addRecipe('water')
addRecipe('blueberryMilk')
addRecipe('veggieSalad')
addRecipe('tunaSalad')
addRecipe('mashedPotatoes')
addRecipe('caramelApple')

// Cookbook stuff
var cookPage = 0
var cookPages = [
	'cookbook/0_1',
	'cookbook/2_3',
	'cookbook/4_5',
	'cookbook/6_7'
	//'cookbook/8_9'
]

function cookPrevPage() {
	if (cookPage > 0) {
		setSprite(cookbook, cookPages[--cookPage])
	}
	
	cookButtons()
}

function cookNextPage() {
	if (cookPage < cookPages.length - 1) {
		setSprite(cookbook, cookPages[++cookPage])
	}
	
	cookButtons()
}

function cookButtons() {
	if (cookPage == 0) {
		cookPrev.style.visibility = 'hidden'
	} else {
		cookPrev.style.visibility = null
	}
	
	if (cookPage == cookPages.length - 1) {
		cookNext.style.visibility = 'hidden'
	} else {
		cookNext.style.visibility = null
	}
}

// Set some stuff
setSprite(cookbook, cookPages[0])
cookButtons()