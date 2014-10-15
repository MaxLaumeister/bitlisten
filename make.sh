#!/bin/bash

# This command is for Google's Closure Compiler

java -jar compiler.jar --js_output_file dist/bitlisten.min.js --js lib/polyfills.js --js lib/jquery-qr.js --js lib/easteregg.js --js lib/reconnecting-websocket.js --js lib/jquery.nouislider.js --js lib/howler.js --js lib/extend.js --js src/statusbox.js --js src/socket.js --js src/ratebox.js --js src/sound.js --js src/floatable.js --js src/block.js --js src/transaction.js --js src/main.js

#
