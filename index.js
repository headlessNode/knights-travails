import {Tree} from "./tree.js";
const prettyPrint = (node, prefix = "", isFirstChild = true) => {
    if (node === null) {
        return;
    }

    console.log(`${prefix}${isFirstChild ? "└── " : "├── "}${node.data}`);
    
    if (node.nextSibling !== null) {
        prettyPrint(node.nextSibling, prefix, false);
    }

    if (node.firstChild !== null) {
        prettyPrint(node.firstChild, `${prefix}${isFirstChild ? "    " : "│   "}`, true);
    }
};


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

export function getPossibleMoves(start, end){
    if(!checkAlreadyVisited(start)){
        alreadyVisited.push(start);
    }
    // const isEqualToEnd = start.every((currentValue, index)=> currentValue === end[index]);
    // if(isEqualToEnd){
    //     return null;
    // }
    const knightSteps = [[2,1], [2,-1], [-2,1], [-2,-1], [1,2], [-1,2], [1,-2], [-1,-2]];
    let moves = [];
    for(let i=0; i<knightSteps.length; i++){
        let move = [];
        for(let j = 0; j<knightSteps[i].length; j++){
            move.push(start[j] + knightSteps[i][j]);
            
        }
        //&& !checkAlreadyVisited(move)
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
    // prettyPrint(treeList.root);
    treeList.levelOrder();
}
knightMoves([3,3], [4,3]);