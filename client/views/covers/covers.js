	//create a temporary collection on the client and make it a reactive data source
	//so that reactivity happens at the individual level
	var tempCovers = new Meteor.Collection(null);
	var coversDep = new Deps.Dependency;

	//get 2 random covers - used to set reactive dependency
	var getCovers = function(){

		//set the dependency
		coversDep.depend();

		var arrayCovers = tempCovers.find().fetch();

		//get 2 random objects from arrayCovers
		var sampledCovers = _.sample(arrayCovers[0],2);

		return sampledCovers;
	}

	var setCovers = function(comic){
		coversDep.changed();
	}

	Template.covers.rendered = function(){
		//copy the server-side collection Covers into the temporary client-side collection
		covers = Covers.find().fetch();
		tempCovers.insert(covers);
	}

	Template.covers.events({
		'click .comic-cover': function(e){
			var title = $(e.target).data('title');

			//make a call to show that the reactive data source has changed
			setCovers();

			Meteor.call('vote', title, function(error,id){
				clearErrors(); 
				if(error){
					throwError(error.reason, 'error');
				} else {
					throwError('Voted!', 'success');
					Router.go('/');
				}
			})
		}
	});

//get two comic book objects from Comics collection
Template.covers.helpers({
	cover: function(){
		return getCovers();
	}
});

Deps.autorun(function(){
	getCovers();
});