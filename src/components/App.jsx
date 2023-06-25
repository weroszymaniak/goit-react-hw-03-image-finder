import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import * as API from './api/api';

class App extends Component {
  state = {
    search: '',
    images: [],
    currentPage: 1,
    error: null,
    isLoading: false,
    totalPages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages();
      console.log('addin images');
    }
  }
  handleSubmit = query => {
    this.setState({ search: query, images: [], currentPage: 1 });
  };

  addImages = async () => {
    const { search, currentPage } = this.state;
    try {
      this.setState({ isLoading: true });

      const data = await API.fetchImages(search, currentPage);

      console.log(data, 'data name');
      console.log(data.hits, 'data hits');

      if (data.hits.length === 0) {
        return 'Sorry image not found';
      }

      const sortedImages = API.sortedImages(data.hits);
      console.log(sortedImages, 'sortedImages show');

      this.setState(state => ({
        images: [...state.images, ...sortedImages],
        isLoading: false,
        error: '',
        totalPages: Math.ceil(data.totalHits / 12),
      }));

      const sort = [...sortedImages];
      console.log(this.state);
      console.log(
        sort,
        'event adding',
        this.state.images,
        this.state.isLoading
      );
    } catch (error) {
      this.setState({ error: 'Something went wrong!' });
      console.log('error adding', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { images, isLoading, currentPage, totalPages } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        {images.length > 0 ? (
          <ImageGallery images={images} />
        ) : (
          <p style={{ textAlign: 'center', marginTop: '25px' }}>
            Image gallery is empty
          </p>
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
