'use strict';
import React from 'react';
var classNames = require('classnames');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;
class TodoItem extends React.Component {
    constructor(props){
        super(props);
        this.state={
            editText:this.props.todo.title
        }
    }
    componentDidUpdate(prevProps) {
        // if (!prevProps.editing && this.props.editing) {
        //     var node = React.findDOMNode(this.refs.editField);
        //     node.focus();
        //     node.setSelectionRange(node.value.length, node.value.length);
        // }
    }
    handleChange(event){
        if(this.props.editing){
            this.setState({editText:event.target.value});
        }
    }
    handleDestroy(){
        this.props.onDelete && this.props.onDelete()
    }
    handleEdit(){
        this.props.onEdit();
        this.setState({editText:this.props.todo.title})
    }
    handleKeyDown(event){
        if(event.which===ESCAPE_KEY){
            this.setState({editText:this.props.todo.text})
            //this.props.onCancel(event);
        }else if(event.which === ENTER_KEY){
            this.handleSubmit(event);
        }
    }
    handleSubmit(event){
        let value=event.target.value.trim();
        if(value){
            this.props.onSaveEdit(value);
            this.setState({editText:value});
        }
        else{
            this.props.onDelete();
        }
    }

    render(){
        let localStyle={
            listStyleType:"none"
        };
        return(
            <li className={classNames({
                completed:this.props.todo.completed,
                editing:this.props.editing
            })}
            >
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={this.props.todo.completed}
                        onChange={this.props.onToggle}
                    />
                    <label onDoubleClick={this.handleEdit.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}>
                        {this.props.todo.text}
                    </label>
                    <button className="destroy" onClick={this.handleDestroy.bind(this)} />

                </div>
                <input
                    ref="editField"
                    className="edit"
                    value={this.state.editText}
                    onBlur={this.handleSubmit.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    onKeyDown={this.handleKeyDown.bind(this)}
                />
            </li>
        );
    }
}
export default TodoItem;