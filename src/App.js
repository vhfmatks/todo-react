import React, { Component } from 'react';
import axios from 'axios';

import Table from './components/Table';

const url = "http://yhchoi.iptime.org:8001";
class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      data : {},
      total : 0,
      limit : 4,
      page  : 0,
    }
    this.getData = this.getData.bind(this);
  }
  componentDidMount(){
    this.getData(this.state.limit, this.state.page);
  }
  getData = (limit, page) =>{
    axios.get(`http://yhchoi.iptime.org:8001/todos?limit=${limit}&page=${page}`)
    .then( (result)=> {
      this.setState({
        data  : result.data.data,
        total : result.data.total_cnt
      });
    })
  }
  changeData(id, todo, is_commit){
    axios.put(`http://yhchoi.iptime.org:8001/todos`,
    {
      id,todo,is_commit
    }).then( (result) => {
      if(result.data.status === "error"){
        alert(result.data.data);
      }
      else {
        window.location.reload();
      }
    }).catch( (err) => {
      alert(err);
    }); 
  }

  onPageClick(page){
    this.setState({page})
  }

  render() { 

    if( this.state.data.length === undefined){
      return (
        <div>loading...</div>
      )  
    }else {
      return (
        <div className="container">
          <Table data={this.state.data}
                 total={this.state.total}
                 limit={this.state.limit}
                 onPageClick={this.getData}
                 changeData={this.changeData}></Table>
          <div className="btn-group mr-2">
          {
            Array.from({ length:Math.ceil(this.state.total/this.state.limit)} ,
                        (v, k) => {
                          return( 
                            <button className="btn btn-secondary" key={k}
                                    onClick={()=>this.getData(this.state.limit,k)}> 
                              {k+1} 
                            </button> 
                          )
                        })            
          }
          </div>
          </div>
      );
    }
  }
}

export default App;
