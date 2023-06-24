import React, { Component } from 'react';
import * as API from './api/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

class App extends Component {
  state = {
    search: '',
    images: [],
    currentPage: 1,
    error: null,
    isLoading: false,
    totalPages: 0,
  };

  onSubmit = query => {
    this.setState({
      search: query,
      images: [],
      currentPage: 1,
    });
  };

  addImages = async () => {
    const { search, currentPage } = this.state;
    try {
      this.setState({ isLoading: true });
      const response = await API.fetchImages(search, currentPage);

      if (response.hits.length === 0) {
        return 'Sorry image not found...';
      }

      const pickedImagesInfo = API.pickedImagesInfo(response.hits);
      this.setState(state => ({
        images: [...state.images, ...pickedImagesInfo],
        isLoading: false,
        error: '',
        totalPages: 3,
      }));
    } catch (error) {
      this.setState({ error: 'something went wrong!' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };
  componentDidUpdate(prevState) {
    if (
      prevState.search !== this.state.name ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages();
    }
  }
  render() {
    const { images, isLoading, currentPage, totalPages } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit}></Searchbar>
        {images.length > 0 ? (
          <ImageGallery></ImageGallery>
        ) : (
          <p>Image gallery is empty</p>
        )}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== currentPage && !isLoading && (
          <Button onClick={this.loadMore} />
        )}
      </div>
    );
  }
}

export default App;
