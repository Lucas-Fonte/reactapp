import React from 'react';

import { Container, SubmitButton, Form } from './styles';

import { FaGithubAlt, FaPlus } from 'react-icons/fa';

export default function Main() {
  return (
      <Container>
          <h1>
             <FaGithubAlt/>
             Repositories 
          </h1>

          <Form onSubmit = {() => {}}>
              <input 
                type="text"
                placeholder="Adicionar repositorio"
              />
            
             <SubmitButton disabled>
                <FaPlus color="#fff" size={14}/>
             </SubmitButton>
          </Form>
      </Container>
  );
}

