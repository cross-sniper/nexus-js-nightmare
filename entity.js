function Entity(attrs)
{
	this.x = attrs.x
	this.y = attrs.y
	this.w = attrs.w
	this.h = attrs.h
	this.color = attrs.color
	this.speed = attrs.speed
	this.hp = attrs.hp
	this.damage = attrs.damage
	this.iframe = 0
	this.maxIframe = attrs.maxIframe

	this.move = function(target, dt) {
	    // Calculate the direction towards the target
	    var dx = target.x - this.x;
	    var dy = target.y - this.y;
	    
	    // Calculate the distance to the target
	    var distance = Math.sqrt(dx * dx + dy * dy);
	    // Check for collision between two rectangles
	    var targetRect = {
	        x: target.x,
	        y: target.y,
	        w: target.w,
	        h: target.h
	    };

	    var thisRect = {
	        x: this.x,
	        y: this.y,
	        w: this.w,
	        h: this.h
	    };
	    // If the distance is small enough, consider the target reached
	    if (
	    	rectanglesIntersect(thisRect, targetRect)
	    ) {
	        if(target == player){
	        	if(player.hp <= 0){
		        	print("game over")
		        	quit(1)
	        	}else{
	        		player.takeDamage(this.damage)
	        	}
	        }else{
	        	this.x = target.x
	        	this.y = target.y
	        }
	    } else {
	        // Calculate the movement towards the target
	        var vx = (dx / distance) * this.speed;
	        var vy = (dy / distance) * this.speed;
	        
	        // Update the position
	        this.x += vx * dt;
	        this.y += vy * dt;
	    }
		if(this.iframe > 0){
			this.iframe -= dt
		}
	}

	this.draw = function(){
		// TODO: keep the hp bar centered
		raylib.DrawText("hp:"+this.hp, this.x, this.y-30, 20, white)
		raylib.DrawRectangle(this.x, this.y - 10, this.hp,10, red)
		raylib.DrawRectangle(this.x, this.y - 10, this.w*this.iframe,10, gray)
		
		raylib.DrawRectangle(this.x, this.y, this.w,this.h, blue)
		
	}
	this.takeDamage=function(ammount){
		if(this.iframe <= 0){
			this.hp -= ammount
			this.iframe = this.maxIframe
			return true
		}
	}
}
function rectanglesIntersect(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y
    );
}

Enemies = []
/*
Enemies.push(
	new Entity(
		{
			x:500,
			y:400,
			w:20,
			h:20, 
			hp:20, 
			color:red, 
			speed:200,
			damage:10,
			maxIframe: 1.5
		}
	)
)
*/

function drawEnemies(){
	Enemies.forEach(function(enemy){
		enemy.draw()
	})
}

function moveEnemies(dt, player){
	Enemies.forEach(function(enemy){
		enemy.move(player,dt)
	})
}
function removeDeadEnemies(){
    Enemies = Enemies.filter(function(enemy) {
    	e =  enemy.hp > 0
    	if(!e){
    		player.score += 300
    	}
        return e
    });
}

ENEMY_SPAWN_COOLDOWN = 0
ENEMY_SPAWN_COOLDOWN_MAX = 15// 15 seconds per enemy
ENEMY_COUNT = 5
NEW_WAVE = false
Difficulty = 1

function spawnNewEnemy(dt){
	if(NEW_WAVE){
		NEW_WAVE = false
		for(var i = 0; i < ENEMY_COUNT; i++){
			spawn = {x:Math.random()*raylib.GetScreenSize().width, y:Math.random()*raylib.GetScreenSize().height}
			Enemies.push(
				new Entity(
					{
						x:spawn.x,
						y:spawn.y,
						w:20 * Difficulty,
						h:20 * Difficulty, 
						hp:20 * Difficulty, 
						color:red, 
						speed:200,
						damage:10 * Difficulty,
						maxIframe: 1.5
					}
				)
			)
		}
	}
	if(ENEMY_SPAWN_COOLDOWN <= 0){
		NEW_WAVE = true
		ENEMY_SPAWN_COOLDOWN = ENEMY_SPAWN_COOLDOWN_MAX
		ENEMY_COUNT += 1
		Difficulty += 0.3

	}
	ENEMY_SPAWN_COOLDOWN -= dt
}
