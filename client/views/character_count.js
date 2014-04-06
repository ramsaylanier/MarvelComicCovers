Template.characterCount.events = {
	'click #getCharacters' : function(e){
		e.preventDefault();
		$('#getCharacters').attr('disabled','true').html('loading...');

		Meteor.call('getCharacters', function(error, result){
			if(error){
				console.log("error: " + error)
			} else {
				console.log("result: " + result.data.data.results);
				Session.set("characters",result.data.data.results);
			}

			$('#getCharacters').removeAttr('disabled').html('Get Characters');	
		})
	}
}

Template.characterCount.characters = function(){
	var characters = Session.get("characters");
	return characters;
}