import { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeal.module.css";
import MealItem from "./MealItem/mealItem";


const AvailableMeal = () => {
    const [meals, setMeals] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
      const fetchMeals = async() => {
        const response = await fetch('https://food-app-f0cf3-default-rtdb.firebaseio.com/meals.json');

        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const responseData = await response.json();
  
        const loadedMeals = [];

        for(let key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price
          })
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      }

      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });

    }, []);


    if (isLoading) {
      return ( 
        <section className={classes.loadMeal}>
          <p>Loading...</p>
        </section>
      )
    }

    if (httpError) {
      return ( 
        <section className={classes.errMeal}>
          <p>{httpError}</p>
        </section>
      )
    }

      const mealList = meals.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />)
      return (
          <section className={classes.meals}>
              <Card>
                <ul>{mealList}</ul>
              </Card>
          </section>
      );
  }

  export default AvailableMeal;