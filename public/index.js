// Hook the ready callback.
pulse.ready(function() {
  // Create an engine.
  var engine = new pulse.Engine({
    gameWindow: 'gameWindow',
    size: { width: 640, height: 480 }
  });

  // Create a scene.
  var scene = new pulse.Scene();

  // Create a layer and add it to the scene.
  var layer = new pulse.Layer();
  layer.position = { x: 300, y : 200 };
  scene.addLayer(layer);

  //
  // Setup the walls.
  //
  var bottom = new pulse.Sprite( {
    src: 'block.png',
    physics: {
       basicShape : 'box',
       isStatic : true
    },
    size : { width: 640, height: 16 }
  });

  var leftSide = new pulse.Sprite( {
    src: 'block.png',
    physics: {
       basicShape: 'box',
       isStatic: true
    },
    size: { width: 16, height: 480 }
  });

  var rightSide = new pulse.Sprite( {
    src: 'block.png',
    physics: {
       basicShape: 'box',
       isStatic: true
    },
    size: { width: 16, height: 480 }
  });

  //
  // Setup the bucket.
  //
  var bucketBottom = new pulse.Sprite( {
    src: 'block.png',
    physics: {
       basicShape : 'box',
       isStatic : true
    },
    size : { width: 60, height: 8 }
  });

  var bucketLeftSide = new pulse.Sprite( {
    src: 'block.png',
    physics: {
       basicShape: 'box',
       isStatic: true
    },
    size: { width: 8, height: 60 }
  });

  var bucketRightSide = new pulse.Sprite( {
    src: 'block.png',
    physics: {
       basicShape: 'box',
       isStatic: true
    },
    size: { width: 8, height: 60 }
  });

  leftSide.position = { x: 20, y: 200 };
  rightSide.position = { x: 620, y: 200 };
  bottom.position = { x: 308, y: 440 };

  bucketBottom.position = { x: 400, y: 300 };
  bucketLeftSide.position = { x: 370, y: 300 };
  bucketRightSide.position = { x: 430, y: 300 };

  layer.addNode(bottom);
  layer.addNode(leftSide);
  layer.addNode(rightSide);

  layer.addNode(bucketBottom);
  layer.addNode(bucketLeftSide);
  layer.addNode(bucketRightSide);

  // The Ball
  var circle = new pulse.Sprite({
      src: 'ball.png',
      size: { width: 24, height: 24 },
      physics: {
         basicShape : 'circle'
      }
   });

  circle.position = { x: 100, y: 100 };

  layer.addNode(circle);

  // Add an activate the scene.
  engine.scenes.addScene(scene);
  engine.scenes.activateScene(scene);

  // Start the update and render loop.
  engine.go(30);

  var socket = io();

  var impulseRight = false;
  var impulseLeft = false;
  var impulseUp = false;
  var impulseDown = false;

  var rolling = [];

  socket.on('acc', function(msg) {

    console.log('x: ' + msg.x, 'y: ' + msg.y);

    if(parseFloat(msg.x) > 0.75) {
      if(!impulseRight) {
        impulseRight = true;
        circle._physics.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0.3, 0), circle._physics.body.GetPosition());
        setTimeout(function() {
          impulseRight = false;
        }, 1000);
      }
    }

    if(parseFloat(msg.x) < -0.75) {
      if(!impulseLeft) {
        impulseLeft = true;
        circle._physics.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(-0.3, 0), circle._physics.body.GetPosition());
        setTimeout(function() {
          impulseLeft = false;
        }, 1000);
      }
    }

    if(parseFloat(msg.y) < -0.75) {
      if(!impulseUp) {
        impulseUp = true;
        circle._physics.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0, -0.3), circle._physics.body.GetPosition());
        setTimeout(function() {
          impulseUp = false;
        }, 1000);
      }
    }

    if(parseFloat(msg.y) > 0.75) {
      if(!impulseDown) {
        impulseDown = true;
        circle._physics.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0, 0.3), circle._physics.body.GetPosition());
        setTimeout(function() {
          impulseDown = false;
        }, 1000);
      }
    }
    
  });
});
