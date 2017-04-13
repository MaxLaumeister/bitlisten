## BitListen - Bitcoin Transaction Visualizer ##

Current version hosted at [**BitListen.com**](http://bitlisten.com/). Project formerly known as "Listen to Bitcoin" (ListenToBitcoin.com has been sold.)

Realtime Bitcoin transaction visualizer written in HTML/Javascript. See and hear new transactions and blocks as they propagate through the Bitcoin Network.

### Building ###

The project is built and ready-to-go. If you change any of the javascript, you will need to re-build the `bitlisten.min.js` file using Grunt. If you haven't used Grunt before, here is a short tutorial:

1. [Install Node.js](https://nodejs.org/download/).

2. Install grunt-cli using `sudo npm install -g grunt-cli`.

2. Cd into the project directory and run `npm install` to install the proper Grunt version and dependencies for this project.

3. Run `grunt` to build BitListen. Alternatively, run `grunt watch` to build BitListen, host it at http://localhost:8000, and watch for and rebuild changes in the source files.

The compiled/minified script will be output to `bitlisten.min.js`.

### APIs and Libraries ###

BitListen uses these libraries:

* [Howler.js](http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library) by James Simpson
* [Reconnecting-Websocket](https://github.com/joewalnes/reconnecting-websocket) by Joe Walnes

BitListen uses these APIs:

* [Blockchain.info](https://blockchain.info/) WebSocket API (For Transactions)
* [Bitstamp.net](https://www.bitstamp.net/) WebSocket API (For Price Ticker)

### License ###

If you distribute this project in part or in full, please attribute with a link to [the GitHub page](https://github.com/MaxLaumeister/bitlisten). This software is available under the MIT License, details in the included `LICENSE.md` file.
