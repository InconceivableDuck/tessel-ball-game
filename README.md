tessel-ball-game
================

Simple ball game for Tessel created at NodeConf during open hack. Runs a basic accelerometer application on the Tessel and pipes the output to a Node.js app running locally. The app then uses Socket.io to stream accelerometer data to the client to move the ball. The goal is to get the ball in the bucket.

## To play:
Hold the Tessel by the USB adapter and tilt it in the direction you'd like it to move. Each tilt applies an impulse to the ball.

## To run:
```
$ npm install
$ npm start
```
