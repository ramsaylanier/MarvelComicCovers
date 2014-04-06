Meteor.publish('comicCovers', function(){
	return Covers.find();
});

Meteor.publish('comicStats', function(){
	return Comics.find({}, {fields: {id: 1, title: 1, score: 1, thumbnail: 1}, sort: {score: -1}, limit: 10});
});

Meteor.publish('comicSingle', function(thisId){
	return Comics.find({title: thisId});
});