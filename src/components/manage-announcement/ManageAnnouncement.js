import React, { useEffect, useState } from "react";
import axios from "axios";
import DateFnsUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, VStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import {
  Badge,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  Divider,
} from "@chakra-ui/react";

import { MdEdit } from "react-icons/md";
import { CgTrash } from "react-icons/cg";
import Icon from "@chakra-ui/icon";
import { Switch } from "@chakra-ui/switch";
import { useDisclosure } from "@chakra-ui/hooks";

const ManageAnnouncement = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [announcement, setAnnouncement] = useState([]);
  const announcementItemInitialState = {
    message: "",
    activeFrom: new Date(),
    activeTill: new Date(),
  };
  const [announcementItem, setAnnouncementItem] = useState(
    announcementItemInitialState
  );
  const [announcementID, setAnnouncementID] = useState(null);

  useEffect(() => {
    axios
      .get("/api/announcement/")
      .then((res) => {
        setAnnouncement(res.data.data);
      })
      .catch((e) => console.error(e));
  }, []);

  const onDeleteAnnouncement = async (announcementItem) => {
    await axios
      .delete("/api/announcement/" + announcementItem._id)
      .then((res) => {
        toast({
          title: "Success",
          description: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((e) =>
        toast({
          title: "Error",
          description: e.respone.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      );

    await axios
      .get("/api/announcement/")
      .then((res) => {
        setAnnouncement(res.data.data);
      })
      .catch((e) => console.error(e));
  };

  const dateChange = (cdt, name) => {
    console.log("cdt here===", cdt);
    setAnnouncementItem((prevValues) => ({
      ...prevValues,
      [name]: cdt,
    }));
  };

  const onEditAnnouncement = (freshness, value) => {
    onOpen();

    if (freshness === "old") {
      setAnnouncementItem({
        message: value.message,
        activeFrom: value.activeFrom,
        activeTill: value.activeTill,
      });
      setAnnouncementID(value._id);
    } else {
      setAnnouncementItem(announcementItemInitialState);
      setAnnouncementID(null);
    }
  };

  const onAnnouncementItemChange = (event) => {
    setAnnouncementItem((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const onSaveAnnouncement = async () => {
    if (announcementID) {
      await axios
        .patch("/api/announcement/" + announcementID, announcementItem)
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
    } else {
      await axios
        .post("/api/announcement/", announcementItem)
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
    }
    await axios
      .get("/api/announcement/")
      .then((res) => {
        setAnnouncement(res.data.data);
      })
      .catch((e) => console.error(e));
  };

  return (
    <Flex direction="column" p={8}>
      <Button
        maxW="500px"
        minW="300px"
        alignSelf="center"
        onClick={() => onEditAnnouncement("new")}
      >
        Add Announcement
      </Button>
      <Heading mt={16} mb={4}>
        Manage Announcements
      </Heading>
      <Divider mb={8} />
      <Stack direction="column" spacing={8}>
        {announcement.map((item) => (
          <Box boxShadow="md" p="4" rounded="md" key={item._id}>
            <Flex justifyContent="space-between">
              <Heading size="sm">{item.message}</Heading>
              <Stack spacing={2} direction="row" alignItems="center">
                <Popover>
                  <PopoverTrigger>
                    <IconButton
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      icon={<Icon as={CgTrash} />}
                    />
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent style={{ width: "120px" }} fontSize="sm">
                      <PopoverArrow />
                      <PopoverHeader>Confirm delete</PopoverHeader>

                      <PopoverBody alignSelf="center">
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={() => onDeleteAnnouncement(item)}
                        >
                          Delete
                        </Button>
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </Popover>

                <IconButton
                  size="sm"
                  variant="ghost"
                  colorScheme="teal"
                  icon={
                    <Icon
                      as={MdEdit}
                      onClick={() => onEditAnnouncement("old", item)}
                    />
                  }
                />
              </Stack>
            </Flex>

            <Text>{item.answer}</Text>
          </Box>
        ))}
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="380px">
          <ModalHeader>Announcement Manager</ModalHeader>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <FormLabel htmlFor="message">Message</FormLabel>
                <Input
                  id="message"
                  name="message"
                  type="text"
                  placeholder="Type message"
                  value={announcementItem.message}
                  onChange={onAnnouncementItemChange}
                />
                <span className="errors">
                  {!announcementItem.message ? <div>Required</div> : null}
                </span>
              </Box>
              <Box>
                <FormLabel htmlFor="message">Start Date</FormLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    label="2px spacing"
                    value={announcementItem.activeFrom}
                    onChange={(date) => dateChange(date, "activeFrom")}
                  />
                </MuiPickersUtilsProvider>
              </Box>
              <Box>
                <FormLabel htmlFor="message">End Date</FormLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    label="2px spacing"
                    value={announcementItem.activeTill}
                    onChange={(date) => dateChange(date, "activeTill")}
                  />
                </MuiPickersUtilsProvider>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Discard
            </Button>
            <Button onClick={onSaveAnnouncement}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ManageAnnouncement;
