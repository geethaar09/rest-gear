var restGearMgmt = restGearMgmt || {};

(function(){

	'use strict';

	restGearMgmt.TileContainerView = Backbone.View.extend({

		el: '#conf-container',

		initialize: function () {
			this.listenTo(restGearMgmt.tileConfCollection,'add', this.appendConf);		
			this.listenTo(restGearMgmt.tileConfCollection,'reset', this.appendAllConf);

			this.$configsElem = $('.config-parent');

			restGearMgmt.tileConfCollection.fetch({reset: true});

		},
		appendConf: function (conf) {
			var tile = new restGearMgmt.ConfTileView({ model: conf});
			this.$configsElem.append(tile.render().el);

		},

		appendAllConf: function () {
			restGearMgmt.tileConfCollection.each(this.appendConf, this);
		}

	});

})();