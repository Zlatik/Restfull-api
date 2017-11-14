var mongoose = require('mongoose');

var todosSchema = mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    active:{
        type: Boolean,
        default: true
    }
});

var Todos = module.exports = mongoose.model('Todos',todosSchema);
module.exports.getTodos = function(callback,limit){
    Todos.find(callback).limit(limit);
}
module.exports.getTodosById = function(id,callback){
    Todos.findById(id,callback);
}

module.exports.addTodos = function(todos,callback){
    Todos.create(todos,callback);
}

module.exports.updateTodos = function(id,todo,options,callback){
    var query = {_id:id};
    var update = {
        text : todo.text,
        date: todo.date,
        active : todo.active
    }
    Todos.findOneAndUpdate(query,update,options,callback);
}


module.exports.deleteTodos = function(id,callback){
    Todos.findOneAndRemove(id,callback);
}