import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    inputValue: '',
    modalPicture: '',
    showModal: false,
    page: 1,
  };

  getInputValue = inputValue => {
    this.setState({ inputValue: inputValue, page: 1 });
  };

  onChangeModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onLargeUrl = url => {
    this.onChangeModal();
    this.setState({ modalPicture: url });
  };
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { modalPicture, showModal, page } = this.state;
    return (
      <div>
        <Searchbar getInputValue={this.getInputValue}></Searchbar>
        <ImageGallery
          inputValue={this.state.inputValue}
          onClick={this.onLargeUrl}
          loadMoreBtn={this.loadMore}
          page={page}
        />
        {showModal && <Modal url={modalPicture} onClose={this.onChangeModal} />}
      </div>
    );
  }
}

export default App;
