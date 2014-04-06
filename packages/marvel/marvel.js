Marvel = {};

Marvel.getCharacters = function(){
	var timeStamp = new Date().toTimeString();
	var hash = timeStamp+Meteor.settings.marvelPrivate+Meteor.settings.marvelPublic;
	var hashed = CryptoJS.MD5(hash).toString();

	var characterList = Meteor.http.get("http://gateway.marvel.com/v1/public/characters?",{
		params:{
			"apikey": Meteor.settings.marvelPublic,
			"ts": timeStamp,
			"hash": hashed
		}
	});

	return characterList.data.count;
}