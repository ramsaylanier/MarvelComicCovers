Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.onBeforeAction('loading');
Router.onBeforeAction(function(pause){
	clearErrors(); 
});

Router.map(function(){
	this.route('covers',{
		path: '/',
		waitOn: function(){
			return Meteor.subscribe('comicCovers')
		},
		data: function(){
			return Covers.find().fetch();
		}
	}),
	this.route('stats', {
		path: '/stats',
		waitOn: function(){
			return Meteor.subscribe('comicCovers')
		}
	})
})