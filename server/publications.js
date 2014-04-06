Meteor.publish('comicCovers', function(){
	return Covers.find();
});

Meteor.publish('comicSingle', function(thisId){
	return Comics.find({id: thisId});
});