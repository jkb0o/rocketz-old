;(function (app){
    var config = app.config;

    app.viewport = new Object({
        width: Rocketz.config.viewport.width,
        height: Rocketz.config.viewport.height,
        target: null,
        viewPortPosition: null,
        factor: config.viewport.easingStretch,
        update: function(options){
            var battle = app.layers['battle'],
                back = app.layers['background'];

            if (!battle){
                return;
            }

            var target  = battle.viewPortTarget;

            if (!target){
                return;
            }

            var ww = app.config.world.width,
                wh = app.config.world.height,
                x = target.getX() - this.width / 2,
                y = target.getY() - this.height / 2;

            x = Math.max(0, x);
            x = Math.min(x, ww - this.width);
            y = Math.max(0, y);
            y = Math.min(y, wh - this.height);

            if (!this.viewPortPosition | !config.viewport.easingEnabled){
                this.viewPortPosition = [app.config.world.width * 0.5, app.config.world.height*0.5]
            } else if(options.timeDiff > 10) {
                var timeDiff = options.timeDiff * 0.001,
                    velocity = [
                        (x - this.viewPortPosition[0]) * this.factor,
                        (y - this.viewPortPosition[1]) * this.factor
                    ],
                    viewPortOffset = [
                        velocity[0] * timeDiff,
                        velocity[1] * timeDiff
                    ];

                var newPos = [
                    this.viewPortPosition[0] + viewPortOffset[0],
                    this.viewPortPosition[1] + viewPortOffset[1]
                ];
                if (Math.abs(newPos[0]) != Infinity &&
                    Math.abs(newPos[1]) != Infinity &&
                    newPos[0] != NaN &&
                    newPos[1] != NaN)
                {
                    this.viewPortPosition = newPos;
                }

            } 
            battle.setOffset(this.viewPortPosition);
            back.setOffset(this.viewPortPosition);
        }
    });
})(Rocketz);

