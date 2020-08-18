// roles 	= [ 'scaut', 'harvester', 'worker', 'transport', 'old']
// actions 	= { 'scauting', 'harvest', 'withdraw', 'work', 'pickup', 'transfer', 'idle', 'suicide' }
// spawnID 		= 'id'
// targetID 	= 'id'
// sourceID 	= 'id'
// controllerID	= 'id'
// partCost   MOVE: 50, WORK: 100, CARRY: 50, ATTACK: 80, RANGED_ATTACK: 150, HEAL: 250, CLAIM: 600, TOUGH: 10 

// Actions
function harvesterAction(creep) {
	if (creep.store.getFreeCapacity() == 0) { // full
		creep.memory.action 	= 'transfer'
		creep.memory.targetID 	= creep.memory.spawnID
	} else
		if (creep.store.getUsedCapacity() == 0) { // empty
			creep.memory.action 	= 'harvest'
			creep.memory.targetID 	= creep.memory.sourceID
		}
}

function transportAction(creep) {
	const resources		= creep.room.find(FIND_DROPPED_RESOURCES)
	const tombstones	= creep.room.find(FIND_TOMBSTONES)
	const olds 			= creep.room.find(FIND_MY_CREEPS, 
							{filter: {memory: {role: 'old'}}})

	if (creep.getFreeCapacity == 0) { // full
		/*if (creep.room.energyAvailable == energyCapacityAvailable) { // room store full
			creep.memory.action		= 'work'
			creep.memory.targetID	= creep.memory.controllerID
		}
		else {*/
			creep.memory.action 	= 'transfer'
			creep.memory.targetID 	= spawnID
		//}
	}
	else if (tombstones.length) {
		creep.memory.action 	= 'withdraw'
		creep.memory.targetID 	= tombstones[0].id
	}
	else if (olds.length) {
		creep.memory.action 	= 'idle'
		creep.memory.targetID 	= olds[0].id
		creep.moveTo(olds[0])
	}
	else if (resources.length) {
		creep.memory.action 	= 'pickup'
		creep.memory.targetID 	= resources[0].id
	}
	else {
		creep.memory.action 	= 'idle'
		creep.memory.targetID 	= undefined
	}
}

function workerAction(creep) {
	if (creep.store.getFreeCapacity() == 0) { // full
	creep.memory.action 	= 'work'
	creep.memory.targetID 	= creep.memory.controllerID
	} else
		if (creep.store.getUsedCapacity() == 0) { // empty
			creep.memory.action 	= 'harvest'
			creep.memory.targetID 	= creep.memory.sourceID
		}
}

function scautAction(creep) {
	// In progress... 
}

function oldAction(creep) {
		creep.memory.action = 'suicide'
		creep.memory.sourceID = undefined
		creep.memory.targetID = creep.memory.spawnID
}


// Controlls
function harvesterAction(creep) {
	
}

function transportAction(creep) {

}

function workerAction(creep) {

}

function scautAction(creep) {
	// In progress...
}

function oldControll(creep) {
}

// Functions dicts
const controlls = {
	'harvester'	: harvesterControll,
	'transport'	: transportControll,
	'worker' 	: workerControll,
	'scaut' 	: scautControll,
	'old' 		: oldControll
}

const actions = {
	'harvester'	: harvesterAction,
	'transport'	: transportAction,
	'worker' 	: workerAction,
	'scaut' 	: scautAction,
	'old' 		: oldAction
}


exports.getAction 	= function(creep) { actions[creep.memory.role](creep) }
exports.controll 	= function(creep) { controlls[creep.memory.role](creep) };