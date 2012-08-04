Rocketz.viewport    = new Object({
    width: Rocketz.config.viewport.width,
    height: Rocketz.config.viewport.height,
    target: null,
    update: function(){
        if (!battle)    return;

        var ww      = Rocketz.config.world.width;
        var wh      = Rocketz.config.world.height;
        
        var self    = null;

        for (var i = 0; i < battle.children.length; i++){
            var child   = battle.children[i];
            if (child.self) {
                self = child;
            }
        }

        if (!self)  return;

        var x = child.worldx - this.width / 2;
        var y = child.worldy;
        
        if (x < 0){
            conso
            battle.setX(x);
            x = 0;
        }
        if (y < 0){
            battle.setY(y);
            y = 0;
        }
        if (x > ww - this.width) {
            battle.setX(x - ww + this.width);
            x = ww - this.width;
        }
        if (y > wh - this.height) {
            battle.setY(y - wh + this.height);
            y = wh - this.height;
        }

        back.setOffset([x, y]);

    }
});
