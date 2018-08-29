import React, { Component } from 'react'

import Popup from './Popup';

export default class Table extends Component {
    constructor(props){
        super(props);

        this.data = this.props.data;
        // this.changeData = this.props.changeData;
        this.insertData = this.props.insertData;
        this.state = {
            openChngPop : false,
            openInsert : false,
            id : "",
            todo : "",
            commit : ""
        }

        this.onRowClick = this.onRowClick.bind(this);
        this.onPopupSave = this.onPopupSave.bind(this);
        this.onPopupCancel = this.onPopupCancel.bind(this);
        this.onInsertClick = this.onInsertClick.bind(this);
        this.onInsertSaveClick = this.onInsertSaveClick.bind(this);
        this.onInsertCancelClick =this.onInsertCancelClick.bind(this);
        this.handleTodoChange = this.handleTodoChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }
    onRowClick(id, todo, commit){
        if( commit === 'Y'){
            alert("이미 완료된 할일은 수정할 수 없습니다");
            return;
        }
        if( this.state.openChngPop) {
            alert("수정중인 대상을 저장 또는 취소 처리 해주세요");
            return;
        }
        this.setState({
            openChngPop : true  ,
            openInsert  : false ,
            id,
            todo,
            commit
        })
    }
    onPopupSave(id, todo, commit){
        this.setState({ openChngPop : false });
        this.props.changeData(id, todo, commit);
    }
    onPopupCancel(){
        this.setState({
            openChngPop : false
        })
    }
    onInsertClick(){
        this.setState({
            openChngPop : false,
            openInsert : true,
            id : "",
            todo : "",
            commit : ""
        })
    }
    onInsertSaveClick(){
        if(this.state.todo === ""){
            alert("할일 : 빈값으로 입력 불가합니다.");
        }
        else {
            const inTodo = this.state.todo;
            let todoStr = "";
            let refIds = [];
            inTodo.split(' ').map( (value, i )=>{
                if( value.match("^@[0-9]")){
                    refIds.push( value.replace('@',''));
                }
                else{
                    todoStr += value + ' '
                }
            });
            this.setState({openInsert : false})
            this.insertData(todoStr, refIds)
        }
    }
    onInsertCancelClick(){
        this.setState({openInsert : false })
    }
    handleTodoChange(e){
        this.setState({todo : e.target.value})
    }
    keyPress(e){
        if(e.keyCode === 13){
            this.onInsertSaveClick();
        }
    }
  render() {
    const {data} = this.props;
    return (
      <div>
            {
                this.state.openInsert ? 
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">할일</span>
                        </div>
                        <input type="text" className="form-control" value={this.state.todo} onKeyDown={this.keyPress} onChange={this.handleTodoChange}></input>
                        <button className="btn btn-outline-primary" onClick={this.onInsertSaveClick}>저장</button>
                        <button className="btn btn-outline-danger" onClick={this.onInsertCancelClick}>취소</button>
                    </div>
                    <div className="alert alert-danger" role="alert">
                        <p> * "@+숫자" 를 입력하면 해당 ID를 참조할 수 있습니다. </p>
                        <p> * 할일과 참조는 space로 구분가능합니다.  </p>
                        <p> * Ex) 빨래 @1 @t => 할일 : 빨래 @t, 참조 : @1  </p>
                    </div>                
                 </div>
                : 
                <button className="btn btn-primary float-right"
                onClick={this.onInsertClick}>입력</button>
            }
          <table className="table table-bordered table-hover"><tbody>
          <tr className="text-center">
            <th>ID</th>
            <th>할일</th>
            <th>작성일시</th>
            <th>최종수정일시</th>
            <th>완료처리</th>
         </tr>  
          {
              data.map( (value,i)=>{
                  return(
                    <tr key={i} 
                        onClick={()=>this.onRowClick(value.id, value.todo, value.is_commit)}>
                        <td className="text-center">{value.id}</td>
                        <td>{value.todo} 
                            {
                                value.ref_id.map( (v,i)=>{
                                    if(value.ref_id != "")
                                        return(<b className="text-primary" key={i}> {'@'+v} </b>)
                                    else return null;
                            })}
                        </td>
                        <td>{value.reg_date}</td>
                        <td>{value.chng_date}</td>
                        <td>{value.is_commit}</td>
                    </tr>    
                  )
              })
          }
          </tbody></table>
            {
                this.state.openChngPop ? 
                <Popup id={this.state.id}
                    todo={this.state.todo}
                    commit={this.state.commit}
                    onSave={this.onPopupSave} onCancel={this.onPopupCancel}></Popup> 
                : 
                <div className="alert alert-primary" role="alert">
                    * 목록을 클릭하면 수정할 수 있습니다.
                </div>
            }
            {/* 페이지 번호 */}
            <div className="mx-auto btn-group mr-2">
                {
                    Array.from({ length:Math.ceil(this.props.total/this.props.limit)} ,
                    (v, k) => {
                      return( 
                        <button className="btn btn-secondary" key={k}
                                onClick={()=>this.props.onPageClick(this.props.limit,k)}> 
                          {k+1} 
                        </button> 
                      )
                    })         
                }
            </div>
          </div>
    )
  }
}

