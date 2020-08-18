
function harvesterAction(creep) {
	
}

function transportAction(creep) {
	
}

function workerAction(creep) {
	
}

function scautAction(creep) {
	
}

function oldAction(creep) {
	creep.memory.action = 'suicide'
	creep.memory.sourceID = undefined
	creep.memory.targetID = undefined
}



const actions = {
	'harvester'	: harvesterAction,
	'transport'	: transportAction,
	'worker' 	: workerAction,
	'scaut' 	: scautAction,
	'old' 		: oldAction
}

function getAction(creep) {

	actions[creep.memory.role]

	if (creep.ticksToLive < 200) {
		creep.memory.role = 'old'
	}
}

function oldControll() {
	// body...
}
function controll() {
	
}



export.getAction 	= getAction;
export.controll 	= controll;