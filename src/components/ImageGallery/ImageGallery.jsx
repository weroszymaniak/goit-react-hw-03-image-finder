import { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import fetchImages from '../api/api';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

class ImageGallery extends Component {
  state = {
    images: [],
    status: 'neutral',
  };
  componentDidUpdate(prevProps) {
    if (prevProps.inputValue !== this.props.inputValue) {
      this.addImages();
      console.log('mount');
    }
    if (prevProps.page !== this.props.page && this.props.page > 1) {
      this.loadMore();
    }
  }
  addImages = () => {
    const { inputValue, page } = this.props;
    fetchImages(inputValue, page)
      .then(response => {
        this.setState({
          images: response.hits,
          status: 'resolve',
        });
      })
      .catch(error => this.setState({ status: 'rejected' }));
  };

  loadMore = () => {
    const { inputValue, page } = this.props;

    fetchImages(inputValue, page)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          status: 'resolve',
        }));
      })
      .catch(error => this.setState({ status: 'rejected' }));
  };

  render() {
    const { images, status } = this.state;
    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolve') {
      return (
        <>
          <ul className={css.gallery}>
            {images.map(({ id, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                url={largeImageURL}
                tags={tags}
                onClick={this.props.onClick}
              />
            ))}
          </ul>
          {this.state.images.length !== 0 ? (
            <Button onClick={this.props.loadMoreBtn} />
          ) : (
            alert('No results')
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
