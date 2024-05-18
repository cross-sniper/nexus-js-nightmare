require("libs.js")

while(!raylib.WindowShouldClose()){
	raylib.BeginDrawing()
	raylib.ClearBackground(black)
	dt = raylib.GetFrameTime()
	spawnNewEnemy(dt)
	player.move(dt)
	moveEnemies(dt, player)
	moveBullets(dt)
	handleBulletAttack(Enemies)
	player.draw()
	drawEnemies()
	drawBullets()
	removeBulletsOutOfBounds()
	removeDeadEnemies()
	drawUi()
	raylib.EndDrawing()
}

raylib.CloseWindow()
