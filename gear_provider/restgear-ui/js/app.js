var restGearMgmt = restGearMgmt || {};

$(function(){

	'use strict';

	restGearMgmt.$appContainer = $('.rest-gear-app-cont');
	restGearMgmt.bootstrapApp();

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