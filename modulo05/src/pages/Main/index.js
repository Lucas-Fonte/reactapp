import React, { Component } from 'react';
import api from '../../services/api';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import { Container, SubmitButton, Form, List, Box} from './styles';
export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    box:'',
  };

componentDidMount(){
    const repositories = localStorage.getItem('repositories');

    if(repositories){
        this.setState({ repositories: JSON.parse(repositories) });
    }
}

componentDidUpdate(_, prevState){
    const { repositories } = this.state;

    if(prevState.repositories !== repositories){
        localStorage.setItem('respositories', JSON.stringify(repositories));
    }
}
 handleInputChange = e => {
     this.setState({ newRepo: e.target.value});
 };

 handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
        name: response.data.full_name,
    };

    this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
    })
 };

 handleBox = e => {
    this.setState({ box: 500 });
 }

 render(){
    const { newRepo, loading , repositories, box} = this.state;

    return (
        <>
        <Container>
            <h1>
                <FaGithubAlt/>
                Repositories 
            </h1>
        
            <Form onSubmit = {this.handleSubmit}>
                <input 
                    type="text"
                    placeholder="Adicionar repositorio"
                    value={newRepo}
                    onChange={this.handleInputChange}
                />
                
                <SubmitButton loading={loading} onClick = {this.handleBox}>
                    { loading ?  (
                        <FaSpinner color="#fff" size={14}/> 
                    ) : (
                        <FaPlus color="#fff" size={14} />
                    )}
                </SubmitButton>

            </Form>
            
            <List>
                {repositories.map(repository => (
                    <li key={repository.name}>
                        <span>{repository.name}</span>
                        <a href="">Detalhes</a>
                    </li>
                ))}
            </List>

        </Container>
    
        <Box style={{ width: box}} />

        </>
    );
    }

}
