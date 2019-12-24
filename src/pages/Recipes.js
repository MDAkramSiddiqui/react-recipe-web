import React, { Component } from 'react'
import RecipeList from '../component/RecipeList'
import Search from '../component/Search'
// import { recipeData } from '../data/tempList'

export default class singleRecipe extends Component {
   constructor(props) {
      super(props);
      // For this method this is necessary
      this.getRecipes = this.getRecipes.bind(this);
   }

   state = {
      recipes: {},
      search: "",
      url: `https://api.spoonacular.com/recipes/search?apiKey=${ process.env.REACT_APP_API_KEY }&number=21`,
      baseUrl: `https://api.spoonacular.com/recipes/search?apiKey=${ process.env.REACT_APP_API_KEY }&number=21`,
      query: "&query=",
      error: ""
   }

   async getRecipes() {
      try {
         const response = await fetch(this.state.url);
         const responseJSON = await response.json();
         // console.log(responseJSON.results);

         if(Object.keys(responseJSON.results).length === 0) {
            this.setState({
               error: "COULD NOT FOUND ANYTHING!!!"
            });
         }else {
            this.setState({
               recipes: responseJSON.results,
               error: ""
            });
         }

      }
      catch(error) {
         console.log(error);
      }
   }

   componentDidMount() {
      this.getRecipes();
   }



   // async componentDidMount() {

   //    try {
   //       const response = await fetch("https://api.spoonacular.com/recipes/search?apiKey=1f23a551e02e4d8cb5a9410fbaa0d8eb");
   //       const responseJSON = await response.json();
   //       // console.log(responseJSON.results);
   //       this.setState({
   //          recipes: responseJSON.results
   //       });
   //    }
   //    catch(error) {
   //       console.log(error);
   //    }
   // }

   handleChange = (e) => {
      this.setState({
         search: e.target.value
      })
   }

   handleSubmit = (e) => {
      e.preventDefault();
      const { baseUrl, query, search } = this.state;
      this.setState({
         url: `${ baseUrl }${ query }${ search }`,
         
      }, () => this.getRecipes());
   }
   render() {
      return (
         <>
            <Search search={ this.state.search } handleChange={ this.handleChange } handleSubmit={ this.handleSubmit } />
            {this.state.error ? (<section><div className="row"><div className="col"> <h2 className="text-center text-uppercase mt-5">{ this.state.error }</h2> </div></div></section>) : (<RecipeList recipes={ this.state.recipes }/>)}
         </>
      )
   }
}
