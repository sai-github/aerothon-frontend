import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Button,
  Container,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Input,
  useToast,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { CgClipboard } from "react-icons/cg";

const Dashboard = () => {
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("user"));
  const [botName, setBotName] = useState("");
  const [userBots, setUserBots] = useState([]);

  useEffect(() => {
    axios
      .get("/api/bot?email=" + user.email)
      .then((res) => {
        setUserBots(res.data.data);
      })
      .catch((e) => {
        toast({
          title: "Error",
          description: e.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateToken = async () => {
    if (botName) {
      await axios
        .post("/api/bot", {
          email: user.email,
          appName: botName,
          botToken: "" + Date.now(),
        })
        .then((res) => {
          toast({
            title: "Success",
            description: res.data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((e) => {
          toast({
            title: "Error",
            description: e.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });

      await axios
        .get("/api/bot?email=" + user.email)
        .then((res) => {
          setUserBots(res.data.data);
        })
        .catch((e) => {
          toast({
            title: "Error",
            description: e.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    } else {
      toast({
        title: "Error",
        description: "Bot name required",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onCopyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied",
      status: "success",
      duration: 3000,
    });
  };

  const maskToken = (s) => {
    const tempL = s.slice(0, 4);
    return tempL + "*".repeat(s.length - tempL.length);
  };

  return (
    <Container>
      <Stack>
        <Stack direction="row" spacing={4} my={8}>
          <Input
            placeholder="Enter app name"
            maxW="60%"
            onChange={(e) => setBotName(e.target.value)}
          />
          <Button onClick={generateToken}>Generate Token</Button>
        </Stack>
        <Table variant="simple">
          <TableCaption>
            {userBots.length
              ? "*tokens need to be kept secret to avoid miss use"
              : "No bots registered"}
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Bot Name</Th>
              <Th>Token</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {userBots.map((item) => (
              <Tr key={item.botToken}>
                <Td>{item.appName}</Td>
                <Td>{maskToken(item.botToken)}</Td>
                <Td>
                  <IconButton
                    variant="ghost"
                    icon={<Icon as={CgClipboard} />}
                    onClick={() => onCopyToClipboard(item.botToken)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Container>
  );
};

export default Dashboard;
