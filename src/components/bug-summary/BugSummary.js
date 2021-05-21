import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, VStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/react";

import {
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormLabel,
  useToast,
  Divider,
} from "@chakra-ui/react";

import { MdRemoveRedEye } from "react-icons/md";
import Icon from "@chakra-ui/icon";
import { Switch } from "@chakra-ui/switch";
import { useDisclosure } from "@chakra-ui/hooks";

import { baseUrl } from "../../config";

const ManageBug = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bug, setBug] = useState([]);
  const bugItemInitialState = {
    title: "",
    description: "",
    isActiveBug: true,
    priority: "Low",
  };
  const [bugItem, setBugItem] = useState(bugItemInitialState);
  const [bugID, setBugID] = useState(null);

  useEffect(() => {
    axios
      .get("/api/bug/listbug")
      .then((res) => {
        setBug(res.data.data);
      })
      .catch((e) => console.error(e));
  }, []);

  const onEditBug = (freshness, value) => {
    onOpen();

    if (freshness === "old") {
      setBugItem({
        title: value.title,
        description: value.description,
        imageUrl: value.imageUrl,
        priority: value.priority,
      });
      setBugID(value._id);
    } else {
      setBugItem(bugItemInitialState);
      setBugID(null);
    }
  };

  const onActiveChange = async (event, id) => {
    if (id) {
      await axios
        .patch("/api/bug/" + id, { isActiveBug: event.target.checked })
        .then((res) => {
          toast({
            title: "Success",
            description: res.data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onClose();
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
        .get("/api/bug/listbug")
        .then((res) => {
          setBug(res.data.data);
        })
        .catch((e) => console.error(e));
    }
  };

  return (
    <Flex direction="column" p={8}>
      <Heading mt={16} mb={4}>
        Manage Bugs Reported
      </Heading>
      <Divider mb={8} />
      <Stack direction="column" spacing={8}>
        {bug.map((item) => (
          <Box boxShadow="md" p="4" rounded="md" key={item._id}>
            <Badge
              colorScheme={item.priority === "High" ? "red" : "purple"}
              variant="outline"
              size="sm"
            >
              {item.priority}
            </Badge>
            <Flex justifyContent="space-between">
              <Heading size="sm">{item.title}</Heading>
              <Stack spacing={2} direction="row" alignItems="center">
                <Switch
                  size="md"
                  isChecked={item.isActiveBug}
                  disabled={true}
                  onChange={(e) => {
                    onActiveChange(e, item._id);
                  }}
                />

                <IconButton
                  size="lg"
                  variant="ghost"
                  colorScheme="teal"
                  icon={
                    <Icon
                      as={MdRemoveRedEye}
                      onClick={() => onEditBug("old", item)}
                    />
                  }
                />
              </Stack>
            </Flex>

            <Text>{item.description}</Text>
          </Box>
        ))}
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="380px">
          <ModalHeader>View Bug</ModalHeader>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Text>{bugItem.title}</Text>
              </Box>
              <Box>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Text>{bugItem.description}</Text>
              </Box>
              <Box>
                <FormLabel htmlFor="priority">Priority</FormLabel>
                <Text>{bugItem.priority}</Text>
              </Box>
              <Flex justifyContent="space-between" alignItems="center">
                <Image
                  src={baseUrl + "/bugimages/" + bugItem.imageUrl}
                  alt="Bug Image"
                />
              </Flex>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Discard
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ManageBug;
