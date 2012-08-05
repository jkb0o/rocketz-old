;(function (app){
    var util = app.utils;

    app.viewport = new Object({
        width: Rocketz.config.viewport.width,
        height: Rocketz.config.viewport.height,
        target: null,
        viewPortPosition: null,
        update: function(){
            var battle = app.layers['battle'],
                back = app.layers['background'];

            if (!battle){
                return;
            }

            var ww      = app.config.world.width;
            var wh      = app.config.world.height;
            var target  = battle.viewPortTarget;

            if (!target){
                return;
            }

            var x = target.getX() - this.width / 2,
                y = target.getY() - this.height / 2;

            x = Math.max(0, x);
            x = Math.min(x, ww - this.width);
            y = Math.max(0, y);
            y = Math.min(y, wh - this.height);

            var offset = [x, y];

            this.viewPortPosition = offset;
//
//            if (!this.viewPortPosition){
//                this.viewPortPosition = [x, y];
//            } else {
//                var distance = util.distance(offset, this.viewPortPosition);
//                var velocity = [x - this.viewPortPosition[0], y - this.viewPortPosition[1]];
//                var factor = 30;
//                this.viewPortPosition = [
//                    Math.floor(x + velocity[0] * distance / factor),
//                    Math.floor(y - velocity[1] * distance / factor)
//                ];
//
//            }

            battle.setOffset(this.viewPortPosition);
            back.setOffset(this.viewPortPosition);
        }
    });
})(Rocketz);

