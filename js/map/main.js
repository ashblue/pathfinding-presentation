$(document).ready(function () {
    var pathfindingSetup = {
        init: function () {
            var self = this;

            $('.pathfinder').each(function () {
                var $el = $(this);
                var $start = $el.find('[data-pos="start"]');
                var $end = $el.find('[data-pos="end"]');

                new window.Toggle($el);

                var map = new Map(self.getMap($el));
                var pathfinder = new PathFinder(map);
                var start = {
                    x: $start.index(),
                    y: $start.parent('div').index()
                };
                var end = {
                    x: $end.index(),
                    y: $end.parent('div').index()
                };

                var path = pathfinder.findPath(start.x, start.y, end.x, end.y);

                if (!$el.hasClass('history')) {
                    var stepClicker = new ClickStep($el, path);
                } else {
                    var historyClicker = new ClickHistory($el, pathfinder.history);
                }
            });
        },

        getMap: function ($el) {
            var $rows = $el.find('.row');
            var stack = [];

            $rows.each(function () {
                var stackRow = [];
                $(this).children().each(function () {
                    var cost = parseInt($(this).data('cost'), 10);
                    if (isNaN(cost)) cost = 1;
                    stackRow.push(cost);
                });
                stack.push(stackRow);
            });

            return stack;
        }
    };

    pathfindingSetup.init();
});