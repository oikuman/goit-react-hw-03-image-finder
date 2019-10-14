import React from "react";
import PropTypes from "prop-types";
import css from "./SearchForm.module.css";

const SearchForm = ({ handleSubmit }) => {
    return (
        <form className={css.searchForm} onSubmit={handleSubmit}>
            <input
                type="text"
                autoComplete="off"
                placeholder="Search images..."
                name="search"
            />
        </form>
    );
};

SearchForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default SearchForm;
