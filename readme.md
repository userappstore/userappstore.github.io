# Dashboard documentation screenshots

https://userdashboard.github.io

This documentation is a static HTML website documenting how to use, administrate or develop web apps with Dashboard.  All user and administrator functionality is demonstrated with sequences of screenshots, rendered in a desktop resolution, large and small tablets, and large and small phones.

The screenshots are generated automatically with [Puppeteer](https://github.com/GoogleChrome/puppeteer) browsing a running application.  You can regenerate the screenshots using your application instead of the bundled server.  During screenshot generation your `STORAGE_ENGINE` must be the file system so clean datasets can be created and destroyed.

    $ git clone https://github.com/userdashboard/userdashboard.github.ui documentation
    $ cd documentation
    $ npm install
    $ cd dashboard-server
    $ bash start-screenshots.sh
    
    # open a new tab or window
    $ DASHBOARD_SERVER=http://localhost:8001 \
      DATA_STORAGE=/tmp/screenshot-data \
      node generate.js

## Privacy

There are no third-party trackers, analytics or resources embedded in documentation pages.  

#### License

This software and documentation is distributed under the MIT license.
