'use client';

import {
  Box, Button, Flex, FormControl, FormLabel, Icon, Link, Input,
  InputGroup, InputRightElement, Text, useColorModeValue
} from '@chakra-ui/react';
import illustration from '/public/img/auth/auth.png';
import { HSeparator } from '@/components/separator/Separator';
import DefaultAuth from '@/components/auth';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { supabase } from '@/lib/supabaseClient';
import React from 'react';
import { useRouter } from 'next/navigation';

function SignUp() {
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.500';
  const textColorDetails = useColorModeValue('navy.700', 'gray.500');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500', fontWeight: '500' },
    { color: 'whiteAlpha.600', fontWeight: '500' }
  );

  const [show, setShow] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();

  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleAuth = async () => {
    setError('');
    const { name, email, password, confirmPassword } = form;

    if (!email || !password || (!isLogin && (!name || !confirmPassword))) {
      setError('All fields are required');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    if (isLogin) {
      // Login
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push('/');
      }
    } else {
      // Signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        const userId = data.user?.id;
        if (userId) {
          // Insert into `users` table
          const { error: insertError } = await supabase.from('users').insert([
            { id: userId, full_name: name, email },
          ]);
          if (insertError) {
            console.error('User data insertion failed:', insertError.message);
          }
        }

        alert('Account created! Check your email to confirm.');
        setForm({ name: '', email: '', password: '', confirmPassword: '' });
      }
    }

    setLoading(false);
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
        mt={{ base: '40px', md: '8vh' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Text fontWeight="700" color={textColor} fontSize="34px" mb="10px">
            {isLogin ? 'Login' : 'Create account'}
          </Text>
          <Text color={textColorSecondary} fontWeight="500" fontSize="sm" mb="36px">
            {isLogin ? 'Login with your credentials' : 'Enter your details to sign up'}
          </Text>
        </Box>

        <Flex
          direction="column"
          w={{ base: '100%', md: '420px' }}
          background="transparent"
          borderRadius="15px"
        >
          <Button
            variant="transparent"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="14px"
            mb="30px"
            fontSize="sm"
            w="100%"
            h="54px"
          >
            <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
            Continue with Google
          </Button>

          <Flex align="center" mb="25px">
            <HSeparator />
            <Text color={textColorSecondary} fontWeight="500" fontSize="sm" mx="14px">
              or
            </Text>
            <HSeparator />
          </Flex>

          <FormControl>
            {!isLogin && (
              <>
                <FormLabel htmlFor="name" color={textColor}>Name *</FormLabel>
                <Input
                  id="name"
                  placeholder="Your full name"
                  mb="24px"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </>
            )}

            <FormLabel htmlFor="email" color={textColor}>Email *</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              mb="24px"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <FormLabel htmlFor="password" color={textColor}>Password *</FormLabel>
            <InputGroup size="md">
              <Input
                id="password"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                mb="24px"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <InputRightElement mt="4px">
                <Icon
                  color={textColorSecondary}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                  cursor="pointer"
                />
              </InputRightElement>
            </InputGroup>

            {!isLogin && (
              <>
                <FormLabel htmlFor="confirm">Confirm Password *</FormLabel>
                <InputGroup size="md">
                  <Input
                    id="confirm"
                    type={show ? 'text' : 'password'}
                    placeholder="Confirm password"
                    mb="24px"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  />
                </InputGroup>
              </>
            )}

            {error && <Text color="red.500" mb="16px">{error}</Text>}

            <Button
              variant="primary"
              py="20px"
              fontSize="sm"
              borderRadius="45px"
              mt="20px"
              w="100%"
              isLoading={loading}
              onClick={handleAuth}
            >
              {isLogin ? 'Login' : 'Create your Account'}
            </Button>
          </FormControl>

          <Flex justifyContent="center" alignItems="center" mt="4">
            <Text color={textColorDetails} fontWeight="500" fontSize="sm">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </Text>
            <Text
              color={textColorBrand}
              fontSize="sm"
              as="span"
              ms="5px"
              fontWeight="600"
              cursor="pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;
