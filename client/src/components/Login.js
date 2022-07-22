import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  VStack,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Login = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    console.log(details);
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const setGuestDetails = () => {
    setDetails({
      ...details,
      email: "guest@example.com",
      password: "123456",
    });
  };
  const submitHandler = async () => {
    setLoading(true);

    if (!details.email || !details.password) {
      toast({
        title: "Please Fill all Fields! ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/user/login", { details }, config);
      console.log(data);
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error occured",
        description: "Wrong Password",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing="5px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={handleChange}
          value={details.email}
          name="email"
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter Your Password"
            onChange={handleChange}
            name="password"
            value={details.password}
            type={show ? "text" : "password"}
          />
          <InputRightElement width="4.5rem">
            <Button
              height="1.75rem"
              size="sm"
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={setGuestDetails}
      >
        Get Guest Credentials
      </Button>
    </VStack>
  );
};

export default Login;
