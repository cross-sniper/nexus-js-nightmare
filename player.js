
const player = new function(){// this acts as a class, that gets called imediatly
	this.x=0
	this.y=0
	this.w = 25
	this.h = 25
	this.speed=250
	this.hp = 100
	this.maxHp = 100
	this.damage = 5
	this.iframe = 0
	this.maxIframe = 1
	this.shotCooldown = 0
	this.score = 0
	
	this.currentPower = powers[0]
	
	this.move=function(dt){
		// dt: DeltaTime, time between frames,
		if(raylib.IsKeyDown(raylib.KEY_W)){
			this.y -= this.speed * dt
		}
		if(raylib.IsKeyDown(raylib.KEY_S)){
			this.y += this.speed * dt
		}
		if(raylib.IsKeyDown(raylib.KEY_A)){
			this.x -= this.speed * dt
		}
		if(raylib.IsKeyDown(raylib.KEY_D)){
			this.x += this.speed * dt
		}
		if(raylib.IsMouseButtonDown(raylib.MOUSE_LEFT_BUTTON)){
			this.currentPower.fn(this)
		}
		
		if(this.iframe > 0){
			this.iframe -= dt
		}
		if(this.shotCooldown > 0){
			this.shotCooldown -= dt
		}

		if(this.x < 0){
			this.x = 0
		}
		if(this.x > raylib.GetScreenSize().width - this.w){
			this.x = raylib.GetScreenSize().width - this.w
		}
		if(this.y < 0){
			this.y = 0
		}
		if(this.y > raylib.GetScreenSize().height - this.h){
			this.y = raylib.GetScreenSize().height - this.h
		}
	}

	this.draw = function(){
		// TODO: keep the hp bar centered
		raylib.DrawText("hp:"+this.hp, this.x, this.y-30, 20, white)
		raylib.DrawRectangle(this.x, this.y - 10, this.hp,10, red)
		raylib.DrawRectangle(this.x, this.y - 10, this.hp*this.iframe,10, gray)
		
		raylib.DrawRectangle(this.x, this.y, this.w,this.h, blue)
		
	}
	this.takeDamage=function(ammount){
		if(this.iframe <= 0){
			this.hp -= ammount
			this.iframe = this.maxIframe
		}
	}
}()
