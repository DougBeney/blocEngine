var blockTypes = {

house: { width: 9, height: 5, src: 'assets/textures/house.png', density: 1, friction: 1, restitution: .1, dynamic: true },

ground_large: { width: 40, height: 100, src: 'assets/textures/ground_large.png', density: 1, friction: .1, restitution: 0, dynamic: false },

wood_ladder: { width: 1, height: 5, src: 'assets/textures/ladder.png', density: 1, friction: 1, restitution: .1, dynamic: true },

wood_1x1: { width: 1, height: 1, src: 'assets/textures/wood_1x1.png', density: 1, friction: 1, restitution: .1, dynamic: false },

stone_1x1: { width: 1, height: 1, src: 'assets/textures/stone_1x1.png', density: 1, friction: 1, restitution: .1, dynamic: false },

coal_1x1: { width: 1, height: 1, src: 'assets/textures/coal_1x1.png', density: 1, friction: 1, restitution: .1, dynamic: true },

darkwood_1x1: { width: 1, height: 1, src: 'assets/textures/darkwood_1x1.png', density: 1, friction: 1, restitution: .1, dynamic: false },

dirt_1x1: { width: 1, height: 1, src: 'assets/textures/dirt_1x1.png', density: 1, friction: 1, restitution: .1, dynamic: true },

grass_1x1: { width: 1, height: 1, src: 'assets/textures/grass_1x1.png', density: 1, friction: 1, restitution: .1, dynamic: true },

tree_4x11: { width: 4, height: 11, src: 'assets/textures/tree_4x11.png', density: 1, friction: 1, restitution: .1, dynamic: true },

cat_1x1: { width: 1, height: 1, src: 'assets/textures/cat_1x1.png', density: 1, friction: 1, restitution: 1, dynamic: true },

















}

for(var i in blockTypes){
	var img = new Image();
	img.src = blockTypes[i].src;
	blockTypes[i].img = img;
}