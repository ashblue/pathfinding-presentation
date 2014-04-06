window.Map = window.Class.extend({
    data: null, // Current map

    init: function (data) {
        this.data = data;
    },

    outOfBounds: function (x, y) {
        return x < 0 || x >= this.data[0].length ||
            y < 0 || y >= this.data.length;
    },

    getWidthInTiles: function () {
        return this.data[0].length;
    },

    getHeightInTiles: function () {
        return this.data.length;
    },

    blocked: function (x, y) {
        if (this.outOfBounds(x, y)) {
            return true;
        }

        if (this.data[y][x] === 0) {
            return true;
        }

        return false;
    },

    getNeighbors: function (x, y) {
        var neighbors = [];

        // Check left, right, top, bottom
        if (!this.blocked(x, y - 1)) neighbors.push(new window.Tile(x, y - 1));
        if (!this.blocked(x + 1, y)) neighbors.push(new window.Tile(x + 1, y));
        if (!this.blocked(x, y + 1)) neighbors.push(new window.Tile(x, y + 1));
        if (!this.blocked(x - 1, y)) neighbors.push(new window.Tile(x - 1, y));

        return neighbors;
    },


    // Only works when moving to adjacent levels
    getCost: function (xC, yC, xT, yT) {
        return this.data[yT][xT];
    }
});
