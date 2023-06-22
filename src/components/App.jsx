import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  onSubmit = () => console.log('well');

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit}></Searchbar>
        <ImageGallery></ImageGallery>;
      </div>
    );
  }
}

export default App;
