import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Recipe extends Component {
   render() {
      // const { id, title, readyInMinutes, servings, imageUrls } = this.props.recipe;
      const { image_url, title, source_url, publisher, recipe_id } = this.props.recipe;
      return (
         <div className="col-10 mx-auto col-md-6 col-lg-4 my-3">
            <div className="card" style={{height: '100%'}}>
               <img src={ image_url } style={{height: "14rem"}} className="img-card-top" alt="recipe"/>
               <div className="card-body text-capitalize">
                  <h4>{ title }</h4>
                  <h6>provided by { publisher }</h6>
               </div>
               <div className="card-footer">
                  <Link to={`/recipes/${ recipe_id }`} className="btn btn-primary text-capitalize">details</Link>
                  <a href={ image_url } target="_blank" ref="noopener noreferrer" className="btn btn-success mx-2 text-capitalize">Recipe Url</a>
               </div>
            </div>
         </div>
      ) 
   } 
}
