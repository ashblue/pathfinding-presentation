$(document).ready(function () {
    var _event = {
        clickBtn: function () {
            $(this).parents('.pathfinder').toggleClass($(this).data('class'));
        }
    };

     window.Toggle = window.Class.extend({
         $el: null,
         $grid: null,

         init: function ($el) {
             this.$el = $el;

             this.addButton('Grid', 'grid');
             this.addButton('Type', 'type');
         },

         addButton: function (title, className) {
             var $btn = $('<button data-class="' + className + '">' + title + '</button>');
             this.$el.append($btn);
             $btn.click(_event.clickBtn);
         }
    });
});