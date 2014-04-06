var publicKey = "f04d9b49820020bb98295795dfe66b4a";
var privateKey = "4fecba3c3b4f8fd4c57e49c5f3a94478cfcf5fbe";

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Meteor.methods({
	getCovers: function(){
		var year = getRandomInt(1960, 2013);
		var month = getRandomInt(1,12);

		var monthStr = month<10?"0"+month:month;
		var eom = month==2?28:30;
		var beginDateStr = year + "-" + monthStr + "-01";
		var endDateStr = year + "-" + monthStr + "-" + eom;
		var url = "http://gateway.marvel.com/v1/public/comics?limit=100&format=comic&formatType=comic&dateRange="+beginDateStr+"%2C"+endDateStr;
		var date = new Date();
		var hash = CryptoJS.MD5(date + privateKey + publicKey).toString();

		var result = HTTP.get(url,
			{params:{	ts: date,
						apikey: publicKey,
						hash: hash
					}
			}
		);

		var comics = result.data.data.results;
		_.each(comics, function(comic){
			if (Comics.findOne({id: comic.id})){
				console.log("comic already exists");
			} else {
				Comics.insert(comic);
				console.log("comic added");
			}
		});
	}
})