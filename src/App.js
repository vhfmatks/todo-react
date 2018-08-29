import React, { Component } from 'react';
import Table from './components/Table';

import getData from './service/get.service';
import putData from './service/put.service';
import postData from './service/post.service';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      data : {},
      total : 0,
      limit : 5,
      page  : 0,
    }
  }
  componentDidMount(){
    this.getData(this.state.limit, this.state.page);
  }
  getData = (limit, page) =>{
    this.setState({
      limit , page
    })
    getData(limit, page)
    .then( (result)=> {
      this.setState({
        data : result.data.data,
        total : result.data.total_cnt
      })
    })
    .catch( (err) => {
      alert(err);
    })
  }
  changeData(id, todo, is_commit){
    putData( {id, todo, is_commit} )
    .then ( ( result ) =>{
      this.getData(this.state.limit, this.state.page);
    })
    .catch( (err) => {
      alert(err);
    })
  }
  insertData( todo, ref ){
    postData( { todo, ref })
    .then ( ( result ) =>{
      this.getData(this.state.limit, this.state.page);
    })
    .catch( (err) => {
      alert(err);
      this.getData(this.state.limit, this.state.page);
    })
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
          <h1>TODO LIST</h1> 
          <Table data={this.state.data}
                 total={this.state.total}
                 limit={this.state.limit}
                 onPageClick={this.getData}
                 changeData={(id,todo,commit)=>this.changeData(id,todo,commit)}
                 insertData={(todo,ref)=>this.insertData(todo,ref)}></Table>
        </div>
      );
    }
  }
}

export default App;
