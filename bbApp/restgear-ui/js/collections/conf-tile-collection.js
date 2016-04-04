var restGearMgmt = restGearMgmt || {};

(function() {
	'use sctrict';

	var TileConfCollection = Backbone.Collection.extend({
		model: restGearMgmt.TileConf,
		url: 'http://localhost:8081/getAppConf'
	});

	restGearMgmt.tileConfCollection = new TileConfCollection();

})();