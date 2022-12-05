import { Component } from 'react';
import { Header } from './Searchbar.styled';
import { SearchForm } from './Searchbar.styled';
import { SearchBtn } from './Searchbar.styled';
import { SearchBtnLabel } from './Searchbar.styled';
import { SearchInput } from './Searchbar.styled';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputValue = e => {
    const value = e.currentTarget.value;
    this.setState({
      query: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchBtn>
            <FiSearch color="black" size={20} />
            <SearchBtnLabel>Search</SearchBtnLabel>
          </SearchBtn>
          <SearchInput
            type="text"
            value={this.state.query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputValue}
          />
        </SearchForm>
      </Header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
