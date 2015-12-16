var React = require('react');
var Firebase = require('firebase');
var rootURL = 'radiant-torch-5758.firebaseIO.com/';


module.exports = React.createClass({

  getInitialState: function(){
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      id: this.props.item.id
  }
},
  componentWillMount: function(){
    this.fb = new Firebase(rootURL+'items/'+this.props.item.id);
  },

  render: function(){
    return <div className ="input-group">
      <span className='input-group-addon'>
        <input
          type='checkbox'
          checked = {this.state.done}
          onChange = {this.handleDoneChange}
           />
      </span>
      <input type='text'
        className='form-control'
        value = {this.state.text}
        />
      <span className="input-group-btn">
        <button
          className="btn btn-danger"
          onClick={this.handleDeleteClick}
          >
          Delete
        </button>
      </span>
    </div>
  },
  handleDoneChange: function(event){
    var updateDone = {done: event.target.checked};
    this.setState(updateDone);
    this.fb.update(updateDone);
  },
  handleDeleteClick: function(event){
    this.fb.remove();
  }
});
