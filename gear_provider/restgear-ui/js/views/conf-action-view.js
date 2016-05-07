var restGearMgmt = restGearMgmt || {};

(function(){
	var ConfActionBar = Backbone.View.extend({
		events: {
			'click': function() {console.log('sfsdf');},
			'click .gear-conf-edit': 'editConf',
			'click .gear-conf-delete': 'delConf',
		},
		initialize: function() {
			
		},
		render: function() {
			var actionBarContent = '<div class="gear-action-bar-inner pull-right">' +
            '<span class="glyphicon glyphicon-plus-sign gear-action-conf gear-conf-add gear-action-icon"></span>' +
            '<span class="glyphicon glyphicon-edit gear-action-conf gear-conf-edit gear-action-icon"></span>' +
            '<span class="glyphicon glyphicon-minus-sign gear-action-conf gear-conf-delete gear-action-icon"></span></div>';
          
			$('.gear-action-bar').append(actionBarContent);
		},
		addConf: function() {
			console.log("Add Config");
		},
		editConf: function() {
			console.log("Edit Config");

		},
		delConf: function() {
			console.log("Del Config");			
		}
	});

	 restGearMgmt.confActionBar = new ConfActionBar();

})();