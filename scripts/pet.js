// Element selectors
var pet = document.getElementById('pet')
var petInteract = document.getElementById('pet_interact')

var petting = false
var brushing = false

function petPet() {
	if (petting || brushing) { return }
	petting = true
	
	setSprite(pet, 'pet_pet_0')
	setTimeout(() => setSprite(pet, 'pet_pet_1'), 1 * 800)
	setTimeout(() => setSprite(pet, 'pet_pet_0'), 2 * 800)
	setTimeout(() => setSprite(pet, 'pet_pet_1'), 3 * 800)
	setTimeout(() => setSprite(pet, 'pet_pet_0'), 4 * 800)
	setTimeout(() => setSprite(pet, 'pet_pet_1'), 5 * 800)
	setTimeout(() => {
		setSprite(pet, 'pet_idle')
		petting = false
	}, 6 * 800)
}

function brushPet() {
	if (petting || brushing) { return }
	brushing = true
	
	setSprite(pet, 'pet_brush_0')
	setTimeout(() => setSprite(pet, 'pet_brush_1'), 1 * 800)
	setTimeout(() => setSprite(pet, 'pet_brush_0'), 2 * 800)
	setTimeout(() => setSprite(pet, 'pet_brush_1'), 3 * 800)
	setTimeout(() => setSprite(pet, 'pet_brush_0'), 4 * 800)
	setTimeout(() => setSprite(pet, 'pet_brush_1'), 5 * 800)
	setTimeout(() => {
		setSprite(pet, 'pet_idle')
		brushing = false
	}, 6 * 800)
}