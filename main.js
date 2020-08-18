// roles 	= { 'scaut', 'harvester', 'worker', 'transport', 'old'}
// actions 	= { 'scauting, 'harvest', 'work', 'transfer', 'idle', 'suicide' }
// partCost   MOVE: 50, WORK: 100, CARRY: 50, ATTACK: 80, RANGED_ATTACK: 150, HEAL: 250, CLAIM: 600, TOUGH: 10 

const designer = require('designer.js')

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

