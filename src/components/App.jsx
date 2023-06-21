import React from 'react';
import Searchbar from './Searchbar/Searchbar';

class App extends Component {
  onSubmit = () => console.log('well');

  render() {
    return <Searchbar onSubmit={this.onSubmit}></Searchbar>;
  }
}

export default App;
