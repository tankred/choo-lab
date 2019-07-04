/// import choo's template helper
var html = require('choo/html')

// import template
var animal = require('./animal.js')

// export module
module.exports = function (state, emit) {

  // create html template
  return html`
    <div class="container">
    <div class="grass">
    <img src="/assets/bg.gif" onclick=${add} />
    ${state.animals.map(animalMap)}
    </div>
    <div class="controls">
    <ul class="filters">
    <li><a href="/">all</a></li>
    <li><a href="/filter/crocodile">crocodiles</a></li>
    <li><a href="/filter/koala">koalas</a></li>
    <li><a href="/filter/lion">lions</a></li>
    <li><a href="/filter/tiger">tigers</a></li>
    <li><a href="/filter/walrus">walruses</a></li>
    </ul>
    </div>
    </div>
    `


  // map function
  function animalMap (obj, i) {
    // get route
    var type = state.params.type

    if (type && type !== obj.type) {
      return // nothing
    } else {
      return animal(remove, obj, i)
    }

  }



  // add new animal to state
  function add (e) {
    var x = e.offsetX - 20
    var y = e.offsetY - 10

    var obj = {x: x, y: y}
    emit('addAnimal', obj)
  }

  // remove animal from state
  function remove (e) {
    var index = e.target.id
    emit('removeAnimal', index)
  }


}