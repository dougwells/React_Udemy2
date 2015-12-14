var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {text:''}
  },

//controlled -> tied to this.state
//uncontrolled -> tied to this.props
//onChange -> do xx, when this item changes
  render: function(){
    return <div className='input-group'>
      <input
        value={this.state.text}
        onChange={this.handleInputChange}
        type='text'
        className='form-control' />
      <span className='input-group-btn'>
        <button
          onClick={this.handleClick}
          className='btn btn-primary'
          type='button'>
          Add
        </button>
      </span>
    </div>
  },

    handleClick: function(){
  //send data to firebase
  //.push -> how you create a new object in Firebase
  //different than an array's push but inspired by ...
  this.props.itemsStore.push({
    text: this.state.text,
    done: false   //done represents whether todo is done/completed
  });
  this.setState({text:''});
    },

    handleInputChange: function(event){
      this.setState({text: event.target.value});
    }
});
