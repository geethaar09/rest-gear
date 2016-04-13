var restGearMgmt = restGearMgmt || {};

(function(){

	'use strict';

	restGearMgmt.TileContainerView = Backbone.View.extend({

		el: '.demo-navigation',

		initialize: function () {
			this.listenTo(restGearMgmt.tileConfCollection,'add', this.appendConf);		
			this.listenTo(restGearMgmt.tileConfCollection,'reset', this.appendAllConf);

			this.$configsElem = $('.config-parent');

			// this.$el.trigger('')
			// restGearMgmt.tileConfCollection.fetch({reset: true});

		},
		appendConf: function (conf) {
			var tile = new restGearMgmt.ConfTileView({ model: conf});
			// this.$configsElem.append(tile.render().el);
			this.$el.append(tile.render().el);
		},

		appendAllConf: function () {			
			restGearMgmt.tileConfCollection.each(this.appendConf, this);
			this.$el.trigger('restgear.configReloaded');
			// var ConfInfoModel = Backbone.Model;
			// var confModelData = _.extend({mode: 'view'}, restGearMgmt.tileConfCollection.first().toJSON());
			// restGearMgmt.confInfoCollection.reset(confModelData);
			// restGearMgmt.confInfoModel = new  Backbone.Model(confModelData);
			// var confInfoPanel = new restGearMgmt.ShowConfig({ model: new ConfInfoModel(confModelData) });
			// $('.gear-conf-info').html(confInfoPanel.render().el);

		}

	});

})();