'use client';

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import illustration from '/public/img/auth/auth.png';
import { HSeparator } from '@/components/separator/Separator';
import DefaultAuth from '@/components/auth';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import NavLink from '@/components/link/NavLink';
import { supabase } from '@/lib/supabaseClient'; // Make sure this path is correct

function SignIn() {
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.500';
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500', fontWeight: '500' },
    { color: 'whiteAlpha.600', fontWeight: '500' },
  );

  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Login Handler
  const handleSignIn = async () => {
    if (!email || !password) {
      toast({
        title: 'Missing Fields',
        description: 'Please enter your email and password.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      toast({
        title: 'Login failed',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success!',
        description: 'You have logged in.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // Optional: redirect to dashboard
      // router.push('/dashboard')
    }
  };

  return (
    <DefaultAuth illustrationBackground={illustration?.src}>
      <Flex
        w="100%"
        maxW="max-content"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '12vh' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Text color={textColor} fontSize={{ base: '34px', lg: '36px' }} mb="10px" fontWeight={'700'}>
            Sign In
          </Text>
          <Text mb="36px" ms="4px" color={textColorSecondary} fontWeight="500" fontSize="sm">
            Enter your email and password to sign in!
          </Text>
        </Box>

        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '420px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          <Button
            variant="transparent"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="14px"
            ms="auto"
            mb="30px"
            fontSize="md"
            w="100%"
            h="54px"
          >
            <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
            Sign in with Google
          </Button>

          <Flex align="center" mb="25px">
            <HSeparator />
            <Text color={textColorSecondary} fontWeight="500" fontSize="sm" mx="14px">or</Text>
            <HSeparator />
          </Flex>

          <FormControl>
            <FormLabel htmlFor="email" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              size="lg"
              mb="24px"
              h="54px"
              fontWeight="500"
              borderColor={borderColor}
              _placeholder={placeholderColor}
            />

            <FormLabel htmlFor="pass" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="pass"
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                size="lg"
                mb="24px"
                h="54px"
                fontWeight="500"
                borderColor={borderColor}
                _placeholder={placeholderColor}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  color={textColorSecondary}
                  _hover={{ cursor: 'pointer' }}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>

            <Flex justifyContent="space-between" align="center" mb="24px">
              <Checkbox id="remember-login" colorScheme="brandScheme" me="10px" />
              <FormLabel htmlFor="remember-login" mb="0" color={textColor} fontWeight="600" fontSize="sm">
                Keep me logged in
              </FormLabel>
              <NavLink href="#">
                <Text color={textColorBrand} fontWeight="600" fontSize="sm">Forgot password?</Text>
              </NavLink>
            </Flex>

            <Button
              onClick={handleSignIn}
              isLoading={loading}
              variant="primary"
              fontSize="sm"
              borderRadius="45px"
              w="100%"
              h="54px"
              mb="24px"
            >
              Sign In
            </Button>
          </FormControl>

          <Flex justifyContent="center" mt="0px">
            <Text color={textColorSecondary} fontWeight="500" fontSize="sm">Not registered yet?</Text>
            <Link href="/others/register">
              <Text color={textColorBrand} fontWeight="600" fontSize="sm" ms="5px">Create an Account</Text>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
