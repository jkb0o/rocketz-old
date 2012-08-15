# -*- wrap: disabled -*-

class Vec2
    @Zero: new Vec2()

    constructor: (x, y)->
        @x= x || 0
        @y= y || 0

    add: ()->
        vec = new Vec2(@x, @y)
        vec.addThis.apply(vec, arguments)

    addThis: ()->
        if arguments.length == 1
            x = arguments[0].x
            y = arguments[0].y
        else
            [x, y] = arguments

        @x += x
        @y += y
        @
    
    sub: ()->
        vec = new Vec2(@x, @y)
        vec.subThis.apply(vec, arguments)

    subThis: ()->
        if arguments.length == 1
            x = arguments[0].x
            y = arguments[0].y
        else
            [x, y] = arguments

        @x -= x
        @y -= y
        @
    
    mult: ()->
        vec = new Vec2(@x, @y)
        vec.multThis.apply(vec, arguments)

    multThis: ()->
        if arguments.length == 1
            value = arguments[0]
            if typeof value == 'number'
                x = value
                y = value
            else
                x = value.x
                y = value.y
        else
            [x, y] = arguments

        @x *= x
        @y *= y
        @
    
    div: ()->
        vec = new Vec2(@x, @y)
        vec.divThis.apply(vec, arguments)

    divThis: ()->
        if arguments.length == 1
            value = arguments[0]
            if typeof value == 'number'
                x = value
                y = value
            else
                x = value.x
                y = value.y
        else
            [x, y] = arguments

        @x /= x
        @y /= y
        @
    
    limit: ()->
        vec = new Vec2(@x, @y)
        vec.limitThis.apply(vec, arguments)
        vec

    limitThis: ()->
        if arguments.length == 2
            [minx, miny] = [arguments[0].x, arguments[0].y]
            [maxx, maxy] = [arguments[1].x, arguments[1].y]
        else
            [minx, miny, maxx, maxy] = arguments

        @x = Math.max(minx, @x)
        @x = Math.min(@x, maxx)
        @y = Math.max(miny, @y)
        @y = Math.min(@y, maxy)
        @

    valid: ()->
        return  Math.abs(@x) != Infinity &&
                Math.abs(@y) != Infinity &&
                @x != NaN &&
                @y != NaN

    length: ()->
        Math.sqrt(@x*@x + @y*@y)

    lengthSquared: ()->
        @x*@x + @y*@y

    xy: ()->
        [@x, @y]

    set: ()->
        if arguments.length == 1
            @x = arguments[0].x
            @y = arguments[0].y
        else
            [@x, @y] = arguments

