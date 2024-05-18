function Bullet(attrs) {
    this.x = attrs.start.x; // E.g: player's pos
    this.y = attrs.start.y; // E.g: player's pos
    this.target = attrs.target; // E.g: original mouse position
    this.owner = attrs.master
    this.r = attrs.radius; // Corrected spelling
    this.speed = attrs.speed;
    this.color = attrs.color;
    this.hp = attrs.hp || 4
    this.damage = attrs.damage
    this.draw = function() {
        raylib.DrawCircle(this.x, this.y, this.r, this.color);
    };
    
    this.move = function(dt) {
        // Calculate direction towards the target
        var dx = this.target.x - this.x;
        var dy = this.target.y - this.y;
        
        // Calculate distance to the target
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate movement towards the target
        var vx = (dx / distance) * this.speed;
        var vy = (dy / distance) * this.speed;
        
        // Update position
        this.x += vx * dt;
        this.y += vy * dt;
        // ensures the bullet keeps moving
        this.target.x += vx * dt;
        this.target.y += vy * dt;
    };

	this.colidedWith = function(thing) {
		if(thing == this.master){
			return false// never collide with your own owner/master
		}
	    if (thing.x !== undefined && thing.y !== undefined && thing.w !== undefined && thing.h !== undefined) {
	        // Check collision with rectangle
	        return this.x + this.r > thing.x && this.x - this.r < thing.x + thing.w &&
	               this.y + this.r > thing.y && this.y - this.r < thing.y + thing.h;
	    } else if (thing instanceof Circle) {
	        // Check collision with circle
	        var dx = this.x - thing.x;
	        var dy = this.y - thing.y;
	        var distance = Math.sqrt(dx * dx + dy * dy);
	        return distance < this.r + thing.r;
	    }
	};
	this.removeSelf = function(bulletArray) {
		if(this.hp>0){
			this.hp --
		}else{
		    var index = bulletArray.indexOf(this);
		    if (index !== -1) {
		        bulletArray.splice(index, 1);
		    }
		}
	};


}

var bullets = [];

function drawBullets() {
    bullets.forEach(function(bullet) {
        bullet.draw();
    });
}

function moveBullets(dt) {
    bullets.forEach(function(bullet) {
        bullet.move(dt);
    });
}
function handleBulletAttack(things){
	things.forEach(function(entity){
		    bullets.forEach(function(bullet) {
		    	if(bullet.colidedWith(entity)){
                    s = bullet.damage + entity.hp
		    		if(entity.takeDamage(bullet.damage)){
			    		player.score += s// calculate score
		    		}
			    		bullet.removeSelf(bullets)
		    	}
		    })
	})
}

function fireBullet(owner, target, speed, radius, damage) {
    var bulletAttrs = {
        master: owner,
        start:owner,
        target: target,
        speed: speed,
        radius: radius,
        color: blue, // Example color, adjust as needed
        damage: damage
    };
    var newBullet = new Bullet(bulletAttrs);
    bullets.push(newBullet);
}

function removeBulletsOutOfBounds() {
    bullets = bullets.filter(function(bullet) {
        return bullet.x >= 0 && bullet.x <= raylib.GetScreenSize().width && bullet.y >= 0 && bullet.y <= raylib.GetScreenSize().height;
    });
}
