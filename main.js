//'idle', 'work', 'transfer', 'suicide'
//'worker', 'harvester', 'transfer'

const maxWorkers = 5
const maxHarvesters = 1
const maxTransfers = 0

var harvestersCount = 0
var workersCount = 0
var transfersCount = 0

const workerBody = [WORK, WORK, CARRY, MOVE]
const harvesterBody = [WORK, CARRY, CARRY, MOVE, MOVE]
const transferBody = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]

const spawn = Game.spawns.Spawn1
const room = spawn.room
const terrain = new Room.Terrain(room.name)

const sources = room.find(FIND_SOURCES)
let list = []
for (i in sources) { list.push(sources[i].id) }
const sourcesID = list
var SourcesMinePointsCount = []
for (index in sources) {
		let minePointsCount = 0
		let X = sources[index].pos.x, Y = sources[index].pos.y
		for (let x = X-1; x <= X+1; x++) {
			for (let y = Y-1; y <= Y+1; y++) {
				if (terrain.get(x, y) != 1) 
					{ minePointsCount++ }
			}
		}
		SourcesMinePointsCount.push(minePointsCount)
	}
 
for (name in Game.creeps){
	Game.creeps[name].memory.action = 'idle'
	Game.creeps[name].memory.targetID = undefined
}

getFreeSourceID = function() {
	for (id in sourcesID) {
		let freePoints = SourcesMinePointsCount[id]
		for(name in Game.creeps) {
			if (Game.creeps[name].memory.targetID == sourcesID[id]) {
				freePoints--
			}
		}
		if (freePoints > 0) { return sourcesID[id] }
	}
	return 'idle'
}

control = function(creep) {
	if (creep.ticksToLive < 200) {
	 creep.memory.role=undefined
	 creep.memory.targeD=undefined
		creep.memory.action = 'suicide'
		let target = Game.getObjectById(creep.memory.spawnID)
		creep.moveTo(target)
		if (creep.pos.findPathTo(target).length < 2) {
		    delete(Memory.creeps[creep.name])
			creep.suicide()
		}
	}

	if (creep.memory.role == 'harvester') { // Harvester ----------------------

		if (creep.memory.action == 'idle') { // IDLE>>>>>>>>>>>>>>>>>>>>>>>
			if (creep.store.getFreeCapacity() == creep.store.getCapacity()) {
				let temp = getFreeSourceID()
				if (temp == 'idle') {
					creep.memory.action = 'idle'; 
					creep.memory.targetID = undefined
				} else { 
					creep.memory.targetID = temp 
					creep.memory.action = 'work' 
				}
			} else
				if (creep.store.getFreeCapacity() != creep.store.getCapacity()) {
					creep.memory.targetID = spawn.id
					creep.memory.action = 'transfer'
				}
		} else
			if (creep.memory.action == 'work') { // WORK>>>>>>>>>>>>>>>>>>>>
				target = Game.getObjectById(creep.memory.targetID)
				if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target)
				}
				if (creep.store.getFreeCapacity() == 0) {
					creep.memory.action = 'idle'
					creep.memory.targetID = undefined
				}
			} else
				if (creep.memory.action == 'transfer') { // TRANSFER>>>>>>>
					target = Game.getObjectById(creep.memory.targetID)
					if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(target)
					}
					if (creep.store.getFreeCapacity() == creep.store.getCapacity()) {
					    creep.memory.action = 'idle'
					    creep.memory.targetID = undefined
					}
					
				}
	}else 
		if (creep.memory.role == 'worker') { // Worker -------------------
			if (creep.memory.action == 'idle') { // IDLE>>>>>>>>>>>>>>>>>>>>>>>
				if (creep.store.getFreeCapacity() == creep.store.getCapacity()) {
					let temp = getFreeSourceID()
					if (temp == 'idle') {
						creep.memory.action = 'idle'; 
						creep.memory.targetID = undefined
					} else { 
						creep.memory.targetID = temp 
						creep.memory.action = 'work' 
					}
				} else
					if (creep.store.getFreeCapacity() != creep.store.getCapacity()) {
						creep.memory.targetID = room.controller.id
						creep.memory.action = 'transfer'
					}
			} else
				if (creep.memory.action == 'work') { // WORK>>>>>>>>>>>>>>>>>>>>
					target = Game.getObjectById(creep.memory.targetID)
					if (creep.harvest(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(target)
					}
					if (creep.store.getFreeCapacity() == 0) {
						creep.memory.action = 'idle'
						creep.memory.targetID = undefined
					}
				} else
					if (creep.memory.action == 'transfer') {
						target = Game.getObjectById(creep.memory.targetID)
						if (creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
							creep.moveTo(target)
						}
						if (creep.store.getFreeCapacity() == creep.store.getCapacity()) {
					    creep.memory.action = 'idle'
					    creep.memory.targetID = undefined
					}
					}
		}else 
			if (creep.memory.role == 'transfer') { // Transfer --------------------

			}
}

spawnHarvester = function(spawn, structures){
	return Game.spawns.Spawn1.spawnCreep(harvesterBody, 'harvester'+harvestersCount, 
	{ 
			energyStructures: structures,
			directions: [ TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT ],
			memory: {
				role: 'harvester',
				action: 'idle',
				spawnID: spawn.id,
				targetID: undefined
			}
	})
	
}

spawnWorker = function(spawn, structures){
	return Game.spawns.Spawn1.spawnCreep(workerBody, 'worker'+workersCount, 
	{ 
			energyStructures: structures, 
			directions: [TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT],
			memory: {
				role: 'worker',
				action: 'idle',
				spawnID: spawn.id,
				targetID: undefined
			}
	})
}

spawnTransfer = function(spawn, structures){
	return Game.spawns.Spawn1.spawnCreep(transferBody, 'transfer'+transfersCount, 
	{ 
			energyStructures: structures, 
			directions: [TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT],
			memory: {
				role: 'transfer',
				action: 'idle',
				spawnID: spawn.id,
				targetID: undefined
			}
	})
}

creepsManager = function(spawn) {

		harvestersCount = 0
        workersCount = 0
        transfersCount = 0

        for (name in Game.creeps) {
            creep = Game.creeps[name]
    		if (creep.memory.role == 'harvester') { harvestersCount++ }else 
    			if (creep.memory.role == 'worker') { workersCount++ }else
    				if (creep.memory.role == 'transfer') { transfersCount++ }
        }

		//Check on some one creep all roles
		if (harvestersCount == 0) { spawnHarvester(spawn, [spawn]) }

		if (workersCount == 0) { spawnWorker(spawn, [spawn]) }

	//	if (transfersCount == 0) { spawnTransfer(spawn, [spawn]) }

		//Spawn all creeps
		if (harvestersCount < maxHarvesters) { spawnHarvester(spawn, [spawn]) }

		if (workersCount < maxWorkers) { spawnWorker(spawn, [spawn]) }

		if (transfersCount < maxTransfers) { spawnTransfer(spawn, [spawn]) }
}
	


module.exports.loop = function () {
    
    
	for (name in Game.creeps) {
		control(Game.creeps[name])
	}

	creepsManager(Game.spawns.Spawn1)

	if (Game.cpu.generatePixel() == OK)
     	console.log('New Pixel generated!')
}
