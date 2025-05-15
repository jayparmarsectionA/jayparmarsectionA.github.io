import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div>
        <div className="card my-3">
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
          }}>
            <span class="badge rounded-pill bg-danger"> {source}
            </span>
          </div>

    <img src={imageUrl} />
    
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
   
    <p className="card-text">{description}...</p>
    <p class="card-text"><small class="text-body-secondary">By {author ? author : "Unknown"} on {new Date(date).toLocaleString()}</small></p>
    <a rel="noreferrer" href= {newsUrl} target= "_blank" className="btn btn-sm btn-dark">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
