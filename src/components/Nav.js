// src/Navbar.js
import { Box, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box p={4} bg="blue.500" color="white">
      <Flex justify="space-between" align="center">
        <Link as={RouterLink} to="/" fontSize="2xl" fontWeight="bold">
          App
        </Link>
        <Box>
          <Link as={RouterLink} to="/" mx={2}>
            Users
          </Link>
          <Link as={RouterLink} to="/books" mx={2}>
            Books
          </Link>
          <Link as={RouterLink} to="/blog" mx={2}>
            Blog
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
