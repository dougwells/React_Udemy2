var React = require('react');
var ReactFire = require('reactfire');
var FireBase = require('firebase');
var Header = require('./header');
var rootURL = 'radiant-torch-5758.firebaseIO.com/';



var App = React.createClass({
//mixins - passes methods on one object to another
//React method that makes it easy to give components common set
//of methods.
  mixins: [ ReactFire ],

//componentWillMount --> React method. Run this after render ..
//bindAsObject -> ReactFire method binds data from URL to
//this.state.items = {data @ URL}.  RERUNS when data changes.
  componentWillMount: function(){
    this.bindAsObject(new FireBase(rootURL+'items/'),'items');
  },
  render: function() {
    return <div className='row panel panel-default'>
      <div className='col-md-offset-2 col-md-8'>
        <h2 className='text-center'>
          To-Do List
        </h2>
        <Header />
      </div>
    </div>

  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
