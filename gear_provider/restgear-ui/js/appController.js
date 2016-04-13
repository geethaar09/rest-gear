var restGearMgmt = restGearMgmt || {};

(function() {
	
	restGearMgmt.bootstrapApp = function () {
		bindAppEvents();
		new restGearMgmt.TileContainerView();

		restGearMgmt.showConfig = new restGearMgmt.ShowConfig({model: restGearMgmt.confInfoModel});

		restGearMgmt.tileConfCollection.fetch({reset: true});

		console.log("App Initialized");
	}

	function _refreshConfigInf(evt, view) {
		var currentMode = restGearMgmt.confInfoCollection.first().get('mode');
		var confModelData = _.extend({mode: currentMode}, view.model.toJSON());
		restGearMgmt.confInfoCollection.reset(confModelData);
	}

	function refreshConfigInf(evt, view) {
		if (evt.namespace === "configReloaded") {
			var confModelData = _.extend({mode: 'view'}, {data:restGearMgmt.tileConfCollection.first().toJSON()});
			restGearMgmt.confInfoModel.set(confModelData);
		}
		else if (evt.namespace === "refreshConfigInf") {
			// var confModelData = _.extend({mode: 'view'}, {data:view.model.toJSON()});
			restGearMgmt.confInfoModel.set({data:view.model.toJSON()});
		}
	}

	function bindAppEvents(){
		restGearMgmt.$appContainer.on('restgear.refreshConfigInf', refreshConfigInf);
		restGearMgmt.$appContainer.on('restgear.configReloaded', refreshConfigInf);

	}

})();