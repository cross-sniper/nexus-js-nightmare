CURRENT_ELEMENT_POS = 0
function NextElem(size){
	s = CURRENT_ELEMENT_POS
	CURRENT_ELEMENT_POS+=size
	return s
}
function ResetPos() {CURRENT_ELEMENT_POS = 0}
function CheckCollisionPointRec(point, rect) {
    return point.x >= rect.x && point.x <= rect.x + rect.w &&
           point.y >= rect.y && point.y <= rect.y + rect.h;
}

// TODO: add image support onto the raylib module, so this can look a bit better
function Button(text, clickFunc) {
    var buttonWidth = 200; // Width of the button
    var buttonHeight = 40; // Height of the button
    var buttonX = 50; // X-coordinate of the button
    var buttonY = NextElem(buttonHeight + 10); // Y-coordinate of the button, including spacing

    // Check if the mouse cursor is within the button bounds
    var isMouseOver = CheckCollisionPointRec(raylib.GetMousePosition(), {x:buttonX, y:buttonY, w:buttonWidth, h:buttonHeight});

    // Set button color based on mouse hover
    var buttonColor = isMouseOver ? lightgray : gray;

    // Draw button
    raylib.DrawRectangle(buttonX, buttonY, buttonWidth, buttonHeight, buttonColor);
    raylib.DrawText(text, buttonX + 10, buttonY + 10, 20, white);

    // Check if the button is clicked and execute the click function
    if (isMouseOver && raylib.IsMouseButtonPressed(raylib.MOUSE_LEFT_BUTTON)) {
        clickFunc();
    }
}

function drawPowerUps(){
	for(id in powers){
		power = powers[id]
		power.draw()
        if (CheckCollisionPointRec(raylib.GetMousePosition(), {x: power.x, y: power.y, w: power.w, h: power.h})) {
            if (raylib.IsMouseButtonPressed(raylib.MOUSE_LEFT_BUTTON)) {
                player.currentPower = power;
                player.shotCooldown = 1
            }
        }
	}
}

function drawUi(){
	raylib.DrawText("WIP, nexus-js v0.4", 0,NextElem(20), 20, white)
	raylib.DrawText("next enemy: "+ENEMY_SPAWN_COOLDOWN, 0,NextElem(20), 20, white)
	raylib.DrawText("cooldown: "+player.currentPower.shotCooldown, 0,NextElem(20), 20, white)
	raylib.DrawText("your cooldown: "+player.shotCooldown, 0,NextElem(20), 20, white)
	raylib.DrawText("score: "+player.score, 0,NextElem(20), 20, white)
	if(player.score >= 400){
		if(player.maxHp < 500){
			Button("add hp, 400 points",function (){
				player.maxHp += 50
				player.hp = player.maxHp
				player.score -= 400
			})
		}
	}

	if(player.score >= 200)
	{
		if(player.currentPower.shotCooldown > player.currentPower.minShotCooldown){
			Button("add fire rate, 200 points",function (){
				player.currentPower.shotCooldown -= 0.1
				player.score -= 200
			})
		}
		if(player.currentPower.damage < player.currentPower.maxDamage){
			Button("add 5 damage, 200 points",function (){
				player.currentPower.damage += 5
				player.score -= 200
			})
		}
	}
	drawPowerUps()
	ResetPos()
}
