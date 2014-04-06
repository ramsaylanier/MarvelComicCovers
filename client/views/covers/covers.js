Template.covers.events({
	'click .comic-cover': function(e){
		var title = $(e.target).data('title');

		Meteor.call('vote', title, function(error,id){
			clearErrors(); 
			if(error){
				throwError(error.reason, 'error');
			} else {
				throwError('Voted!', 'success');
			}
		})
	}
});

//get two comic book objects from Comics collection
Template.covers.helpers({
	cover: function(covers){
		return _.sample(covers, 2);
	}
});