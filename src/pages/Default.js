import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../component/Header'

export default class singleRecipe extends Component {
   render() {
      return (
         <Header title="404">
            <h2 className="text-light text-uppercase">
               this page does not exist
            </h2>
            <Link to="/" className="text-light btn btn-secondary text-uppercase btn-lg mt-3">
               return home
            </Link>
         </Header>
      )
   }
}
