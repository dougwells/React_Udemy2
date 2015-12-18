var React = require('react');
var Firebase = require('firebase');
var rootURL = 'radiant-torch-5758.firebaseIO.com/';


module.exports = React.createClass({

//Need to set this.state.xx
  getInitialState: function(){
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      id: this.props.id,
      textChanged: false,
  }
},

//Need to better understand componentWillMount
//new Firebase() gives you object w/access to Firebase DB
  componentWillMount: function(){
    this.address = rootURL+'items/'+this.props.item.id;
    this.fb = new Firebase(this.address);
  },

  render: function(){
    return <div className ="input-group">
      <span className='input-group-addon'>
        <input
          type='checkbox'
          checked = {this.state.done}
          onChange = {this.handleDoneCheckChange}
           />
      </span>
      <input type='text'
        className='form-control {crossedOutClass}'
        value = {this.state.text}
        disabled = {this.state.done}
        onChange = {this.handleTextChange}
        />
      <span className="input-group-btn">
        {this.changesButton()}
        <button
          className="btn btn-danger"
          onClick={this.handleDeleteClick}
          >
          Delete
        </button>
      </span>
    </div>
  },

//must use this.setState to change value of this.state
handleTextChange: function(event){
    var updatedText = event.target.value;
    this.setState({
      text: updatedText,
      textChanged: true
    });
  },


changesButton: function(){
  if(this.state.textChanged){
  return [
    <button
      className="btn btn-primary"
      onClick = {this.handleSaveChange}
      >Save</button>,
    <button
      className="btn btn-success"
      onClick = {this.handleUndoClick}
      >Undo</button>
  ]
} else {
  return null;
}
},

handleUndoClick: function(){
  this.setState({
    text: this.props.item.text,
    textChanged:false
  });
},

handleSaveChange: function(){
    this.fb.update({text: this.state.text});
    this.setState({textChanged: false});
},

handleDoneCheckChange: function(event){
    var updateDone = {done: event.target.checked};
    this.setState(updateDone);
    this.fb.update(updateDone);

  },
  handleDeleteClick: function(){
    this.fb.remove();
  }
});
