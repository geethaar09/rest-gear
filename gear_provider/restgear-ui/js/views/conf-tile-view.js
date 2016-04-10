var restGearMgmt = restGearMgmt || {};

(function(){

	'use strict';

	restGearMgmt.ConfTileView = Backbone.View.extend({
		tagName: 'div',
		events: {
			'click': 'confSelected'	
		},
		intialize: function () {
			this.tileTemplate = '<div><span class="config-app-name">{{app-name}}</span></div>';
		},
		render: function() {
			 // var tileTemplate = '<div class="row conf-tile"><div class="col-md-12"><span class="config-app-name">{{app-name}}</span></div></div>';
			var confMethod = this.model.toJSON().appConf.type,
				confName = this.model.toJSON().appName,
				methodIcon;
			switch(confMethod) {
				case 'GET':
					methodIcon = 'glyphicon-import';
					break;
			case 'POST':
					methodIcon = 'glyphicon-export';
					break;
			case 'PUT':
					methodIcon = 'glyphicon-floppy-saved';
					break;
			case 'GET':
					methodIcon = 'glyphicon-floppy-remove';
					break;															
			 };
			 var tileTemplate = '<div class="mdl-navigation__link conf-card"><div class="tile-title">{{app-name}}</div><div class="tile-info"><span class="glyphicon '+ methodIcon + '" aria-hidden="true"></span> {{method}}</div></div>';
			 var tile = tileTemplate.replace('{{app-name}}', confName).replace('{{method}}',  confMethod);
			this.$el.html(tile);
			return this;
		},

		confSelected: function () {
			var currentMode = restGearMgmt.confInfoCollection.first().get('mode');
			var confModelData = _.extend({mode: currentMode}, this.model.toJSON());
			restGearMgmt.confInfoCollection.reset(confModelData);

			// var confInfoPanel = new restGearMgmt.ShowConfig({ model: new ConfInfoModel(confModelData)});
			// $('.gear-conf-info').html(confInfoPanel.render().el);
		}
	});	

})();