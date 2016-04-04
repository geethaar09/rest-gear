var restGearMgmt = restGearMgmt || {};

$(function(){

	'use strict';
	
	new restGearMgmt.TileContainerView();

	/*****
		Temporary Experimental Code. To be deleted
	******/

	$('.btn-conf-edit').on('click', function () {
		var formData = $('form-conf-edit').serialize();
		console.log(formData);

	});


	/*****
		End Temporary Experimental Code.
	******/

});