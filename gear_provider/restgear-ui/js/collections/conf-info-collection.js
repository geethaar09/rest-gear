var restGearMgmt = restGearMgmt || {};

(function() {
	'use sctrict';

	var ConfInfoCollection = Backbone.Collection.extend({
		model: restGearMgmt.ConfInfoModel
	});

	restGearMgmt.confInfoCollection = new ConfInfoCollection();

})();