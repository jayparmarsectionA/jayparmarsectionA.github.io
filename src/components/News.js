import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner.js'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

    static defaultProps = {
        pageSize: 6,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults:0
        }
        document.title = `${this.props.category} - NewsMonkey`;
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&category=${this.props.category}&apikey=f7b1f94cd5774bb9942e5e4e9d2ef7b8&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
    }
    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    fetchMoreData = async ()=>{
        this.setState({page: this.state.page +1});
        let url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&category=${this.props.category}&apikey=f7b1f94cd5774bb9942e5e4e9d2ef7b8&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            loading: false
        })
    };

    render() {
        let { category } = this.props;
        return (
            <>
                <h1 className="text-center" style={{marginTop:'70px'}}>NewsMonkey - {category}</h1>
                {/* {this.state.loading && <Spinner/>} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                    
                >
                    <div className="container" style={{backgroundColor:'#EEEEEE'}}>
                    <div className="row my-4">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 80) : ""} description={element.description ? element.description.slice(0, 150) : ""} newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevClick} > &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News
