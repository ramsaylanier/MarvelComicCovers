Package.describe({
  summary: "Marvel package"
});

Package.on_use(function (api) {
  api.add_files('marvel.js', 'client');
  if(api.export)
    api.export('Marvel');
});
 