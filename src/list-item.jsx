var React = require('react');
var Firebase = require('firebase');
var rootURL = 'radiant-torch-5758.firebaseIO.com/';


module.exports = React.createClass({

  getInitialState: function(){
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
  }
},
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
        className='form-control'
        value = {this.state.text}
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
  console.log(this.props.item.text);
  this.setState({
    text: this.props.item.text,
    textChanged:false
  });
},

handleSaveChange: function(){
  this.fb.update(updateDone);
},

handleDoneCheckChange: function(event){
    var updateDone = {done: event.target.checked};
    this.setState(updateDone);
  },
  handleDeleteClick: function(){
    console.log(this.address);
    this.fb.remove();
  },
  handleTextChange: function(event){
    var updatedText = event.target.value;
    this.setState({
      text: updatedText,
      textChanged: true
    });
    this.fb.update({text: updatedText});
  }
});
