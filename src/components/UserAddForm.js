import React, { useState, useEffect } from 'react'
import { Box, FormControl, FormLabel, Input, Button, Select,Heading,Container } from '@chakra-ui/react';
import Nav from './Nav';
import {BASEURL} from './Baseurl'
import { useParams,useNavigate, Link  } from 'react-router-dom';


const UserForm = () => {
  let [loading, setLoading] = useState(false);
  let params = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Administrator',
  });

 
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleSubmit = async(e) => {
  e.preventDefault();
  console.log(formData);
  setLoading(true);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  await fetch(BASEURL + `user`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(formData)
  })
    .then((response) => response.json())
    .then((res) => {
      setFormData({
        name: res.name,
        email: res.email,
        password: '',
        role: res.role,
      });
      navigate('/');
     setLoading(false);
    })
    .catch((err) => console.log(err));  
};
  return (
    <>
     <Nav/>    
    <Container maxW='1200px' mt={4}>
        <Heading as="h1" size="md" mb={4}>Add Users</Heading>
       <form onSubmit={handleSubmit} >
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="role" isRequired>
          <FormLabel>Role</FormLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Administrator">Administrator</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </Select>
        </FormControl>
        <Button type="submit" mt={5} colorScheme="blue">
          Submit
        </Button>
        &nbsp;
        <Link type='button' ml={5}  colorScheme="blue"  to={`/`}>
              <Button  mt={5} colorScheme="red" size={'md'}>   Back </Button>
              </Link>
      </form> 
    </Container>
    </>
  );
};

export default UserForm;
