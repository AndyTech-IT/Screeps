// roles 	= { 'scaut', 'harvester', 'worker', 'transport'}
// actions 	= { 'scauting', 'harvest', 'withdraw', 'work', 'pickup', 'transfer', 'renew' }

// rooms 	: { name: { sources; minePoints; range; online; freePoints } }
// creeps 	: { name: { role; action; targetID; spawnID; controllerID } }
// controllers : { id : { id; room; creepsCount } }

// partCost   MOVE: 50, WORK: 100, CARRY: 50, ATTACK: 80, RANGED_ATTACK: 150, HEAL: 250, CLAIM: 600, TOUGH: 10 

const designer	= require('designer')
const ai 		= require('creepAI') 
const fixer 	= require('fixer') 

fixer.reboot()

spawn 	= Game.spawns.Spawn1
home 	= spawn.room

const maxWorkers 		= 3
const maxHarvesters 	= 2
const maxTransports 	= 1

const maxCreepCost 		= home.energyCapacityAvailable

const scautBody 		= designer.designScout(maxCreepCost)
const harvesterBody 	= designer.designWorker(maxCreepCost)
const workerBody 		= designer.designHarvester(maxCreepCost)
const transportBody 	= designer.designTransport(maxCreepCost)



function main() {
	const freeCreeps = home.find(FIND_MY_CREEPS, 
	{ filter: function(creep) { return creep.memory.action == 'idle' }})
	const busyCreeps = home.find(FIND_MY_CREEPS,
	{ filter: function(creep) { return creep.memory.action != 'idle' }})

	for (i in freeCreeps) { ai.getAction(freeCreeps[i]) }
	for (i in busyCreeps) { ai.controll(busyCreeps[i]) }

	if(Game.cpu.bucket > 5000) {
	    Game.cpu.generatePixel();
	    console.log('New Pixel generated!')
	}
}

exports.loop = main;

