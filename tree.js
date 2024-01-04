class Node{
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

export class Tree{
    constructor(dataArray){
        this.root = buildTree(dataArray, 0, dataArray.length - 1);
    }

}