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
    if(!this.props.items){
      return <h4>Add a todo to get started</h4>
    }else{
      var children =[];
      for(var x in this.props.items){ //special case.  x -> unique id/"key"
        var item = this.props.items[x];
        item.id = x;
        children.push(
          <ListItem
            item = {item}
            />
        )
      }
      return children;
  }
}
});
