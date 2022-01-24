// Menu stuff
var menu = document.getElementById('menu')
var tab = 'home'
var tabs = {
	home: document.getElementById('home'),
	pda: document.getElementById('pda'),
	map: document.getElementById('map'),
	cook: document.getElementById('cook'),
	save: document.getElementById('save'),
	config: document.getElementById('config')
}

function changeTab(newTab) {
	if (newTab == tab) { return }
	
	if (newTab == 'pda') {
		pdaButtons()
		setSprite(pda, 'pda/' + pdaPages[pdaPage])
		
		if (!game.tabs.home) {
			game.tabs.home = true
			updateMenu()
		}
	} else if (newTab == 'home') {
		if (game.state == states.watchPet) {
			game.state = states.petEscaped
			pdaPages[5] = 'pda_5b'
		}
	} else if (newTab == 'cook') {
		if (!game.tabs.cook) {
			game.tabs.cook = true
			updateMenu()
		}
	}
	
	Array.from(document.getElementsByClassName(newTab.toLowerCase())).forEach(item => item.classList.add('highlight'))
	Array.from(document.getElementsByClassName(tab.toLowerCase())).forEach(item => item.classList.remove('highlight'))
	
	tabs[newTab].style.display = null
	tabs[tab].style.display = 'none'
	tab = newTab
}

/*
+–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––+
| You have 0 bytes          |     |     |     |      |      | C |
|                           | EGG | PDA | MAP | COOK | SAVE | F |
|                           |     |     |     |      |      | G |
+–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––+
*/

function updateMenu() {
	// Regenerate the menu based off of game.tabs
	var t = game.tabs
	
	var m = '+–––––––––––––––––––––––––––––––––––+\n|'
	m += t.home ? '<span class="home" onclick="changeTab(\'home\')">     </span>' : '     '
	m += t.home || t.pda ? '|' : ' '
	m += t.pda ? '<span class="pda" onclick="changeTab(\'pda\')">     </span>' : '     '
	m += t.pda || t.map ? '|' : ' '
	m += t.map ? '<span class="map" onclick="changeTab(\'map\')">     </span>' : '     '
	m += t.map || t.cook ? '|' : ' '
	m += t.cook ? '<span class="cook" onclick="changeTab(\'cook\')">      </span>' : '      '
	m += t.cook || t.save ? '|' : ' '
	m += t.save ? '<span class="save" onclick="changeTab(\'save\')">      </span>' : '      '
	m += t.save || t.cfg ? '|' : ' '
	m += t.config ? '<span class="config" onclick="changeTab(\'config\')"> C </span>|\n' : '   |\n|'
	
	var str = game.state >= states.finished ? 'PET' : 'EGG'
	
	m += t.home ? '<span class="home" onclick="changeTab(\'home\')"> '+str+' </span>' : '     '
	m += t.home || t.pda ? '|' : ' '
	m += t.pda ? '<span class="pda" onclick="changeTab(\'pda\')"> PDA </span>' : '     '
	m += t.pda || t.map ? '|' : ' '
	m += t.map ? '<span class="map" onclick="changeTab(\'map\')"> MAP </span>' : '     '
	m += t.map || t.cook ? '|' : ' '
	m += t.cook ? '<span class="cook" onclick="changeTab(\'cook\')"> COOK </span>' : '      '
	m += t.cook || t.save ? '|' : ' '
	m += t.save ? '<span class="save" onclick="changeTab(\'save\')"> SAVE </span>' : '      '
	m += t.save || t.cfg ? '|' : ' '
	m += t.config ? '<span class="config" onclick="changeTab(\'config\')"> F </span>|\n' : '   |\n|'
	
	m += t.home ? '<span class="home" onclick="changeTab(\'home\')">     </span>' : '     '
	m += t.home || t.pda ? '|' : ' '
	m += t.pda ? '<span class="pda" onclick="changeTab(\'pda\')">     </span>' : '     '
	m += t.pda || t.map ? '|' : ' '
	m += t.map ? '<span class="map" onclick="changeTab(\'map\')">     </span>' : '     '
	m += t.map || t.cook ? '|' : ' '
	m += t.cook ? '<span class="cook" onclick="changeTab(\'cook\')">      </span>' : '      '
	m += t.cook || t.save ? '|' : ' '
	m += t.save ? '<span class="save" onclick="changeTab(\'save\')">      </span>' : '      '
	m += t.save || t.cfg ? '|' : ' '
	m += t.config ? '<span class="config" onclick="changeTab(\'config\')"> G </span>|\n' : '   |\n'
	
	m += '+–––––––––––––––––––––––––––––––––––+'
	menu.innerHTML = m
}

updateMenu()