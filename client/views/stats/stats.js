Template.stats.topCovers = function(){
	return Covers.find({score: {$gt: 0}}, {sort: {score:-1}, limit: 10});
}