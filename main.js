// roles 	= { 'scaut', 'harvester', 'worker', 'transport', 'old'}
// actions 	= { 'scauting', 'harvest', 'withdraw', 'work', 'pickup', 'transfer', 'idle', 'suicide' }
// spawnID 		= 'id'
// targetID 	= 'id'
// sourceID 	= 'id'
// controllerID	= 'id'
// partCost   MOVE: 50, WORK: 100, CARRY: 50, ATTACK: 80, RANGED_ATTACK: 150, HEAL: 250, CLAIM: 600, TOUGH: 10 

const designer	= require('designer')
const ai 		= require('creepAI') 

spawn 	= Game.spawns.Spawn1
home 	= spawn.room

const maxWorkers 		= 3
const maxHarvesters 	= 2
const maxTransports 	= 1

let maxCreepCost 		= home.energyCapacityAvailable

let scautBody 		= designer.designScout(maxCreepCost)
let harvesterBody 	= designer.designWorker(maxCreepCost)
let workerBody 		= designer.designHarvester(maxCreepCost)
let transportBody 	= designer.designTransport(maxCreepCost)

if(Game.cpu.bucket > 5000) {
    Game.cpu.generatePixel();
    console.log('New Pixel generated!')
}

function main() {
	const freeCreeps = home.find(FIND_MY_CREEPS, 
							{filter: {memory: {action: 'idle'}}})
	const busyCreeps = home.find(FIND_MY_CREEPS,
							{filter: {memory: {action: !'idle'}}})

	for (i in freeCreeps) { ai.getAction(freeCreeps[i]) }
	for (i in busyCreeps) { ai.control(busyCreeps[i]) }
}

exports.loop = main;

