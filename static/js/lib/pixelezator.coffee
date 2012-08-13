$ ()->
    $('body').append('<canvas id="proxy" ></canvas>')
    $('body').append('<canvas id="target" ></canvas>')
    targetContext = $('#target')[0].getContext("2d")
    targetContext.webkitImageSmoothingEnabled = false
    targetContext.mozImageSmoothingEnabled = false
    
    
pixelerize = (source, pixelSize, angle) ->
    proxy = $('#proxy')[0]
    target = $('#target')[0]
    width = source.width
    height = source.height
    proxy.width = width / pixelSize
    proxy.height = height / pixelSize
    console.log proxy, source, width, height
    
    if ! angle?
        angle = 0.0
        
    sin = Math.sin angle
    cos = Math.cos angle
    proxyCtx = proxy.getContext "2d"
    proxyCtx.translate proxy.width * 0.5, proxy.height * 0.5
    proxyCtx.transform cos, sin, -sin, cos, 0, 0
    proxyCtx.drawImage source, -0.5 * proxy.width, -0.5 * proxy.height, proxy.width, proxy.height

    target.width = source.width
    target.height = source.height
    console.log(target)
    targetCtx = target.getContext "2d"
    targetCtx.scale pixelSize, pixelSize
    targetCtx.fillStyle = targetCtx.createPattern proxy, 'repeat'
    targetCtx.fillRect 0, 0, target.width, target.height

    return target
