import React, { Component } from 'react';
import { observer } from 'mobx-react';

// components
import ListItem from '../../components/ListItem';
import Spinner from '../../components/Spinner';

// vendor components
import {
  Table,
  DropdownButton,
  Dropdown,
  InputGroup,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

// models
import { Pokemon } from '../../../models';

const PAGE_SIZES = [5, 10, 20, 50];

@observer
class PokemonListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      pageSize: PAGE_SIZES[0],
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.fetchList({
      limit: PAGE_SIZES[0],
    })
      .then(res =>
        this.setState({
          isLoading: false,
          data: res,
        }),
      )
      .catch(err =>
        this.setState({
          isLoading: false,
          data: [],
        }),
      );
  }

  fetchList = params => {
    return Pokemon.fetchList(params);
  };

  thisHandleChangePageSize = value => {
    this.setState({
      pageSize: value,
      isLoading: true,
    });

    this.fetchList({
      limit: value,
    })
      .then(res =>
        this.setState({
          isLoading: false,
          data: res,
        }),
      )
      .catch(err =>
        this.setState({
          isLoading: false,
          data: [],
        }),
      );
  };

  handleSearchPokemon = () => {
    const { searchTerm, pageSize } = this.state;

    this.setState({ isLoading: true });

    let promise;

    if (searchTerm) {
      promise = Pokemon.fetchPokemonByIdOrName({
        pokemonIdOrName: searchTerm,
      });
    } else {
      promise = this.fetchList({
        limit: pageSize,
      });
    }

    promise
      .then(res =>
        this.setState({
          isLoading: false,
          data: [].concat(res),
        }),
      )
      .catch(err =>
        this.setState({
          isLoading: false,
          data: [],
        }),
      );
  };

  handleChangeSearchTerm = e => {
    const { value } = e.target;

    this.setState({ searchTerm: value });
  };

  render() {
    const { isLoading, pageSize, searchTerm, data } = this.state;

    if (isLoading) return <Spinner />;

    return (
      <div>
        <Container fluid>
          <Row>
            <Col>
              <Row>
                <Col xs={8}>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Pokemon name or id"
                      value={searchTerm}
                      onChange={this.handleChangeSearchTerm}
                    />

                    <InputGroup.Append>
                      <Button
                        onClick={this.handleSearchPokemon}
                        variant="outline-secondary"
                      >
                        Search
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>

                <Col xs={4}>
                  <DropdownButton id="dropdown-item-button" title={pageSize}>
                    {PAGE_SIZES.map(value =>
                      <Dropdown.Item
                        key={value}
                        eventKey={value}
                        onSelect={this.thisHandleChangePageSize}
                        active={+value === +pageSize}
                        as="button"
                      >
                        {value}
                      </Dropdown.Item>,
                    )}
                  </DropdownButton>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table responsive striped bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Weight</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length
                    ? data.map(pokemonItem =>
                        <ListItem
                          key={pokemonItem.id}
                          id={pokemonItem.id}
                          name={pokemonItem.name}
                          types={pokemonItem.types}
                          images={pokemonItem.sprites}
                          weight={pokemonItem.weight}
                        />,
                      )
                    : <tr>
                        <td colSpan="5">NO DATA</td>
                      </tr>}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PokemonListPage;
