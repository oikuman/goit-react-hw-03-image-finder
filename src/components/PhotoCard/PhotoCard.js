import React from "react";
import PropTypes from "prop-types";
import css from "./PhotoCard.module.css";

const PhotoCard = ({
    webformatURL,
    largeImageURL,
    likes,
    views,
    comments,
    downloads,
    handleClick
}) => (
    <div className={css.photoCard}>
        <img
            src={webformatURL}
            alt="From Web"
            data-image={largeImageURL}
            className={css.galleryItem}
        />

        <div className={css.stats}>
            <p className={css.statsItem}>
                <i className="material-icons">thumb_up</i>
                {likes}
            </p>
            <p className={css.statsItem}>
                <i className="material-icons">visibility</i>
                {views}
            </p>
            <p className={css.statsItem}>
                <i className="material-icons">comment</i>
                {comments}
            </p>
            <p className={css.statsItem}>
                <i className="material-icons">cloud_download</i>
                {downloads}
            </p>
        </div>

        <button
            type="button"
            className={css.fullscreenButton}
            onClick={handleClick}
        >
            <i className="material-icons">zoom_out_map</i>
        </button>
    </div>
);

PhotoCard.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    downloads: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default PhotoCard;
