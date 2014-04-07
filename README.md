MarvelComicCovers
=================

A simple app built using Meteor that allows the user to compare two comic book covers and pick which one they like best


##Live Demo

See [the live demo](http://marvelcovers.meteor.com) for an example of how the app works.


##Marvel API

Currently, the code to fetch data from the Marvel API is not active - meaning there is no call to the function that pulls the data from the Marvel database. The reason for this is that currently, Marvel caps the number of calls to its database to 3000 a day per apikey. When initially setup the demo, I made several calls to the function that pulls data from Marvel and then stored it into my own Meteor collection. This way, one can access the data without making calls to the Marvel database. Currently, in the demo database, there are about 2500 comic book issues - the Marvel database has thousands upon thousands. The plan is to completely copy their database; however, their API only allows 100 issues to be returned per one call. 

###Getting Your Own API Key

You will need to go to [Marvel's developer portal](https://developer.marvel.com) and register for an account. Upon successfull registration, you will be given a public and a private api key. When making calls to their API from a server (the way this app is setup), the HTTP parameteres require a unique hash for each call - the hash consists of a time stamp, the public key, and the private key. Please refer to the code in [server.js](https://github.com/ramsaylanier/MarvelComicCovers/blob/master/server/server.js), where the private and public keys are stored.

###Getting data from Marvel for your own app

If you clone this repository your app will not work as their will be no comic book data in the local Mongo db. You have two options - either  a) clone the database that is in the [dump](https://github.com/ramsaylanier/MarvelComicCovers/tree/master/dump/meteor) folder, or b) build your own database using your own API key (as obtained above).

####Cloning the database
The database dump is contained in the dump folder of this git repository. You can clone this database dump to your own local Mongo db that is setup when you create a meteor app. Refer to (mongo's documentation)[http://docs.mongodb.org/manual/] on how to do this. It's a rather tedious task, but you should be able to Google around for exact steps should you go this route.

####Building your own
As mentioned above, the function pulling 100 titles at a time is already built in this app - however, there is currently no call to the function. Refer to [server.js](https://github.com/ramsaylanier/MarvelComicCovers/blob/master/server/server.js) for the function, called "GetCovers". The function picks a random year and month between 1960 and 2013 and then stores all the titles that were puiblished for that month - with a maximum result of 100 (per Marvel's own limitations). 

In order to wire this up to work on a fresh clone, you must make a call to this function from the client. You can do something like this in the [covers.js](https://github.com/ramsaylanier/MarvelComicCovers/blob/master/client/views/covers/covers.js) file:

```
Template.covers.rendered = function(){
  Meteor.call('getCovers', function(error, result){
      //do stuff here regarding throwing errors or alerts upon successful insertion
  });
}
```

This should make it so that every time the "covers" template is rendered, 100 new titles are pulled from Marvel's database and inserted into the Meteor Comics collection. 

The plan is to eventually set up an admin space when you click a button and it will iterate through the entire Marvel databse to refresh the titles, giving access to everything, but that is going to take a lot of calls and currently Marvel limits daily calls to 3000. 



