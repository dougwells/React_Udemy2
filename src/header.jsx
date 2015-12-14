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
  console.log(this.state.text);

    },

    handleInputChange: function(event){
      this.setState({text: event.target.value});
    }
});
