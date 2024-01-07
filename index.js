import {Tree} from "./tree.js";

export function checkInitConditions(start,end){
    for(let i = 0; i<2; i++){
        if(start[i] > 7 || end[i] > 7 || start[i] < 0 || end[i] < 0){
            return -1;
        }
    }
    return 1;
}

function checkMove(move){
    for (let i = 0; i < move.length; i++) {
        if (move[i] > 7 || move[i] < 0) {
            return -1;
        }
    }
    return 1;
}

export let alreadyVisited = [];

function checkAlreadyVisited(move){
    return alreadyVisited.some((visitedNode) => visitedNode.every((val, index) => val === move[index]));
}

export function getPossibleMoves(start){
    if(!checkAlreadyVisited(start)){
        alreadyVisited.push(start);
    }
    const knightSteps = [[2,1], [2,-1], [-2,1], [-2,-1], [1,2], [-1,2], [1,-2], [-1,-2]];
    let moves = [];
    for(let i=0; i<knightSteps.length; i++){
        let move = [];
        for(let j = 0; j<knightSteps[i].length; j++){
            move.push(start[j] + knightSteps[i][j]);
            
        }
        if(checkMove(move) === 1){
            moves.push(move);
            alreadyVisited.push(move);
        }
    }
    return moves;
}

export function knightMoves(start, end){
    const bounds = checkInitConditions(start,end);
    if(bounds === -1){
        throw new Error("Input parameters out of bounds");
    }

    //TREE
    let treeList = new Tree(start);
    treeList.possibleMovesOfNode(end);
    console.log(treeList);
    treeList.shortestPath(end);
}
knightMoves([0,0], [7,7]);