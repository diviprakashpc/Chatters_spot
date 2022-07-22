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
import {useHistory} from 'react-router-dom' 
const SignUp = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const history = useHistory();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    console.log(details);
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
    
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image! ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatwithme");
      data.append("cloud_name", "dbfmpczg0");

      fetch("https://api.cloudinary.com/v1_1/dbfmpczg0/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image! ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    setLoading(true);

    if (
      !details.name ||
      !details.email ||
      !details.password ||
      !details.confirmpassword
    ) {
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
    if (details.password !== details.confirmpassword) {
      toast({
        title: "Passwords do no match ",
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
      const { data } = await axios.post("api/user/", { details, pic }, config);
      toast({
        title: "Registration Successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      //localStorage.setItem("userInfo",JSON.stringify(data));
      setLoading(false) 
      history.push('/chats')
    } catch (error) {
      toast({
        title: "Error occured",
        description:"Sign up fail",
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
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={handleChange}
          name="name"
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={handleChange}
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
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter Your Password Again"
            onChange={handleChange}
            name="confirmpassword"
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
      <FormControl id="pic" isRequired>
        <FormLabel>Upload your picture</FormLabel>
        <InputGroup>
          <Input
            onChange={(e) => {
              postDetails(e.target.files[0]);
            }}
            name="pic"
            type="file"
            accept="image/*"
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
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
