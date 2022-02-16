// jshint esversion:6

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const _ = require('lodash');
const FoodModel = require('./models/Food');

const app = express();
app.use(express.json());
app.use(cors());

// connection url
mongoose.connect("mongodb+srv://user1:pass4120@mcrud.ixvnz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {useNewUrlParser: true});

app.get('/read', async (req, res)=> {
    FoodModel.find({}, (err, result)=> {
      if(err)
        res.send(err);
      res.send(result);
    })
});

app.post('/insert', async (req, res)=> {
  const name = req.body.foodName;
  const rating = req.body.rating;
  const food = new FoodModel({
    foodname: name,
    ratings: rating
  });

  try{
    await food.save();
    res.send("data inserted");
  }
  catch(err) {
    console.log(err);
  }
});

app.put('/update', async (req, res)=> {
  const foodName = req.body.newFoodName;
  const id = req.body.id;

  try{
    await FoodModel.findById(id, (err, updated)=> {
      updated.foodname = foodName;
      updated.save();
      res.send("updated");
    });
    await food.save();
    res.send("data inserted");
  }
  catch(err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res)=> {
  const id = req.params.id;
  console.log(id);

  await FoodModel.findByIdAndDelete(id).exec();
});

app.listen(3001, (req,res)=> {
  console.log("server started at port 3001");
});
