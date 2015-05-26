'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Poem = new Module('poem');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Poem.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Poem.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Poem.menus.add({
    title: 'poem example page',
    link: 'poem example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Poem.aggregateAsset('css', 'poem.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Poem.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Poem.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Poem.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Poem;
});
