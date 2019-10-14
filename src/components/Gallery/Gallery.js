import React, { Component } from 'react';
import axios from 'axios';
import shortid from 'shortid';
import css from './Gallery.module.css';
import SearchForm from '../SearchForm';
import PhotoCard from '../PhotoCard/PhotoCard';
import Modal from '../Modal/Modal';

class Gallery extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    search: null,
    page: 1,
    url: `https://pixabay.com/api/`,
    pics: [],
    displayModal: false,
    modalUrl: null,
  };

  async componentDidMount() {
    await this.startNewImagesSearch();
  }

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (search !== prevState.search) {
      await this.startNewImagesSearch();
    }

    if (page > prevState.page) {
      await this.updateImagesSearch();
    }
  }

  handleClick = e => {
    const imageUrl = e.currentTarget.parentElement.querySelector('img').dataset
      .image;

    this.setState({
      displayModal: !this.state.displayModal,
      modalUrl: imageUrl,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const newSearch = e.target.firstChild.value;
    this.setState(prevState => ({
      page: 1,
      search: newSearch,
      pics: [],
    }));

    await this.startNewImagesSearch();
  };

  loadMoreHandler = async () => {
    const { page } = this.state;
    this.setState({
      page: page + 1,
    });
    await this.updateImagesSearch();
  };

  closeModalinModal = () => {
    this.setState({
      displayModal: !this.state.displayModal,
    });
  };

  async updateImagesSearch() {
    // eslint-disable-next-line camelcase
    const { search, page, url, pics } = this.state;
    const key = process.env.REACT_APP_API_KEY;
    const queryString = `${url}?image_type=photo&orientation=horizontal&per_page=12&q=${search}&page=${page}&key=${key}`;

    try {
      const picsAllData = await axios.get(queryString);
      const newPicsData = picsAllData.data.hits.map(pic => {
        return {
          webformatURL: pic.webformatURL,
          largeImageURL: pic.largeImageURL,
          likes: pic.likes,
          views: pic.views,
          comments: pic.comments,
          downloads: pic.downloads,
        };
      });
      const oldPics = pics;
      const updatedPics = [...oldPics, ...newPicsData];
      this.setState({
        pics: [...updatedPics],
      });
      window.scrollTo({
        top: document.querySelector('ul').scrollHeight,
        behavior: 'smooth',
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async startNewImagesSearch() {
    // eslint-disable-next-line camelcase
    const { search, page, url } = this.state;
    const key = process.env.REACT_APP_API_KEY;
    const queryString = `${url}?image_type=photo&orientation=horizontal&per_page=12&q=${search}&page=${page}&key=${key}`;

    try {
      const pics = await axios.get(queryString);
      const picsData = pics.data.hits.map(pic => {
        return {
          webformatURL: pic.webformatURL,
          largeImageURL: pic.largeImageURL,
          likes: pic.likes,
          views: pic.views,
          comments: pic.comments,
          downloads: pic.downloads,
        };
      });
      this.setState({
        pics: picsData,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  render() {
    let modal = null;

    if (this.state.displayModal)
      modal = (
        <div>
          <Modal
            closeModalinModal={this.closeModalinModal}
            modalUrl={this.state.modalUrl}
          />
        </div>
      );

    return (
      <div>
        <SearchForm handleSubmit={this.handleSubmit} />
        <ul className={css.gallery}>
          {this.state.pics.map(
            ({
              webformatURL,
              largeImageURL,
              likes,
              views,
              comments,
              downloads,
            }) => (
              <li key={shortid()} className="galleryItem">
                <PhotoCard
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  likes={likes}
                  views={views}
                  comments={comments}
                  downloads={downloads}
                  handleClick={this.handleClick}
                />
              </li>
            ),
          )}
        </ul>

        <button
          type="button"
          className={css.button}
          onClick={this.loadMoreHandler}
        >
          Load More
        </button>
        {modal}
      </div>
    );
  }
}

export default Gallery;
