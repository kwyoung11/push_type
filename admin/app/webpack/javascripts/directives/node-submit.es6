import Vue from 'vue';
import $ from 'jquery';

export default Vue.directive('node-submit', {
  bind: function() {
    let $el = $(this.el);
    $el.on('click', function(e) {
      if ( !$(e.target).is('span') ) {
        if ($(e.target).hasClass("success")) {
      		$(".node-status").val("published");
      	} else {
      		$(".node-status").val("draft");
      	}

      	$el.parents('form').submit();
      }
    })
  }
})