var restGearMgmt = restGearMgmt || {};

(function () {

	'use strict';

	restGearMgmt.ShowConfig = Backbone.View.extend({
		tagName: 'div',
		events: {
			'click .btn-edit-conf': 'editConfiguration'
		},
		initialize: function () {
			this.listenTo(restGearMgmt.confInfoCollection, 'reset', this.render);
			this.listenTo(this.model, 'change', this.render);

		},
		template: _.template($('#config-info-right').html()),
		render: function () {
			this.$el.detach();
			this.$el.html(this.template(restGearMgmt.confInfoCollection.first().toJSON()));
			$('.gear-conf-info').html(this.$el);
			return this;
		},

		editConfiguration: function() {
			console.log(this.model);
		}
	});

	// restGearMgmt.showConfig = new ShowConfig({ model: new restGearMgmt.ConfigInfoModel});
	restGearMgmt.showConfig = new restGearMgmt.ShowConfig({model: restGearMgmt.confInfoModel});

})();