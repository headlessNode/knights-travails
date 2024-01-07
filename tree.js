import { alreadyVisited, getPossibleMoves } from "./index.js";
export class Node{
    constructor(data){
        this.data = data;
        this.parent = null;
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
    shortestPath(end){
        let queue = [this.root];
        let path = [];

        while(queue.length > 0){
            let currNode = queue.shift();
            const isEqualToEnd = currNode.data.every((currentValue, index)=> currentValue === end[index]);
            if(isEqualToEnd){
                while(currNode){
                    path.push(currNode.data);
                    currNode = currNode.parent;
                }
                break;
            }
            if(currNode.firstChild){
                let child = currNode.firstChild;
                while(child){
                    queue.push(child);
                    child = child.nextSibling;
                }
            }
            
        }
        console.log(path);
    }
    possibleMovesOfNode(end) {
        let queue = [this.root];
    
        while (queue.length > 0) {
            let currNode = queue.shift();
            const isEqualToEnd = currNode.data.every((currentValue, index)=> currentValue === end[index]);
            if(isEqualToEnd){
                break;
            }
            let movesArray = getPossibleMoves(currNode.data);
            currNode.firstChild = childTree(movesArray, 0, movesArray.length - 1);
            currNode.firstChild.parent = currNode;
            let child = currNode.firstChild;
            while (child) {
                child.parent = currNode;
                queue.push(child);
                child = child.nextSibling;
            }
        }
    }
        
}