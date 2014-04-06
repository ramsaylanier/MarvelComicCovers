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
			return Meteor.subscribe('comicCovers');
		}
	}),
	this.route('stats', {
		path: '/stats',
		waitOn: function(){
			return Meteor.subscribe('comicStats');
		}
	}),
	this.route('comicSingle', {
		path: '/comics/:title',
		waitOn: function(){
			console.log(this.params.title);
			return Meteor.subscribe('comicSingle', this.params.title);
		},
		data: function(){
			if (this.ready()){
				return Comics.findOne();
			}
		}
	})
})