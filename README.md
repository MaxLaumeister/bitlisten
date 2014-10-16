## BitListen - Bitcoin Transaction Visualizer ##

Current version hosted at [**BitListen.com**](http://bitlisten.com/). Project formerly known as "Listen to Bitcoin" (ListenToBitcoin.com has been sold.)

Realtime Bitcoin transaction visualizer written in HTML/Javascript. See and hear new transactions and blocks as they propagate through the Bitcoin Network.

### Building ###

The project is built and ready-to-go in the dist folder. If you change any of the javascript, you will need to re-build the dist/bitlisten.min.js file:

1. Download the [latest Google Closure Compiler .jar](http://dl.google.com/closure-compiler/compiler-latest.zip) and copy it into the root project folder.
2. Run make.bat (Windows) or make.sh (Mac/Linux) to invoke closure compiler with the necessary arguments.

The compiled/minified script will be output to dist/bitlisten.min.js.

### APIs and Libraries ###

BitListen uses these libraries:

* [Howler.js](http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library) by James Simpson
* [Reconnecting-Websocket](https://github.com/joewalnes/reconnecting-websocket) by Joe Walnes

BitListen uses these APIs:

* [Blockchain.info](http://blockchain.info/) WebSocket API (For Transactions)
* [Bitstamp.net](https://www.bitstamp.net/) WebSocket API (For Price Ticker)

### License ###

If you distribute this project in part or in full, please attribute with a link to [the GitHub page](https://github.com/MaxLaumeister/bitlisten). This software is available under The MIT License, reproduced below.

Copyright (c) 2014 Maximillian Laumeister

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
