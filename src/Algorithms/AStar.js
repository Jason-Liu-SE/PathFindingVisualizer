// const printNodes = (nodes) => {
//     let text = '';
//     let row = 0;
//     for (let node of nodes) {
//         if (row !== node.y) {
//             row = node.y;
//             text = text + '\n';
//         }

//         if (node.state === 'start') text = text + ' X';
//         else if (node.state === 'end') text = text + ' O';
//         else if (node.state === 'open') text = text + ' .';
//         else if (node.state === 'blocked') text = text + ' #';
//         else if (node.state === 'next') text = text + ' ^';
//         else if (node.state === 'current') text = text + ' $';
//         else if (node.state === 'visited') text = text + ' !';
//         else if (node.state === 'path') text = text + ' @';
//     }

//     console.log(text);
// };

const getNode = (nodes, x, y) => {
    for (let node of nodes) {
        if (node.x === x && node.y === y) return node;
    }

    return null;
};

const getNodeByState = (nodes, state) => {
    for (let node of nodes) {
        if (node.state === state) return node;
    }

    return null;
};

const findNextMoves = (nodes, currNode) => {
    // storing the cells in each cardinal direction
    let leftNode = getNode(nodes, currNode.x - 1, currNode.y);
    let rightNode = getNode(nodes, currNode.x + 1, currNode.y);
    let upNode = getNode(nodes, currNode.x, currNode.y - 1);
    let downNode = getNode(nodes, currNode.x, currNode.y + 1);

    let nextNodes = [];

    // seraching the four cardinal directions for possible moves
    if (validMove(leftNode)) nextNodes.push(JSON.parse(JSON.stringify(leftNode)));
    if (validMove(rightNode)) nextNodes.push(JSON.parse(JSON.stringify(rightNode)));
    if (validMove(upNode)) nextNodes.push(JSON.parse(JSON.stringify(upNode)));
    if (validMove(downNode)) nextNodes.push(JSON.parse(JSON.stringify(downNode)));

    return nextNodes;
};

const validMove = (node) => {
    if (node && node.state !== 'start' && node.state !== 'blocked' && node.stated !== 'visited') return true;

    return false;
};

const getManhattanDist = (node, target) => {
    return Math.abs(node.x - target.x) + Math.abs(node.y - target.y);
};

const setPath = (nodes, start, end) => {
    // retracing the path by starting at the end node
    end = end.parent; // ensures that the end node is unmodified

    while (end.id !== start.id && end.id !== end.parent.id) {
        getNode(nodes, end.x, end.y).state = 'path';
        end = end.parent;
    }
};

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function run(nodes, size, render, setFinished, delay) {
    ///////////////////////////////////////////////
    ////////////////// Set Up /////////////////////
    ///////////////////////////////////////////////
    render(nodes);

    let open = [];
    let closed = [];

    // populating the closed array
    for (let row = 0; row < size.y; row++) {
        const temp = [];
        for (let col = 0; col < size.x; col++) {
            temp.push([]);
        }

        closed.push(temp);
    }

    let openNode = null;
    let nextMoves = [];

    // finding the start cell and end cell
    let start = getNodeByState(nodes, 'start');
    let curr = JSON.parse(JSON.stringify(start));
    let target = getNodeByState(nodes, 'end');

    // initializing variables for A*
    curr.parent = curr;
    open.push(curr);

    ///////////////////////////////////////////////
    ///////////////// A* Algorithm ////////////////
    ///////////////////////////////////////////////
    while (open.length > 0) {
        // updating the state of the cell in the previous loop
        if (curr.state !== 'start' && curr.state !== 'end') getNode(nodes, curr.x, curr.y).state = 'visited';

        // removing the element on the open list with the lowest f
        curr = open.pop();
        if (curr.state !== 'start' && curr.state !== 'end') getNode(nodes, curr.x, curr.y).state = 'current';

        // indicated that the curr node has been visited
        closed[curr.y][curr.x] = curr;

        render(nodes);
        if (curr.id !== start.id) await timer(delay);

        // checking if curr is the desired node
        if (curr.id === target.id) {
            // setting the target's parent to curr's parent, and finishing the algorithm
            target.parent = curr.parent;

            setPath(nodes, start, target);

            break;
        }

        nextMoves = findNextMoves(nodes, curr);
        for (let node of nextMoves) {
            // checking if node has already been visited
            if (closed[node.y][node.x].id === node.id) continue;

            if (node.state !== 'start' && node.state !== 'end') getNode(nodes, node.x, node.y).state = 'next';

            // setting the parent of node
            node.parent = curr;

            // calculating the node's g, h, and f values
            node.g = curr.g + 1;
            node.h = getManhattanDist(node, target);
            node.f = node.g + node.h;

            // checking if the node is already in the open list
            openNode = open.find((elem) => {
                return elem.id === node.id ? elem : null;
            });

            // checking the openNode
            if (!openNode) {
                // node is not in the open list
                open.push(node);
            } else {
                // node is already in the open list
                if (node.g < openNode.g) {
                    openNode.g = node.g;
                    openNode.f = node.f;
                    openNode.parent = node.parent;
                }
            }

            // updating nodes
            getNode(nodes, node.x, node.y).h = node.h;
            getNode(nodes, node.x, node.y).g = node.g;
            getNode(nodes, node.x, node.y).f = node.f;
        }

        // sorting the open list
        open.sort((obj1, obj2) => {
            return obj2.f - obj1.f;
        });
    }

    if (curr.state !== 'start' && curr.state !== 'end') getNode(nodes, curr.x, curr.y).state = 'visited';

    render(nodes);
    setFinished();

    console.log(nodes);
}

exports.run = run;
