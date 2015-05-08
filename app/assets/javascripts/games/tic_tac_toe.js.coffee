class @TicTacToe
  
  constructor: (@canvas, @context, @socket, @user_id) ->
    @draw()
    @handlers()

  handlers: () ->
    me = this
    $('#canvas').click((event) ->
      coors = me.getMousePosition(me.canvas, event) 
      console.log(window.character)
      me.socket.emit('playermove', {x: coors.x, y: coors.y, user_id: me.user_id})
    )

  incoming: (data) ->
    console.log(data)
    if(data.character == 'X')
      @drawX(data.coors.x, data.coors.y)
    if (data.character == 'O')
      @drawO(data.coors.x, data.coors.y)

  getMousePosition: (canvas, event)->
    rect = canvas.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }

  drawX: (x, y) ->
    @context.beginPath()

    @context.moveTo(x - 20, y - 20)
    @context.lineTo(x + 20, y + 20)

    @context.moveTo(x + 20, y - 20)
    @context.lineTo(x - 20, y + 20)
    @context.stroke()

  drawO: (x, y) ->
    @context.beginPath()
    @context.arc(x,y,20,0,2*Math.PI)
    @context.stroke()

  draw: () ->
    @context.beginPath()
    @context.moveTo(100,50)
    @context.lineTo(100,300)
    @context.stroke()
    @context.beginPath()
    @context.moveTo(200,50)
    @context.lineTo(200,300)
    @context.stroke()
    
    @context.beginPath()
    @context.moveTo(0,120)
    @context.lineTo(300,120)
    @context.stroke()
    @context.beginPath()
    @context.moveTo(0,220)
    @context.lineTo(300,220)
    @context.stroke()


  test: () ->
    alert 'test'

