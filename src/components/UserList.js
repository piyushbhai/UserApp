import React, { useState, useEffect } from 'react'
import Nav from './Nav';
import {BASEURL} from './Baseurl';
import axios from 'axios'
import { Table, Thead, Tbody, Tr, Th, Td, Button,Container,Heading, Flex, Box ,Input  } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const UserList = () => {
  let [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [users, setUsers] = useState([]);
  const [bkpuser, setbkpuser] = useState([]);

  useEffect(() => {
    getdata()        
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Administrator',
  });

  const getdata = async(e) => {
    // console.log(user); return
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    await fetch(BASEURL + `user`, {
      method: "GET",
      headers: myHeaders,
    
    })
      .then((response) => response.json())
      .then((res) => {
        setUsers(res);
        setbkpuser(res);
       setLoading(false);
      })
      .catch((err) => console.log(err));  

}

  const filteruser = async(val) => {
    setSearchTerm(val);
    let newuser = users.filter(user =>{
     return user.name.toLowerCase().includes(val) || user.email.toLowerCase().includes(val) || user.role.toLowerCase().includes(val)
    });
    if(val==""){
      setUsers(bkpuser);
    }else{
    setUsers(newuser);
  }
  }

  const handleDelete = async(id) => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    await fetch(BASEURL + `user/${id}`, {
      method: "DELETE",
      headers: myHeaders,
    
    })
      .then((response) => response.json())
      .then((res) => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this data!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            getdata()
            Swal.fire('Deleted!', res.message, 'success');
          }
        });
        
        setLoading(false);
      })
      .catch((err) => console.log(err));  

  };

  return (
    <>
    <Nav/>

    
    <Container maxW='1200px' mt={4}>
      
    <Flex justifyContent="space-between">
      <Box>
      <Heading as="h1" size="md">Users</Heading>
      </Box>
      <Flex justifyContent="space-between">
      <Box>

              <Link type='button' colorScheme="blue" size={'sm'} to={`/add-user`}>
              <Button colorScheme="blue" size={'sm'}>   + Add New User </Button>
              </Link>
              </Box><Box>
              <Input ml={5}
          type="text"
          ize={'sm'}
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => filteruser(e.target.value)}
        />
      </Box>
    </Flex>
    </Flex>

    <Table variant="simple" mt={4}>
      <Thead>
        <Tr>
          <Th>User ID</Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Role</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users?.length>0 ? users.map(user => (
          <Tr key={user._id}>
            <Td>{user._id}</Td>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{user.role}</Td>
            <Td>
              
              <Link type='button' colorScheme="blue" size={'sm'} to={`/edit-user/${user._id}`}>
              <Button colorScheme="blue" size={'sm'}> Edit </Button>
              </Link>
             
              <Button ml={2} colorScheme="red" size={'sm'} onClick={() => handleDelete(user._id)}>
                Delete
              </Button>
            </Td>
          </Tr>
        )):
        <Tr>
          <Td colSpan={5}>No data availble</Td>
        </Tr>
        }
      </Tbody>
    </Table>
    </Container>
    </>
  );
};

export default UserList;
