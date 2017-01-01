BP = {
	Vec: Box2D.Common.Math.b2Vec2,
	BodyDef: Box2D.Dynamics.b2BodyDef,
	Body: Box2D.Dynamics.b2Body,
	FixtureDef: Box2D.Dynamics.b2FixtureDef,
	Fixture: Box2D.Dynamics.b2Fixture,
	World: Box2D.Dynamics.b2World,
	MassData:  Box2D.Collision.Shapes.b2MassData,
	PolygonShape: Box2D.Collision.Shapes.b2PolygonShape,
	CircleShape: Box2D.Collision.Shapes.b2CircleShape,
	DebugDraw: Box2D.Dynamics.b2DebugDraw,
	
	physics: {
		SCALE: 0,
		world: null,
		debug: false,
		createWorld: function(gravity, SCALE){

			this.SCALE = SCALE;
			this.world = new BP.World(new BP.Vec(0,gravity), true);
			
		},
		initDebug: function(debugElement) {
			var debugdraw = new BP.DebugDraw();
			debugdraw.SetSprite(document.getElementById(debugElement).getContext('2d'));
			debugdraw.SetDrawScale(this.SCALE);
			debugdraw.SetFlags(BP.DebugDraw.e_shapeBit || BP.DebugDraw.e_jointBit);
			this.world.SetDebugDraw(debugdraw);
			this.debug = true;
		},
		tick: function(){
			if(this.debug){
				this.world.DrawDebugData();
			}
			this.world.Step(1/60,10,10);
			this.world.ClearForces();
		}
	},

	formula: {
		speed: function(distance, time){
			return distance/time;
		},
		acceleration: function(deltaVelocity, deltaTime){
			return deltaVelocity/deltaTime;
		},
		distance: function(velocity, time, acceleration){
			return (velocity * time) + (1/2 * acceleration)*(time*time);
		},
		distanceBetween: function(pointA, pointB){
			return Math.sqrt(Math.pow(pointB.x-pointA.x, 2)+Math.pow(pointB.y-pointA.y, 2));
		}
	}	
};

class BPRect {
	constructor(props){
		this.width = props.width;
		this.height = props.height;

		this.fixdef = new BP.FixtureDef();
		this.fixdef.density = props.density;
		this.fixdef.friction = props.friction;
		this.fixdef.restitution = props.restitution;
		this.bodydef = new BP.BodyDef();
		if(props.dynamic){
			this.bodydef.type = BP.Body.b2_dynamicBody;
		}else{
			this.bodydef.type = BP.Body.b2_staticBody;
		}

		this.bodydef.position.x = (props.x+props.width/2)/BP.physics.SCALE;
		this.bodydef.position.y = (props.y+props.height/2)/BP.physics.SCALE;
		this.fixdef.shape = new BP.PolygonShape();
		this.fixdef.shape.SetAsBox((props.width/BP.physics.SCALE)/2,(props.height/BP.physics.SCALE)/2);
		this.worldBody = BP.physics.world.CreateBody(this.bodydef);
		this.worldBody.CreateFixture(this.fixdef);
	}

	render(cxt, callback){
		cxt.save();


		var x = (this.worldBody.GetPosition().x*BP.physics.SCALE - world.grid.offsetX);
		var y = this.worldBody.GetPosition().y*BP.physics.SCALE - world.grid.offsetY;
		var angle = this.worldBody.GetAngle();


		cxt.translate(x,y);
		cxt.rotate(angle);
		cxt.translate(-x,-y);
		
		callback(x-this.width/2,y-this.height/2,this.width,this.height);

		cxt.restore();
	}
}
