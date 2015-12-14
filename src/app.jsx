var React = require('react');
var ReactFire = require('reactfire'); //React <-> Firebase Data
var Firebase = require('firebase'); //Communicate w/online database & get it to browser
var Header = require('./header');
var List = require('./list');
var rootURL = 'radiant-torch-5758.firebaseIO.com/';



var App = React.createClass({
//mixins - passes methods on one object to another
//React method that makes it easy to give components common set
//of methods.
  mixins: [ ReactFire ],
  getInitialState: function(){
    return {
      item: {},
      loaded: false
    }
  },

//componentWillMount --> React method. Run this after render ..
//bindAsObject -> ReactFire method binds data from URL to
//this.state.items = {data @ URL}.  RERUNS when data changes.
  componentWillMount: function(){
    var fb = new Firebase(rootURL+'items/');
    this.bindAsObject(fb,'items');
    fb.on('value', this.HandleDataLoaded);

    //Could have written above line of code as ...
      // this.firebase = new Firebase(rootURL+'items/');
      // this.bindAsObject(this.firebase, 'items');
      // -> data is available on this.firebaseRefs.items
      // -> data also avail on this.state.
  },
  render: function() {

      return <div className= 'row panel panel-default'>
          <div className='col-md-offset-2 col-md-8'>
            <h2 className='text-center'>
              To-Do List
            </h2>
            <Header itemsStore ={this.firebaseRefs.items}/>
            <hr />
            <div className = {"content "+(this.state.loaded ? 'loaded' :'')}>
              <List items ={this.state.items}/>
            </div>
          </div>
        </div>


  },
  HandleDataLoaded: function(){
    this.setState({loaded: true});
  }

});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
