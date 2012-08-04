;(function(app){
    var _stageInstance = null;

    app.stage = function(){
        if (!_stageInstance){
            _stageInstance = new Kinetic.Stage({
                container	: 'workspace',
                width		: app.config.viewport.width,
                height		: app.config.viewport.height
            });
        }
        return _stageInstance;
    };
})(Rocketz);