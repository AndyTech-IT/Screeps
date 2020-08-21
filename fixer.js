// roles 	= { 'scaut', 'harvester', 'worker', 'transport'}
// actions 	= { 'scauting', 'harvest', 'withdraw', 'work', 'pickup', 'transfer', 'renew' }

// rooms 	: { name: { sources; minePoints; range; online; freePoints } }
// creeps 	: { name: { role; action; targetID; spawnID; controllerID } }
// controllers : { id; room; creepsCount } }

// partCost   MOVE: 50, WORK: 100, CARRY: 50, ATTACK: 80, RANGED_ATTACK: 150, HEAL: 250, CLAIM: 600, TOUGH: 10 

// claim creep by controller
function getControll(creep) {
	let controller = undefined
		for (id in Memory.controllers) {
			if (!controller || 													// controller is undefined
				controller.creepsCount > Memory.controllers[id].creepsCount) {	// || creeps > creeps1
				controller = Memory.controllers[id]
			}
		}
		creep.memory.controllerID = controller.id
}

// get creep count claimed by controller
function getControllCount(controllerID) {
	let creepsCount = 0
	for (name in Game.creeps) {
		if (Game.creeps[name].memory.controllerID == controllerID) {
			creepsCount++
		}
	}
	return creepsCount
}

// return dict of ordered sources
function getOrderList() {
	let orderList = {}
	for (name in Game.creeps) {
		let id = Game.creeps[name].memory.sourceID
		if (id) {
			if (orderList[id]) {
				orderList[id]++
			} 
			else {
				orderList[id] = 1
			}
		}
	}
	console.log('Order list:')
	for (id in orderList) {
		console.log(id + '	:	' + orderList[id])
	}
	return orderList
}

// reboot source memory
function getSourceData(source, terrain, orderPoints=0) {
	let minePoints = 0
	for (let x = source.pos.x-1; x < source.pos.x+1; x++) {
		for (let y = source.pos.y-1; x < source.pos.y+1; y++) {
			if (terrain.get(x, y) != TERRAIN_MASK_WALL) {
				minePoints++
			}
		}
	}
	return {
		id 			: source.id,
		minePoints 	: minePoints*2,
		freePoints 	: minePoints*2 - orderPoints
	}
}

// reboot room memory
function rebootRoom(name, orderList) {
	room = Game.rooms[name]
	let roomMemory = Memory.rooms[name]

	if (room) {
		roomMemory.online = true
		const sources = room.find(FIND_SOURCES)
		const terrain = new Game.Terrain(name)
		roomMemory.minePoints = 0
		roomMemory.freePoints = 0
		for (i in sources) {
			source = sources[i]
			roomMemory.sources[source.id] = getSourceData (
					source, 
					terrain, 
					orderList[source.id]
				)
			roomMemory.minePoints += roomMemory.sources[source.id].minePoints
			roomMemory.freePoints += roomMemory.sources[source.id].freePoints
		}
	}
	else {
		roomMemory.online = false
	}

	Memory.rooms[name] = roomMemory
	console.log('Room ' + name + ' rebooted!')
}

// get creep order on free source 
function orderSource(creep) {
	room = Memory.rooms[creep.room.name]
	for (name in Memory.rooms) {
		if (
		(Memory.rooms[name].range < room.range || room.freePoints <= 0) //range1 < range || room is full
			&& Memory.rooms[name].freePoints > 0						// && room1 not full
				) {
			room = Memory.rooms[name]
		}
	}
	let source = undefined
	for (id in room.sources) {
		if (!source || room.sources[id].freePoints > source.freePoints) {  //source is undefiend || points1 > points 
			source = room.sources[id]
		}
	}

	creep.memory.sourceID = source.id
}

// reboot creep memory
function rebootCreep(creep) {
	let ok = true
	if (creep.memory.role == undefined) { 
		ok = false
		creep.memory.role = 'worker'
	}

	if (creep.memory.spawnID == undefined) {
		ok = false
		creep.memory.spawnID = Game.spawns.Spawn1.id
	}

	if (creep.memory.sourceID == undefined) {
		ok = false
		orderSource(creep)
	}

	if (creep.memory.controllerID == undefined) {
		ok = false
		getControll(creep)
	}

	if (!ok) {
		creep.say('reboot...')
	}
	creep.memory.action = 'idle'
}

//reboot all Memory
function reboot() {
	console.log('REBOOT!')
	const orderList = getOrderList()
	for (name in Game.creeps) {
		rebootCreep(Game.creeps[name])
	}

	for (name in Memory.rooms) {
		rebootRoom(name, orderList)
	}

	for (name in Game.rooms) {
		if (controller = Game.rooms[name].controller) {
			Memory.controllers['controller '+name] = {
				id 		: controller.id,
				room 	: controller.room,
				creepsCount : getControllCount(controller.id)
			}
		}
	}
}

// export version orderSource()
function getOrder(creep) {
	orderSource(creep)
	room = Game.getObjectById(creep.memory.sourceID).room
	rebootRoom(room.name, getOrderList())
}

exports.reboot 		= reboot;
exports.rebootRoom 	= rebootRoom;
exports.getOrder 	= getOrder;