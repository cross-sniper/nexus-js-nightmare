function Gun(attrs) {
    this.x = attrs.x;
    this.y = attrs.y;
    this.w = attrs.w;
    this.h = attrs.h;
    this.bg = attrs.bg;
    this.active = attrs.active;
    this.fn = attrs.fn;
    this.damage = attrs.damage
    this.maxDamage = attrs.maxDamage
    this.shotCooldown = attrs.shotCooldown
    this.minShotCooldown = attrs.minShotCooldown

    this.draw = function() {
        var current = player.currentPower;
        raylib.DrawRectangle(
            this.x, 
            this.y,
            this.w,
            this.h,
            this == current ? this.active : this.bg
        );
    };


}

pistol =new Gun({
	x:20,
	y: raylib.GetScreenSize().height - 100,
	w:90,
	h:90,
	bg: gray,
	shotCooldown:0.7,
	maxDamage:30,
	damage:10,
	minShotCooldown:0.4,
	active:lightgray,
	fn:function(target){
		if(target.shotCooldown <= 0.2)
		{
			fireBullet(target, raylib.GetMousePosition(), 300, 5, this.damage)
			target.shotCooldown = this.shotCooldown

		}
	}
})
shotgun = new Gun({
	x:110,
	y: raylib.GetScreenSize().height - 100,
	w:90,
	h:90,
	bg: gray,
	active:lightgray,
	shotCooldown:1,
	maxDamage:40,

	damage:14,
	minShotCooldown:0.5,
	fn: function(target) {
		if(target.shotCooldown <= 0.2)
		{
			var spread = 0.1; // Spread angle in radians
			var numBullets = 5; // Number of bullets in the spread
			var baseAngle = Math.atan2(raylib.GetMousePosition().y - target.y, raylib.GetMousePosition().x - target.x);

			for (var i = 0; i < numBullets; i++) {
				var angle = baseAngle + (i - (numBullets - 1) / 2) * spread;
				var bulletTarget = {
					x: target.x + Math.cos(angle) * 1000,
					y: target.y + Math.sin(angle) * 1000
				};
				fireBullet(target, bulletTarget, 300, 5, this.damage);
			}
				target.shotCooldown = this.shotCooldown;
		}
	}
})
//fireBullet(owner, target, speed, radius, damage)

destroyer = new Gun({
	x:200,
	y: raylib.GetScreenSize().height - 100,
	w:90,
	h:90,
	bg:darkred,
	active:red,
	shotCooldown:5,
	maxDamage:500,
	damage:220,
	minShotCooldown:1,
	fn: function(target) {
		if(target.shotCooldown <= 0.2)
		{
			fireBullet(target, raylib.GetMousePosition(), 300, 10, this.damage)
			target.shotCooldown = this.shotCooldown

		}
	}
})

powers = [
	pistol,
	shotgun,
	destroyer
]

