var restGearMgmt = restGearMgmt || {};

(function(){

	'use strict';

	restGearMgmt.ConfTileView = Backbone.View.extend({
		tagName: 'div',
		intialize: function () {
			this.tileTemplate = '<div><span class="config-app-name">{{app-name}}</span></div>';
		},
		render: function() {
			 var tileTemplate = '<div class="row conf-tile"><div class="col-md-12"><span class="config-app-name">{{app-name}}</span></div></div>';

			this.$el.html(tileTemplate.replace('{{app-name}}', this.model.toJSON().appName));
			return this;
		}
	});	

})();