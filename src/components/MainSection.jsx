'use strict';
import React, {Component,PropTypes} from 'react';
import TodoItem from './TodoItem.jsx';
import TodoFilter from './TodoFilter.jsx';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters.jsx'

var ENTER_KEY = 13;
var key=0;

const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: todo => !todo.completed,
    [SHOW_COMPLETED]: todo => todo.completed
};



class MainSection extends React.Component {
    constructor(props){
        super(props);
        this.state={
            filter: SHOW_ALL,
            editing:null
        };
    }

    edit(todo,text){
        this.props.actions.editTodo(todo.id,text);
    }


    handleClickAll(){
        this.setState({filter:SHOW_ALL})
    }
    handleClickActive(){
        this.setState({filter:SHOW_ACTIVE})
    }
    handleClickCompleted(){
        this.setState({filter:SHOW_COMPLETED})
    }
    handleNewTodoKeyDown(event){
        if(event.keyCode !== ENTER_KEY)
            return;
        event.preventDefault();

        var val=this.state.newTodo.trim();
        if(val){
            this.addTodo(val);
            //this.setState({newTodo:''});
        }
    }
    renderToggleAll(completedCount) {
        const { todos, actions } = this.props;
        if (todos.length > 0) {
            return (
                <input className="toggle-all"
                       type="checkbox"
                       checked={completedCount === todos.length}
                       onChange={actions.completeAll} />
            )
        }
    }
    renderTodoItem(todo) {
        return (
            <TodoItem
                todo={todo}
                key={key++}
                onToggle={this.toggle.bind(this,todo)}
                handleDestroyButton={this.destroyButton.bind(this,todo)}
                onEdit={this.edit.bind(this,todo)}
                editing={this.state.editing===todo}
                onSave={this.save.bind(this,todo)}
                onCancel={this.cancel.bind(this)}
            />
        )
    }

    toggle(todoToToggle){
        this.props.actions.completeTodo(todoToToggle.id);
    }

    handleNewTodoKeyDown(event){
        if(event.keyCode !== ENTER_KEY)
            return;
        event.preventDefault();

        var val=event.target.value.trim();
        if(val){
            this.props.actions.addTodo(val);
            event.target.value='';
            // this.setState({newTodo:''});
        }
    }

    handleClearCompleted() {
        this.props.actions.clearCompleted()
    }

    handleShow(filter) {
        this.setState({ filter })
    }

    renderToggleAll(completedCount) {
        const { todos, actions } = this.props;
        if (todos.length > 0) {
            return (
                <input className="toggle-all"
                       type="checkbox"
                       checked={completedCount === todos.length}
                       onChange={actions.completeAll} />
            )
        }
    }

    renderFooter(completedCount) {
        const { todos } = this.props;
        const { filter } = this.state;
        const activeCount = todos.length - completedCount;

        if (todos.length) {
            return (
                <TodoFilter
                    completedCount={completedCount}
                    activeCount={activeCount}
                    filter={filter}
                    clearCompletedButton={this.handleClearCompleted.bind(this)}
                    nowShowing={this.state.filter}
                    clickedAll={this.handleClickAll.bind(this)}
                    clickedActive={this.handleClickActive.bind(this)}
                    clickedCompleted={this.handleClickCompleted.bind(this)}

                />
            )
        }
    }
    edit(todo){
        this.setState({editing:todo.id})
    }
    deleteTodo(todo){
        this.props.actions.deleteTodo(todo.id)
    }
    cancel(){
        this.setState({editing:null})
    }
    render() {
        var footer;
        var main;

        const { todos, actions } = this.props;
        const { filter } = this.state;
        console.log(filter);
        const filteredTodos = todos.filter(TODO_FILTERS[filter]);
        const completedCount = todos.reduce((count, todo) =>
                todo.completed ? count + 1 : count,
            0
        );

        return (
            <div>
                <header className="header">
                    <input
                        className="new-todo"
                        type="text"
                        placeholder="What needs to be done?"
                        //onChange={this.handleChange.bind(this)}
                        onKeyDown={this.handleNewTodoKeyDown.bind(this)}

                    />
                </header>
                <section className="main">
                    {this.renderToggleAll(completedCount)}
                    <ul className="todo-list">
                        {filteredTodos.map(todo=>
                            <TodoItem 
                                key={todo.id} 
                                todo={todo}
                                editing={this.state.editing === todo.id}
                                onDelete={this.deleteTodo.bind(this,todo)}
                                onToggle={this.toggle.bind(this,todo)}
                                onSaveEdit={this.edit.bind(this,todo)}
                                onEdit={this.edit.bind(this,todo)}
                                onCancel={this.cancel.bind(this)}
                            />
                        )}
                    </ul>
                </section>
                {this.renderFooter(completedCount)}
            </div>
        );
    }
}
MainSection.propTypes={
    todos:PropTypes.array.isRequired,
    actions:PropTypes.object.isRequired
};
export default MainSection;
