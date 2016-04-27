var restGearMgmt = restGearMgmt || {};

(function() {
	
	restGearMgmt.bootstrapApp = function () {
		restGearMgmt.elements = {
			$appContainer: $('.rest-gear-app-cont'),
			$btnAddConf: $('.gear-conf-add'),
			$btnEditConf: $('.gear-conf-edit'),
			$btnDeleteConf: $('.gear-conf-delete')
		}

		bindAppEvents();
		new restGearMgmt.TileContainerView();
		
		restGearMgmt.confActionBar.render();

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
		restGearMgmt.currentConfView = view;
		if (evt.namespace === "configReloaded") {
			var confModelData = _.extend({mode: 'view'}, {data:restGearMgmt.tileConfCollection.first().toJSON()});
			restGearMgmt.confInfoModel.set(confModelData);
		}
		else if (evt.namespace === "refreshConfigInf") {
			// var confModelData = _.extend({mode: 'view'}, {data:view.model.toJSON()});
			restGearMgmt.confInfoModel.set({data:view.model.toJSON()});
		}
	}

	function editAppConf(evt, view){
		view.model.set({mode: 'edit'});
	}

	function bindAppEvents(){
		restGearMgmt.elements.$appContainer.on('restgear.refreshConfigInf', refreshConfigInf);
		restGearMgmt.elements.$appContainer.on('restgear.configReloaded', refreshConfigInf);
		restGearMgmt.elements.$appContainer.on('restgear.addConfiguration', editAppConf);
		restGearMgmt.elements.$appContainer.on('restgear.editConfiguration', editAppConf);
	}

})();