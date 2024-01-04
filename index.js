import {Tree} from "./tree.js";

function checkBounds(start = [0,0],end = [7,7]){
    for(let i = 0; i<2; i++){
        if(start[i] > 7 || end[i] > 7 || start[i] < 0 || end[i] < 0){
            return -1;
        }
    }
    return 1;
}

function knightMoves(start, end){
    const bounds = checkBounds(start,end);
    if(bounds === -1){
        throw new Error("Input parameters out of bounds");
    }
    const knightSteps = [[2,1], [2,-1], [-2,1], [-2,-1], [1,2], [-1,2], [1,-2], [-1,-2]];
    const possibleMoves = [];
    for(let i=0; i<knightSteps.length; i++){
        let move = [];
        for(let j = 0; j<knightSteps[i].length; j++){
            move.push(start[j] + knightSteps[i][j]);
            
        }
        if(checkBounds(move) === 1){
            possibleMoves.push(move);
        }
    }
    const treeInit = [start];
    possibleMoves.forEach((value)=>{
        treeInit.push(value);
    })
    let treeList = new Tree(treeInit);
    console.log(treeList);
}
knightMoves([0,1], [7,1]);