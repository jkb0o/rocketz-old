$ ()->
    $('body').append('<canvas id="pixproxy" style="display:none"></canvas>')
    $('body').append('<canvas id="pixtarget" style="display:none"></canvas>')
    targetContext = $('#pixtarget')[0].getContext("2d")
    targetContext.webkitImageSmoothingEnabled = false
    targetContext.mozImageSmoothingEnabled = false

Kinetic.PixelImage = Kinetic.Image.extend {

    init: (conf) ->
        if !conf.pixelImage
            conf.pixelImage = 2
        @_super conf
        @setDrawFunc @drawPixel

    drawPixel: (ctx) ->
        img = @pixelerize @attrs.image, @attrs.pixelSize, @getRotation()
        @drawImage ctx, img, 0, 0, img.width, img.height

    # ignore rotations from transforms for pixelezations abilities
    getTransform: () ->
        m = new Kinetic.Transform()

        if @attrs.x != 0 || @attrs.y != 0
            m.translate @attrs.x, @attrs.y

        if @attrs.scale.x != 1 || @attrs.scale.y != 1
            m.scale @attrs.scale.x, @attrs.scale.y

        if @attrs.offset && (@attrs.offset.x != 0 || @attrs.offset.y != 0)
            m.translate -1 * @attrs.offset.x, -1 * @attrs.offset.y

        m

    pixelerize: (source, pixelSize, angle) ->
        proxy = $('#pixproxy')[0]
        target = $('#pixtarget')[0]
        width = source.width
        height = source.height
        proxy.width = width / pixelSize
        proxy.height = height / pixelSize
        
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
        targetCtx = target.getContext "2d"
        targetCtx.scale pixelSize, pixelSize
        targetCtx.fillStyle = targetCtx.createPattern proxy, 'repeat'
        targetCtx.fillRect 0, 0, target.width, target.height

        return target
}
