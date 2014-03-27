$(document).ready(function () {
    var animate = {
        init: function () {
            this.bind();
        },

        bind: function () {
            $('.click-animate').click(function () {
                $(this).addClass('active');
            });
        }
    };

    animate.init();
});