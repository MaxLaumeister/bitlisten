#!/bin/bash

# This command is for Google's Closure Compiler

java -jar compiler.jar --js_output_file dist/bitlisten.min.js --js engine/polyfills.js --js engine/jquery-qr.js --js engine/easteregg.js --js engine/reconnecting-websocket.js --js engine/nouislider/jquery.nouislider.js --js engine/howler.js --js engine/extend.js --js statusbox.js --js socket.js --js ratebox.js --js sound.js --js floatable.js --js block.js --js transaction.js --js main.js

#



