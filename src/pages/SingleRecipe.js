import React, { Component } from 'react'
// import { recipeData } from '../data/tempDetails'
import { Link } from 'react-router-dom' 

export default class singleRecipe extends Component {
   constructor(props) {
      super(props);
      // console.log(this.props);
      const id = this.props.match.params.id;
      this.state = {
         // recipe: recipeData,
         recipe: {},
         id,
         loading: true
      }
   }

   async componentDidMount() {
      
      const url =  `https://api.spoonacular.com/recipes/informationBulk?ids=${ this.state.id }&apiKey=${ process.env.REACT_APP_API_KEY }`
      try {
         // fetch(url).then()
         const response = await fetch(url);
         const responseJSON = await response.json();

         var responseData = {imageUrl: responseJSON[0].image, title: responseJSON[0].title, preparationTime: responseJSON[0].preparationMinutes, cookingTime: responseJSON[0].cookingMinutes, publisher: responseJSON[0].creditsText, publisherUrl: responseJSON[0].spoonacularSourceUrl,  instructions: responseJSON[0].instructions};

         const ingredients = responseJSON[0].extendedIngredients.map(item => item.original);

         responseData['ingredients'] = ingredients;

         console.log(responseData);

         this.setState({
            recipe: responseData,
            loading: false
         });
      }
      catch(error) {
         console.log(error);
      }
   }

   render() {
      const { imageUrl, title, preparationTime, cookingTime, publisher, publisherUrl, instructions, ingredients } = this.state.recipe;
      if(this.state.loading) {
         return(
            <div className="container">
               <div className="row">
                  <div className="col-10 mx-auto col-md-6 my-3">
                     <h2 className="text-uppercase text-center"> Loading Recipe... </h2>
                  </div>
               </div>
            </div>
         )
      }
      return(
         <div className="container my-5">
            <div className="row">
               <div className="col-10 mx-auto col-md-6 my-3">
                  <Link to="/recipes" className="btn btn-warning mb-5 text-capitalize">
                     back to recipes
                  </Link>
                  <img src={ imageUrl } alt="recipe" className="d-block w-100" style={{ maxHeight: "30rem" }}/>
               </div>
               {/*  info */}
               <div className="col-10 mx-auto col-md-6 my-3">
                  <h3 className="text-uppercase"> { title } </h3>
                  <h6 className="text-warning text-capitalize"> provided by { publisher } </h6>
                  <a href={ publisherUrl } target="_blank" ref="noopener noreferrer" className="btn btn-primary mt-2 text-capitalize"> publisher webpage </a>
                  <ul className="list-group mt-4">
                     <h2 className="mt-3 mb-4"> Ingredients </h2>
                     { ingredients.map((item, index) => {
                        return(
                           <li className="list-group-item"> { item } </li>
                        )
                     })}
                  </ul>
               </div>
            </div>
            <div className="row">
               <div class="container p-3 my-3 bg-dark text-white" style={{ borderRadius: "5px"}}>
                  <h1>Everything you Need to Know</h1>
                  <p><i>Preparation Time: </i>{ preparationTime } min</p>
                  <p><i>Cooking Time: </i>{ cookingTime } min</p>
                  <h3>Instructions</h3>
                  <p>{ instructions }</p>
               </div>
            </div>
         </div>
      )
   }
}
