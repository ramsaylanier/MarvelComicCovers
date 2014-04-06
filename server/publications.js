Meteor.publish('comicCovers', function(){
	return Covers.find();
})