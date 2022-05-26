import React, { Component } from 'react';
import "./RJS News App.css";
const YOUR_API_KEY = "4a07b4b4ddb1441c9d63e9686922ed59"
let CHANEL_CODE = ""
let SEARCH_CODE = ""
let url = "https://newsapi.org/v2/everything?q=tesla&from=2022-05-06&sortBy=publishedAt&apiKey=4a07b4b4ddb1441c9d63e9686922ed59"
let all_items = []

function getData(val){
    CHANEL_CODE = val.target.value   
}
function getSearch(val){
    SEARCH_CODE = val.target.value
}

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
            end: 5,
            check: false,
            isLoading: true,
            items: [],
            error: ""   
        };
    }
fetch_data = (url) =>{
    fetch(url)
    .then(res => res.json())
    .then(
        result => {
            if (result.status === "error"){
                all_items = []
                this.setState( {
                    isLoading: false,
                    items: [],
                    error: result.message
                })
            }
            else{
                all_items = result.articles
                this.setState({
                    isLoading: false,
                    check: false,
                    error: "",
                    items: result.articles.slice(0,this.state.end)
            });
        }
        },
)
 }   
componentDidMount = () => {  
        this.fetch_data(url)     
 }
Load = () => {
    if(this.state.check || this.state.end >= 40){
        return
    }
    this.setState( {
        items: all_items.slice( 0,this.state.end+5),
        end: this.state.end+5             
    }) 
    
}
filter = () => {
    this.setState( {
        end: 5    
    })
    if (CHANEL_CODE === ""){
        url = "https://newsapi.org/v2/everything?q=tesla&from=2022-05-06&sortBy=publishedAt&apiKey=4a07b4b4ddb1441c9d63e9686922ed59"
    }else{
        url =  `https://newsapi.org/v1/articles?source=${CHANEL_CODE}&apiKey=${YOUR_API_KEY}`
    }
    this.fetch_data(url)
} 


search_query = () => {
    this.setState( {
        end: 5, 
        isLoading: true
    })
   
        let my_list = []
        all_items.forEach(function(item) {
            let my_title = item.title
            if (my_title.match(SEARCH_CODE)){
                    my_list.push(item)
                    this.setState({
                    check: true
                    })
                }
        })

        if (!this.state.check) {
            this.setState({
                isLoading: false,
                check: true,
                items: my_list.slice(0,this.state.end),
                error: "There is nothing to show"
            })
        } 
        else {
            this.setState({
            isLoading: false,
            check: false,
            items: my_list.slice(0,this.state.end),
            error: ""
            })   
        }

    
}


render() {
    if ( this.state.isLoading) {
        return <p> Loading...</p>
    } else {
        return (
            <div className="style_of_app">
                <header className="style_of_header">News App</header>
                <div class="container">
                    <div class="search-container">     
                            <input type="text" id="myInput" onChange={getSearch} class="search"  name="query" placeholder="Enter Your Query" title="Type in a query"/>
                            <button class="btn" type="submit"  onClick ={this.search_query} value="search">Search</button>
                     </div>
                </div>
                <div class="wrapper">
                    <ul class="style_of_list" id = "news-container">
                        {this.state.items.map(item =>(        
                            <li class="style_of_news">
                                <img src ={item.urlToImage} alt ="can't be loaded" class="style_of_pic"/>
                                <h2 class="style_of_source">{item.author}</h2>
                                <a class="style_of_link"  href={item.url} target="_blank" rel='noreferrer'>{item.title}</a>
                            </li>))}
                    </ul>   
                    <div class="block">
                        <button class="btn" type="submit" onClick= {this.Load} value="search">Load More</button>
                    </div>
                </div> 
                <div class="search-container"> 
                    <input type="text" id="Filter" class="search" onChange={getData} name="sourse" placeholder="Filter" title="Type in a source"/>
                    <button class="btn" type="submit"  onClick = {this.filter} value="search">Filter</button>
                    <p id = "res-state" class="style_of_result">{this.state.error}</p>
                </div>
            </div>                    
        )
    }
}
}


/*items.map(item => (
                    <li class="style_of_news">
                        <img src ={item.urlToImage} alt ="can't be loaded" class="style_of_pic"/>
                        <h2 class="style_of_source">{item.source.name}</h2>
                        <h2><a class="style_of_link"  href={item.url} target="_blank" rel='noreferrer'>{item.title}</a></h2>
                    </li>))*/