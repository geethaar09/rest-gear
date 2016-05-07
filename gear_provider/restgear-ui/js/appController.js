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
		
		// restGearMgmt.confActionBar.render();

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
		// restGearMgmt.currentConfView = view;
		if (evt.namespace === "configReloaded") {
			//TODO: Need to get the first tile view when the tile container is refreshed
			// restGearMgmt.currentSelectedView = restGearMgmt.currentSelectedView || restGearMgmt.tileConfCollection.first();
			var confModelData = _.extend({mode: 'view'}, {data: restGearMgmt.tileConfCollection.first().toJSON()});
			restGearMgmt.confInfoModel.set(confModelData);
			$('.gear-conf-card').parent().removeClass('gear-bg-blue');	
			$('.gear-conf-card').parent().first().addClass('gear-bg-blue');

		}
		else if (evt.namespace === "refreshConfigInf") {
			restGearMgmt.currentSelectedView = view;
			restGearMgmt.confInfoModel.set({data:view.model.toJSON()});
			$('.gear-conf-card').parent().removeClass('gear-bg-blue');
			view.$el.addClass('gear-bg-blue');
		}
	}

	function appModeAdd(evt){
		var confModelData = _.extend({mode: 'new'}, {data:{}});
		restGearMgmt.confInfoModel.set(confModelData);
	}

	function appModeEdit(evt, view){
		view.model.set({mode: 'edit'});
	}

	function saveConfig(evt, view){	
		var formData = $('.gear-conf-form').serializeArray(),
			data = {};
		for ( var i in formData) {
			data[formData[i].name] = formData[i].value;
		}
		data.GUID = view.model.toJSON().data.GUID;
		// data.appName = this.model.toJSON().data.appName;
		// data.file = $('#jsonInputFile')[0].files[0];
		$.ajax({
		  method: "POST",
		  url: "/config/addChangeAppConf",
		  data: data
		})
		.done(function(data) {
		  	// self.model.set({mode: 'view', data: data.newConf});
			restGearMgmt.tileConfCollection.fetch({reset: true});
		  	// self.$el.trigger('restgear.configReloaded');
			// console.log(self);
		});
		// console.log(data);
	}	

	function bindAppEvents(){
		restGearMgmt.elements.$appContainer.on('restgear.refreshConfigInf', refreshConfigInf);
		restGearMgmt.elements.$appContainer.on('restgear.configReloaded', refreshConfigInf);
		restGearMgmt.elements.$appContainer.on('restgear.changeModeAdd', appModeAdd);
		restGearMgmt.elements.$appContainer.on('restgear.changeModeEdit', appModeEdit);
		restGearMgmt.elements.$appContainer.on('restgear.saveConfig', saveConfig);


	}

})();