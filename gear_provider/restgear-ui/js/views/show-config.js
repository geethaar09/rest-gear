var restGearMgmt = restGearMgmt || {};

(function () {

	'use strict';

	restGearMgmt.ShowConfig = Backbone.View.extend({
		tagName: 'div',
		events: {
			'click .btn-edit-conf': 'changeModeEdit',
			'click .btn-save-conf': 'saveConfiguration',
			'click .btn-cancel-conf': 'cancelConfiguration',
		},
		initialize: function () {
			// this.listenTo(restGearMgmt.confInfoCollection, 'reset', this.render);
			this.listenTo(this.model, 'change', this.render);

		},
		template: _.template($('#config-info-right').html()),
		render: function () {
			var $cont = $('.gear-conf-info'),
				$pa = $cont.parent();
			this.$el.detach();
			$cont.detach();
			this.$el.html(this.template(this.model.toJSON()));			
			$cont.html(this.$el);
			$pa.append($cont);
			return this;
		},

		changeModeEdit: function() {			
			this.$el.trigger('restgear.changeModeEdit', this);			
		},
		cancelConfiguration: function () {
			this.model.set({mode: 'view', 'data': restGearMgmt.currentSelectedView.model.toJSON()});			
		},
		saveConfiguration: function() {
			this.$el.trigger('restgear.saveConfig', this);
		},
		updateModel: function (data) {			    
		}

	});

	// restGearMgmt.showConfig = new ShowConfig({ model: new restGearMgmt.ConfigInfoModel});
})();