var express = require('express');
var port = 3008;
var app = express();
var path = require('path');
var parser = require('body-parser');
var mongoose = require('mongoose');


Todos = require('./models/Todos');
console.log(Todos);

mongoose.connect('mongodb://DESKTOP-5MO6JTI/project',{useMongoClient:true});
var db = mongoose.connection;

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());




app.get('/api/todos',function(req,res){
    console.log('this path');
    Todos.getTodos(function(err,todos){
        if(err){
            throw err;
        }
        console.log(todos);
      res.json(todos);  
    });
});


app.get('/api/todos/:_id',function(req,res){
    Todos.getTodosById(req.params._id,function(err,todos){
        if(err){
            throw err;
        }
        res.json(todos);
    });
});
app.post('/api/todos',function(req,res){
    var todo = req.body;
    Todos.addTodos(todo,function(err,todo){
        if(err){
            throw err;
        }
        res.json(todo);
    });
});

app.put('/api/todos/:_id',function(req,res){
    var id = req.params._id;
    var todo = req.body;
    Todos.updateTodos(id,todo,{},function(err,todo){
        if(err){
            throw err;
        }
        res.json(todo);
    });

});

app.delete('/api/todos/:_id',function(req,res){
    var id = req.params._id;
    Todos.deleteTodos(id,function(err,todo){
        if(err){
            throw err;
        }
        res.json(todo);
    })
})


app.listen(3008,function(){
    console.log('listening on port');
})