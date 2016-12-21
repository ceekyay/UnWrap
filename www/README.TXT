

A few things to keep in mind while you test:

    You'll need to allow the browser to have access to your current location.  
    Without that, google maps wont load and that's important.

    ran with:  ionic serve --live-reload

    If you leave the homepage, and then go back to home page, google maps doesn't re-render the page for some reason
    Will have to figure that out for next milestone.  You have to reload the page, and sometimes restart the ionic server.

    The views look the best in a mobile layout.

    Login view is displayed but no functionality yet.

    Tested on Android 6.  It has the same issue as the browser, in that leaving the homepage and coming back
    doesn't re-render google maps.

    The CSS for the Login button in the navigation menu is not complete.
    The "Create new memory" modal content is not yet complete.  It's tricky to represent with hard-coded dummy data
    because the content that needs to be added is user generated and dynamic.  Also need to add the cordova file plugin.




