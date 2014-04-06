Comics = new Meteor.Collection("comics");
Covers = new Meteor.Collection("covers");

Meteor.methods({
	vote: function(title){
		comic = Covers.findOne({title: title});
		updatedCover = Covers.update({_id: comic._id}, {$inc: {score:1}});
		updatedComic = Comics.update({_id: comic._id}, {$inc: {score:1}});
	
		return [updatedComic, updatedCover];
	}
})