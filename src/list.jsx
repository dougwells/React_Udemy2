var React = require('react');
var ListItem = require('./list-item');
var Header = require('./header');

module.exports = React.createClass({

  render: function(){
    return <div>
      {this.renderList()}
    </div>
  },

  renderList:function(){
    if(this.props.items && Object.keys(this.props.items).length===0){
      return <h2>Add a todo to get started</h2>
    }else{
      var children =[];
      for(var key in this.props.items){
        var item = this.props.items[key];
        item.key = key;
        children.push(
          <ListItem
            item = {item}
            key = {item.key}
            />
        )
      }
      return children;
  }
}
});
