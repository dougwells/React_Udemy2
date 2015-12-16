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
  return <span>
    <button className="btn btn-primary">Save</button>
    <button className="btn btn-success">Undo</button>
  </span>
} else {
  return null;
}
},

  handleDoneChange: function(event){
    var updateDone = {done: event.target.checked};
    this.setState(updateDone);
    this.fb.update(updateDone);
  },
  handleDeleteClick: function(){
    console.log(this.props.item);
    this.fb.remove({text: this.props.item.text});
    // ;
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
