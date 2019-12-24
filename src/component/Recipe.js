import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Recipe extends Component {
   render() {
      // const { id, title, readyInMinutes, servings, imageUrls } = this.props.recipe;
      const { id, title, readyInMinutes, servings, image } = this.props.recipe;
      const imageUrl = "https://spoonacular.com/recipeImages/" + image;
      
      return (
         <div className="col-10 mx-auto col-md-6 col-lg-4 my-3">
            <div className="card" style={{height: '100%'}}>
               <img src={ imageUrl } style={{height: "14rem"}} className="img-card-top" alt="recipe"/>
               <div className="card-body text-capitalize">
                  <h4>{ title }</h4>
                  <h6><i>Ready In </i> { readyInMinutes } min</h6>
                  <h6><i>Servings </i> { servings }</h6>
               </div>
               <div className="card-footer">
                  <Link to={`/recipes/${ id }`} className="btn btn-primary text-capitalize">details</Link>
                  <a href={ imageUrl } target="_blank" ref="noopener noreferrer" className="btn btn-success mx-2 text-capitalize">Recipe Url</a>
               </div>
            </div>
         </div>
      ) 
   } 
}
