Comics = new Meteor.Collection("comics");
Covers = new Meteor.Collection("covers");

Meteor.methods({
	vote: function(title){
		comic = Covers.findOne({title: title});
		console.log(comic);
		updatedComic = Covers.update({_id: comic._id}, {$inc: {score:1}});
		console.log(updatedComic);
		return updatedComic;
	}
})