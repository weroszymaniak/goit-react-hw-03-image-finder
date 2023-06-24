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

  componentDidUpdate(prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages();
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

      if (data.hits.length === 0) {
        return 'Sorry image not found';
      }

      const sortedImages = API.sortedImages(data.hits);

      this.setState(state => ({
        images: [...state.images, ...sortedImages],
        isLoading: false,
        error: '',
        totalPages: Math.ceil(data.totalHits / 12),
      }));
      console.log('event adding');
    } catch (error) {
      this.setState({ error: 'Something went wrong!' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  // getsearch = search => {
  //   this.setState({ search: search, page: 1 });
  // };

  // onLargeUrl = url => {
  //   this.onChangeModal();
  //   this.setState({ modalPicture: url });
  // };

  render() {
    const { images, isLoading, currentPage, totalPages } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        {images.length > 0 ? (
          <ImageGallery images={images} />
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
