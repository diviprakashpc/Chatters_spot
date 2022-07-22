import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack
} from "@chakra-ui/react";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
const Homepage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        w="100%"
        bg={"white"}
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize={"4xl"} fontFamily="Work Sans" color="black">
          Chat With Me
        </Text>
      </Box>
      <Box bg="white" w="100%" p="4" borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded" colorScheme="orange">
          <TabList marginBottom="1em">
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel><Login /></TabPanel>
            <TabPanel><SignUp /></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
