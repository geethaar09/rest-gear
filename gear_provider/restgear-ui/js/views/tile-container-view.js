var restGearMgmt = restGearMgmt || {};

(function(){

	'use strict';

	restGearMgmt.TileContainerView = Backbone.View.extend({

		el: '.demo-navigation',
		events: {
			'click .gear-conf-add': 'addConf',
			// 'click .gear-conf-edit': 'editConf',
			'click .gear-conf-delete': 'delConf'
		},

		initialize: function () {
			this.listenTo(restGearMgmt.tileConfCollection,'add', this.appendConf);		
			this.listenTo(restGearMgmt.tileConfCollection,'reset', this.appendAllConf);

			this.$configsElem = $('.config-parent');

			// this.$el.trigger('')
			// restGearMgmt.tileConfCollection.fetch({reset: true});

		},
		appendConf: function (conf) {
			var tile = new restGearMgmt.ConfTileView({ model: conf});
			this.$el.append(tile.render().el);
		},

		appendAllConf: function () {
			this.$el.empty();
			prepareContainer(this.$el);
			restGearMgmt.tileConfCollection.each(this.appendConf, this);
			this.$el.trigger('restgear.configReloaded');
		},
		addConf: function() {
			console.log("Add Config");
			this.$el.trigger('restgear.changeModeAdd');

		},
		editConf: function() {
			console.log("Edit Config");

		},
		delConf: function() {
			console.log("Del Config");			
		}			

	});

	function prepareContainer($container) {

		var actionContainerTemplate = '<section class="gear-action-bar">' +
            '<div class="gear-action-bar-inner pull-right">' +
            '<span class="glyphicon glyphicon-plus gear-action-conf gear-conf-add"></span>' +
            '<!-- <span class="glyphicon glyphicon-edit gear-action-conf gear-conf-edit"></span> -->' +
            '<span class="glyphicon glyphicon-minus gear-action-conf gear-conf-delete"></span>' +
            '</div></section>';

        $container.empty();
        $container.append(actionContainerTemplate);
	}

})();