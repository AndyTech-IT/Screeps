
function designScout(budget) {
	let scautBody = []
	let moveParts = (budget-budget/6)/BODYPART_COST[MOVE]
	for (let i = 0; i < moveParts; i++) {
		budget -= BODYPART_COST[MOVE]
		scautBody.push(MOVE)
	}
	for (let i=0; i < budget/BODYPART_COST[TOUGH]; i++) {
		scautBody.push(TOUGH)
	}

	return scautBody
}

function designWorker(budget) {
	let workerBody = []
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

	return workerBody
}

function designHarvester(budget) {
	let harvesterBody = []
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

	return harvesterBody
}

function designTransport(budget) {
	let transprtBody = []
	let carryParts 	= budget/2/BODYPART_COST[CARRY]
	let moveParts 	= budget/3/BODYPART_COST[MOVE]

	for (let i = 0; i < carryParts; i++) {
		budget -= BODYPART_COST[CARRY]
		transprtBody.push(CARRY)
	}
	for (let i = 0; i < moveParts; i++) { 
		budget -= BODYPART_COST[MOVE] 
		transprtBody.push(MOVE)
	}

	for (let i=0; i < budget/BODYPART_COST[TOUGH]; i++) {
		transprtBody.push(TOUGH)
	}

	return transprtBody
}

exports.designTransport 	= designTransport;
exports.designHarvester 	= designHarvester;
exports.designWorker 		= designWorker;
exports.designScout 		= designScout;
