const Events = require('events')

const bus = new Events()
bus.on('mounted',data => {
  console.log('事件监听',data);
})

bus.emit('mounted', [1,2,3])