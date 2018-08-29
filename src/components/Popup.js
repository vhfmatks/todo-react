import React, { Component } from 'react'

export default class Popup extends Component {
    constructor(props){
        super(props);
        this.state = {
            todo   : this.props.todo,
            commit : this.props.commit
        };

        this.handleCommitChange = this.handleCommitChange.bind(this);
        this.handleTodoChange   = this.handleTodoChange.bind(this);
    }
    handleTodoChange(event){
        this.setState({todo : event.target.value})
    }
    handleCommitChange(event){
        this.setState({commit : event.target.value})
    }
  render() {
    const { id, onSave, onCancel } = this.props;

    return (
      <div className="bg-light">
        <h1> 데이터 수정 ( ID : <b> {id} </b>) </h1>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">할일</span>
            </div>
            <input type="text" className="form-control" value={this.state.todo} onChange={this.handleTodoChange}></input>
        </div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" >완료</label>
            </div>
            <select className="custom-select" id="inputGroupSelect01" 
                    value={this.state.commit} onChange={this.handleCommitChange}>
                <option value="Y">Y</option>
                <option value="N">N</option>
            </select>

        </div>
        <div className="input-group mb-3">
            <button className="btn btn-outline-primary" onClick={()=>onSave(id , this.state.todo, this.state.commit)}>저장</button>
            <button className="btn btn-outline-danger" onClick={onCancel}>취소</button>
        </div>
      </div>
    )
  }
}
