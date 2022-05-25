import {
  Box, Button, chakra,
  Flex,
  FormControl,
  Heading,
  Input, InputGroup, InputLeftElement,
  InputRightElement, Stack
} from "@chakra-ui/react";
import {FaUserAlt, FaLock, FaBookOpen} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {authenticatedState, checkSession, verifyUser} from "./loginSlice";

export interface LoginDetailsType {
  username: string;
  password: string;
}

function Login() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(authenticatedState)

  // Icons
  const CFaUserAlt = chakra(FaUserAlt)
  const CFaLock = chakra(FaLock)
  const CFaBook = chakra(FaBookOpen)

  // Show/hide password
  const [showPassword, setShowPassword] = useState(false)
  const handleShowClick = () => setShowPassword(!showPassword)

  // Attempt login on submit
  const tryLogin = async (e: any) => {
    e.preventDefault();
    const formData = {
      username: e.target[0].value,
      password: e.target[1].value
    }
    dispatch(verifyUser(formData))
  }

  useEffect(() => {
    dispatch(checkSession())
  },[dispatch])

  useEffect(() => {
    if(isAuthenticated) return navigate('/home')
  }, [isAuthenticated, navigate])

  return (
    <>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <CFaBook boxSize='100px'/>
          <Heading>Looking Glass</Heading>
          <Box minW={{base: "90%", md: "468px"}}>
            <form onSubmit={tryLogin}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300"/>}
                    />
                    <Input
                      type="text"
                      placeholder="Username"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300"/>}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="blue"
                  width="full"
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  )
}

export default Login
