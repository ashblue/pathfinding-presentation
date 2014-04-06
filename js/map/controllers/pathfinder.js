// Pathfinder API - Returns a path to the target
// Good place to add details such as flying, swimming, ect.
window.PathFinder = window.Class.extend({
    map: null, // Map class reference
    closed: null, // Taken steps
    open: null, // Available steps that can be taken
    history: null,
    step: 0, // Step count
    maxSearchDistance: 100, // Maximum number of steps that can be taken before shutting down a closed path

    init: function (map) {
        this.closed = [];
        this.open = [];
        this.history = [];
        this.map = map;
    },

    addOpen: function (step) {
        this.addHistory(step, 'open');
        this.open.push(step);
        return this;
    },

    // Remove a step that already exists by object memory address (not actual x and y values)
    removeOpen: function (step) {
        for (var i = 0; i < this.open.length; i++) {
            if (this.open[i] === step) this.open.splice(i, 1);
        }
        return this;
    },

    // Check if the step is already in the open set
    inOpen: function (step) {
        for (var i = 0; i < this.open.length; i++) {
            if (this.open[i].x === step.x && this.open[i].y === step.y)
                return this.open[i];
        }

        return false;
    },

    // Get the lowest costing tile in the open set
    getBestOpen: function () {
        var bestI = 0;
        for (var i = 0; i < this.open.length; i++) {
            if (this.open[i].f < this.open[bestI].f) bestI = i;
        }

        return this.open[bestI];
    },

    addClosed: function (step) {
        this.addHistory(step, 'closed');
        this.closed.push(step);
        return this;
    },

    // Check if the step is already in the closed set
    inClosed: function (step) {
        for (var i = 0; i < this.closed.length; i++) {
            if (this.closed[i].x === step.x && this.closed[i].y === step.y)
                return this.closed[i];
        }

        return false;
    },

    addHistory: function (step, group) {
        this.history.push({
            step: step,
            group: group
        });
    },

    findPath: function (xC, yC, xT, yT) {
        var current, // Current best open tile
            neighbors, // Dump of all nearby neighbor tiles
            neighborRecord, // Any pre-existing records of a neighbor
            stepCost, // Dump of a total step score for a neighbor
            i;

        // You must add the starting step
        this.reset()
            .addOpen(new window.Step(xC, yC, xT, yT, this.step, false));

        while (this.open.length !== 0) {
            this.step++;
            current = this.getBestOpen();

            // Check if goal has been discovered to build a path
            if (current.x === xT && current.y === yT) {
                return this.buildPath(current, []);
            }

            // Move current into closed set
            this.removeOpen(current)
                .addClosed(current);

            // Get neighbors from the map and check them
            neighbors = this.map.getNeighbors(current.x, current.y);
            for (i = 0; i < neighbors.length; i++) {
                this.step++;

                // Get current step and distance from current to neighbor
                stepCost = current.g + this.map.getCost(current.x, current.y, neighbors[i].x, neighbors[i].y);

                // Check for the neighbor in the closed set
                // then see if its cost is >= the stepCost, if so skip current neighbor
                neighborRecord = this.inClosed(neighbors[i]);
                if (neighborRecord && stepCost >= neighborRecord.g)
                    continue;

                // Verify neighbor doesn't exist or new score for it is better
                neighborRecord = this.inOpen(neighbors[i]);
                if (!neighborRecord || stepCost < neighborRecord.g) {
                    if (!neighborRecord) {
                        this.addOpen(new window.Step(neighbors[i].x, neighbors[i].y, xT, yT, stepCost, current));
                    } else {
                        neighborRecord.parent = current;
                        neighborRecord.g = stepCost;
                        neighborRecord.f = stepCost + neighborRecord.h;
                    }
                }
            }
        }

        return false;
    },

    // Recursive path buliding method
    buildPath: function (tile, stack) {
        stack.push(tile);

        if (tile.parent) {
            return this.buildPath(tile.parent, stack);
        } else {
            return stack;
        }
    },

    reset: function () {
        this.closed = [];
        this.open = [];
        return this;
    }
});