// roles 	= { 'scaut', 'harvester', 'worker', 'transport', 'old'}
// actions 	= { 'scauting, 'harvest', 'work', 'transfer', 'idle', 'suicide' }
// partCost   MOVE: 50, WORK: 100, CARRY: 50, ATTACK: 80, RANGED_ATTACK: 150, HEAL: 250, CLAIM: 600, TOUGH: 10 

spawn 	= Game.spawns.Spawn1
home 	= spawn.room

const maxWorkers 		= 3
const maxHarvesters 	= 2
const maxTransports 	= 1

let maxCreepCost 		= home.energyCapacityAvailable

let scautBody 		= []
let harvesterBody 	= []
let workerBody 		= []
let transportBody 	= []

function designScout() {
	let budget = maxCreepCost
	scautBody = []
	let moveParts = (budget-budget/6)/BODYPART_COST[MOVE]
	for (let i = 0; i < moveParts; i++) {
		budget -= BODYPART_COST[MOVE]
		scautBody.push(MOVE)
	}
	for (let i=0; i < budget/BODYPART_COST[TOUGH]; i++) {
		scautBody.push(TOUGH)
	}
}

function designWorker() {
	let budget = maxCreepCost
	workerBody = []
	let workParts 	= budget/3*2/BODYPART_COST[WORK]
	let moveParts 	= budget/3/2/BODYPART_COST[MOVE]
	let carryParts 	= moveParts

	for (let i = 0; i < workParts; i++) {
		budget -= BODYPART_COST[WORK]
		workerBody.push(WORK)
	}
	for (let i = 0; i < carryParts; i++) {
		budget -= BODYPART_COST[CARRY]
		workerBody.push(CARRY)
	}
	for (let i = 0; i < moveParts; i++) { 
		budget -= BODYPART_COST[MOVE] 
		workerBody.push(MOVE)
	}

	for (let i=0; i < budget/BODYPART_COST[TOUGH]; i++) {
		workerBody.push(TOUGH)
	}
}

function designHarvester() {
	let budget = maxCreepCost
	harvesterBody = []
	let workParts 	= budget/3/BODYPART_COST[WORK]
	let carryParts 	= budget/3/BODYPART_COST[CARRY]
	let moveParts 	= budget/3/BODYPART_COST[MOVE]

	for (let i = 0; i < workParts; i++) {
		budget -= BODYPART_COST[WORK]
		harvesterBody.push(WORK)
	}
	for (let i = 0; i < carryParts; i++) {
		budget -= BODYPART_COST[CARRY]
		harvesterBody.push(CARRY)
	}
	for (let i = 0; i < moveParts; i++) { 
		budget -= BODYPART_COST[MOVE] 
		harvesterBody.push(MOVE)
	}

	for (let i=0; i < budget/BODYPART_COST[TOUGH]; i++) {
		harvesterBody.push(TOUGH)
	}
}

designScout()
designWorker()
designHarvester()
console.log(harvesterBody)



function addRoom(room, range) {
    if (!(room.name in Memory.rooms)) {
        console.log(room, range)
    	terrain = new Room.Terrain(room.name)
    	sourcesData = []
    	let sources = room.find(FIND_SOURCES)
    	let minePoints = 0
    	for (index in sources) {
    			let minePointsCount = 0
    			let X = sources[index].pos.x, Y = sources[index].pos.y
    			for (let x = X-1; x <= X+1; x++) {
    				for (let y = Y-1; y <= Y+1; y++) {
    					if (terrain.get(x, y) != 1) 
    						{ minePointsCount++ }
    				}
    			}
    			sourcesData.push({ ID: sources[index].id ,minePointsCount })
    			minePoints += minePointsCount
    		}
    	Memory.rooms[room.name] = {
    		'sources' 	: sourcesData,
    		'minePoints': minePoints,
    		'range' 	: range
    	}
    }
}


