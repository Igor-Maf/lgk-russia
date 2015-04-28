'use scrict';

(function($) {
	var	dropItem = $('#itemDropdown'),
		dropArea = dropItem.find('.drop__list');

	dropItem.hover(function() {
		if (dropItem.hasClass('drop')) {
			dropItem.removeClass('drop');
			dropArea.hide();
		} else {
			dropItem.addClass('drop');
			dropArea.show();
		}
	}, function() {
		dropItem.removeClass('drop');
		dropArea.hide();
	})
}(jQuery));