import {Tree} from "./tree.js";

export function checkBounds(start = [0,0],end = [7,7]){
    for(let i = 0; i<2; i++){
        if(start[i] > 7 || end[i] > 7 || start[i] < 0 || end[i] < 0){
            return -1;
        }
    }
    return 1;
}

export function getPossibleMoves(start){
    const knightSteps = [[2,1], [2,-1], [-2,1], [-2,-1], [1,2], [-1,2], [1,-2], [-1,-2]];
    let moves = [];
    for(let i=0; i<knightSteps.length; i++){
        let move = [];
        for(let j = 0; j<knightSteps[i].length; j++){
            move.push(start[j] + knightSteps[i][j]);
            
        }
        if(checkBounds(move) === 1){
            moves.push(move);
        }
    }
    return moves;
}

export function knightMoves(start, end){
    const bounds = checkBounds(start,end);
    if(bounds === -1){
        throw new Error("Input parameters out of bounds");
    }
    
    //StartingPossibleMoves
    const possibleMoves = getPossibleMoves(start);

    //TREE
    const treeInit = [start];
    possibleMoves.forEach((value)=>{
        treeInit.push(value);
    })
    let treeList = new Tree(treeInit);
    treeList.possibleMovesOfSiblings();
    console.log(treeList);
}
knightMoves([0,1], [7,1]);