$(document).ready(function () {
    var _event = {
        clickMap: function () {
            this.nextStep();
        }
    };

    window.ClickStep = window.Class.extend({
        $el: null,
        stack: null,
        index: 0,

        init: function ($el, stack) {
            this.$el = $el.find('.matrix');
            this.stack = stack;
            this.index = stack.length - 1;

            this.bind();
        },

        bind: function () {
            this.$el.click(_event.clickMap.bind(this));
        },

        nextStep: function () {
            this.index -= 1;

            if (this.index < 0) {
                this.index = 0;
                return;
            }

            var pos = this.stack[this.index];
            var $player = this.$el.find('.player');
            this.getTile(pos.x, pos.y).append($player);
        },

        getTile: function (x, y) {
            return this.$el.find('.row:nth-child(' + (y + 1) + ') .voxel:nth-child(' + (x + 1) + ')');
        }
    });

    window.ClickHistory = window.ClickStep.extend({
        init: function ($el, stack) {
            this._super($el, stack);
            this.index = 0;
        },

        nextStep: function () {
            if (this.index >= this.stack.length) {
                this.index = this.stack.length;
                return;
            }

            var tile = this.stack[this.index].step;
            var group = this.stack[this.index].group;
            var $tile = this.getTile(tile.x, tile.y);
            var direction = '';

            // Delete all contents except player span
            $tile.children().not('.player').detach();


            if (tile.direction) {
                direction = tile.direction;
            }

            // Inject direction, open/closed, step cost, heuristic cost, total
            $tile.removeClass('open')
                .removeClass('closed')
                .addClass(group)
                .addClass(tile.direction)
                .append('<span class="stat step">' + tile.g + '</span> ' +
                    '<span class="stat heuristic">' + tile.h + '</span> ' +
                    '<span class="stat total">' + tile.f + '</span>' +
                    '<span class="direction ' + direction + '">' + direction + '</span>');

            this.index += 1;
        }
    });
});