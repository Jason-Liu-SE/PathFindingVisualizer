class Node {
    static parent = null;

    constructor(id, x, y, state) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.f = 0;
        this.h = 0;
        this.g = 0;
        this.state = state;
    }
}

export default Node;
