import { alreadyVisited, getPossibleMoves } from "./index.js";
export class Node{
    constructor(data){
        this.data = data;
        this.firstChild = null;
        this.nextSibling = null;
    }
}

function childTree(dataArray, start, end){
    if(start > end){
        return null;
    }
    const root = new Node(dataArray[start]);
    root.nextSibling = childTree(dataArray, start + 1, end);
    return root;
}

export class Tree{
    constructor(origin){
        this.root = new Node(origin);
    }
    levelOrder(cb = (node)=>{return node.data}){
        let queue = [this.root];
        let values = [];

        while(queue.length > 0){
            let currNode = queue.shift();
            values.push(cb(currNode));
            let child = currNode.firstChild;
            while(child){
                queue.push(child);
                child = child.nextSibling;
            }
        }
        console.log(values);
    }
    possibleMovesOfNode(end) {
        let queue = [this.root];
    
        while (queue.length > 0) {
            let currNode = queue.shift();
            const isEqualToEnd = currNode.data.every((currentValue, index)=> currentValue === end[index]);
            if(isEqualToEnd){
                break;
            }
            let movesArray = getPossibleMoves(currNode.data, end);
            if (movesArray) {
                currNode.firstChild = childTree(movesArray, 0, movesArray.length - 1);
                let child = currNode.firstChild;
    
                while (child) {
                    queue.push(child);
                    child = child.nextSibling;
                }
            }
        }
    }
        
}