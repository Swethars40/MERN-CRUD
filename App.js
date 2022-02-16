import React, {useState, useEffect} from "react";
import './App.css';
import Axios from "axios";
function App() {

  const [foodName, setFoodName] = useState("");
  const [rating, setRating] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [newFood, setNewFood] = useState("");

  useEffect(()=> {
    Axios.get("http://localhost:3001/read").then((response)=> {
      setFoodList(response.data);
    });
  }, []);

  const addToList = ()=> {
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      rating: rating
    });
  }

  const updateFood = (id)=> {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newFoodName: newFood
    });
  };

  const deleteFood = (id) => {
    console.log("delete");
    Axios.put(`http://localhost:3001/delete/${id}`);
  }

  return (
    <div >
      <h1> CRUD App with MERN </h1>
      <form className="app">
        <label> Food Name </label>
        <input onChange={(e)=> {
          setFoodName(e.target.value)}} type="text" name="food" />

        <label> Ratings </label>
        <input onChange={(e)=> {
          setRating(e.target.value)}} type="number" name="rate" />

        <button onClick={addToList}> Add to List </button>
      </form>

      <h1> FOOD LIST </h1>
      {foodList.map((value)=> {
        return (
          <div className="list">
            <h2> {value.foodname} - {value.ratings} </h2>

            <input onChange={(e)=> {
              setNewFood(e.target.value);
            }} className="input" type="text" placeholder="New Food Name..." />

            <button className="btns" onClick={()=> {updateFood(value._id)}}> update </button>
            <button className="btns" onClick={()=> {deleteFood(value._id)}}> delete </button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
