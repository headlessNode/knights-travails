import { getPossibleMoves } from "./index.js";
export class Node{
    constructor(data){
        this.data = data;
        this.firstChild = null;
        this.nextSibling = null;
    }
}

function buildTree(dataArray, start, end){
    if(start > end){
        return null;
    }
    const root = new Node(dataArray[start]);
    if(start > 0){
        root.nextSibling = buildTree(dataArray, start + 1, end);
    }else{
        root.firstChild = buildTree(dataArray, start + 1, end);
    }
    return root
}

function childTree(dataArray, start, end){
    if(start > end){
        return null;
    }
    const root = new Node(dataArray[start]);
    root.nextSibling = buildTree(dataArray, start + 1, end);
    return root;
}

export class Tree{
    constructor(dataArray){
        this.root = buildTree(dataArray, 0, dataArray.length - 1);
    }
    possibleMovesOfSiblings(tmp = this.root.firstChild){
        if(tmp === null){
            return;
        }
        let movesArray = getPossibleMoves(tmp.data);
        tmp.firstChild = childTree(movesArray, 0, movesArray.length - 1);
        this.possibleMovesOfSiblings(tmp.nextSibling);
    }
}