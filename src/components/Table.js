import React, { Component } from 'react'

import Popup from './Popup';

export default class Table extends Component {
    constructor(props){
        super(props);

        this.data = this.props.data;
        this.changeData = this.props.changeData;
        this.state = {
            openChngPop : false,
            id : "",
            todo : "",
            commit : ""
        }

        this.onRowClick = this.onRowClick.bind(this);
        this.onPopupSave = this.onPopupSave.bind(this);
        this.onPopupCancel = this.onPopupCancel.bind(this);
    }
    onRowClick(id, todo, commit){
        if( this.state.openChngPop) {
            alert("수정중인 대상을 저장 또는 취소 처리 해주세요");
            return;
        }
        this.setState({
            openChngPop : true  ,
            id,
            todo,
            commit
        })
    }
    onPopupSave(id, todo, commit){
        this.setState({ openChngPop : false });
        this.changeData(id, todo, commit);
    }
    onPopupCancel(){
        this.setState({
            openChngPop : false
        })
    }
  render() {
    const {data} = this.props;
    
    return (
      <div>
          <table className="table table-bordered table-hover"><tbody>
          <tr >
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
                        <td>{value.id}</td>
                        <td>{value.todo} 
                            {
                                value.ref_id.map( (v,i)=>{
                                    if(value.ref_id.length > 1)
                                        return(<b key={i}> {'@'+v} </b>)
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
                   onSave={this.onPopupSave} onCancel={this.onPopupCancel}></Popup> : null
          }
          </div>
    )
  }
}
