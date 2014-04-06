if ( Covers.find().count() === 0 ) {
	var comics = Comics.find({$where: "this.images.length > 0"}, {fields: {id: 1, title:1, thumbnail: 1}});
	comics.forEach(function(comic){
		Covers.insert(comic);
	})
}