
function getMyCreep(creep, spawn, controller, role) {
	return {
		creep 		: creep,
		spawn 		: spawn,
		controller 	: controller,
		role 		: role,
		action 		: 'idle',
		target 		: null,

		actions 	: {
			work 	: getWork,
			harvest	: getHarvest,
			renew 	: getRenew
		},

		getRoleActions 	: {
			worker 		: workerAction,
			harvester 	: harvesterAction
		}
	}
}

function Step(myCreep) {
	if (myCreep.action == 'idle'){
		myCreep.action = myCreep.getRoleActions(myCreep.role);
	}
	else if (myCreep.actions[myCreep.action](myCreep.target) == ERR_NOT_IN_RANGE) {
		myCreep.creep.moveTo(myCreep.target);
	}
}

function workerAction() {

	}

function harvesterAction() {

	}

function getWork (target) { return this.creep.upgradeController(target); }

function getHarvest (target) { return this.creep.harvest(target); }

exports.creep = myCreep;