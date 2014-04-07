$(document).ready(function () {
    var _private = {
        // Euclidean distance, C = current, T = target
        distanceE: function (xC, yC, xT, yT) {
            var dx = xT - xC, dy = yT - yC;
            return Math.sqrt((dx * dx) + (dy * dy));
        },

        // Manhattan distance (use this one)
        distanceM: function (xC, yC, xT, yT) {
            var dx = Math.abs(xT - xC), dy = Math.abs(yT - yC);
            return dx + dy;
        },


        getDirection: function (x1, y1, x2, y2) {
            var result;

            if (x1 > x2) {
                result = 'west';
            } else if (x1 < x2) {
                result = 'east';
            } else if (y1 > y2) {
                result = 'north';
            } else if (y1 < y2) {
                result = 'south';
            }

            return result;
        }
    };

    window.Step = function(xC, yC, xT, yT, totalSteps, parentStep) {
        // herustic
        var h = _private.distanceM(xC, yC, xT, yT);

        this.direction = _private.getDirection(parentStep.x, parentStep.y, xC, yC);
        this.x = xC;
        this.y = yC;
        this.g = totalSteps;
        this.h = h;
        this.f = totalSteps + h;
        this.parent = parentStep;
    };
});