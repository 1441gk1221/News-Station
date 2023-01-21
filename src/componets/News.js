import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      loading: false,
      page:1
    }
  }
  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=5ac8a44dea46475fb30dc74aa99937cb&page=1"
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({ articles: parsedData.articles })
  }
  handlePrevClick = async ()=>{
       console.log("prev")
       let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5ac8a44dea46475fb30dc74aa99937cb&page=${this.state.page+1}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page : this.state.page-1,
      articles: parsedData.articles 
  })

  }
  handleNextClick = async ()=>{
    console.log("next")
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5ac8a44dea46475fb30dc74aa99937cb&page=${this.state.page+1}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState( {
      page:this.state.page+1,
      articles: parsedData.articles 
     } )
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">News Station -Top headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <Newsitem title={element.title?element.title.slice(0, 45):""} discription={element.description?element.description.slice(0, 85):""} imgUrl={element.urlToImage?element.urlToImage:"https://cdn.pixabay.com/photo/2018/06/17/20/35/chain-3481377_960_720.jpg"} newsUrl={element.url} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button type="button" className="btn btn-dark" onClick={this.handlePrevClick}>Prev</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
        </div>
      </div>
    )
  }
}

export default News
