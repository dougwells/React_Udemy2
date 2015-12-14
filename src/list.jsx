var React = require('react');
var Header = require('./header');

module.exports = React.createClass({

  render: function(){
    return <ul>
      {this.renderList()}
    </ul>
  },

  renderList:function(){
    if(this.props.items && Object.keys(this.props.items).length===0){
      return <h2>Add a todo to get started</h2>
    }else{
      var children =[];
      for(var key in this.props.items){
        children.push(
          <li>{this.props.items[key].text}</li>
        )
      }
      return children;
  }
}
});
