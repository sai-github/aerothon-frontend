import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, VStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';
import { Stack } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/button';
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
} from '@chakra-ui/react';

import { MdEdit } from 'react-icons/md';
import { CgTrash } from 'react-icons/cg';
import Icon from '@chakra-ui/icon';
import { Switch } from '@chakra-ui/switch';
import { useDisclosure } from '@chakra-ui/hooks';

const ManageFaq = () => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [faq, setFaq] = useState([]);
    const faqItemInitialState = {
        question: '',
        answer: '',
        isActiveFaq: true,
        category: 'Option 1',
    };
    const [faqItem, setFaqItem] = useState(faqItemInitialState);
    const [faqID, setFaqID] = useState(null);

    useEffect(() => {
        axios
            .get('/api/faq/')
            .then((res) => {
                setFaq(res.data.data);
            })
            .catch((e) => console.error(e));
    }, []);

    const onDeleteFaq = async (faqItem) => {
        await axios
            .delete('/api/faq/' + faqItem._id)
            .then((res) => {
                toast({
                    title: 'Success',
                    description: res.data.message,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch((e) =>
                toast({
                    title: 'Error',
                    description: e.respone.data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            );

        await axios
            .get('/api/faq/')
            .then((res) => {
                setFaq(res.data.data);
            })
            .catch((e) => console.error(e));
    };

    const onEditFaq = (freshness, value) => {
        onOpen();

        if (freshness === 'old') {
            setFaqItem({
                question: value.question,
                answer: value.answer,
                isActiveFaq: value.isActiveFaq,
                category: value.category,
            });
            setFaqID(value._id);
        } else {
            setFaqItem(faqItemInitialState);
            setFaqID(null);
        }
    };

    const onFaqItemChange = (event) => {
        setFaqItem((prevValues) => ({
            ...prevValues,
            [event.target.name]:
                event.target.name === 'isActiveFaq'
                    ? event.target.checked
                    : event.target.value,
        }));
    };

    const onSaveFaq = async () => {
        if (faqID) {
            await axios
                .patch('/api/faq/' + faqID, faqItem)
                .then((res) => {
                    toast({
                        title: 'Success',
                        description: res.data.message,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                    onClose();
                })
                .catch((e) => {
                    toast({
                        title: 'Error',
                        description: e.response.data.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                });
        } else {
            await axios
                .post('/api/faq/', faqItem)
                .then((res) => {
                    toast({
                        title: 'Success',
                        description: res.data.message,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                    onClose();
                })
                .catch((e) => {
                    toast({
                        title: 'Error',
                        description: e.response.data.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                });
        }
        await axios
            .get('/api/faq/')
            .then((res) => {
                setFaq(res.data.data);
            })
            .catch((e) => console.error(e));
    };

    return (
        <Flex direction="column" p={8}>
            <Button
                maxW="500px"
                minW="300px"
                alignSelf="center"
                onClick={() => onEditFaq('new')}
            >
                Add FAQ
            </Button>
            <Heading mt={16} mb={4}>
                Manage FAQs
            </Heading>
            <Divider mb={8} />
            <Stack direction="column" spacing={8}>
                {faq.map((item) => (
                    <Box boxShadow="md" p="4" rounded="md" key={item._id}>
                        <Badge variant="outline" size="sm">
                            {item.category}
                        </Badge>
                        <Flex justifyContent="space-between">
                            <Heading size="sm">{item.question}</Heading>
                            <Stack
                                spacing={2}
                                direction="row"
                                alignItems="center"
                            >
                                <Switch
                                    size="sm"
                                    isChecked={item.isActiveFaq}
                                    disabled={true}
                                />

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
                                        <PopoverContent
                                            style={{ width: '120px' }}
                                            fontSize="sm"
                                        >
                                            <PopoverArrow />
                                            <PopoverHeader>
                                                Confirm delete
                                            </PopoverHeader>

                                            <PopoverBody alignSelf="center">
                                                <Button
                                                    colorScheme="red"
                                                    size="sm"
                                                    onClick={() =>
                                                        onDeleteFaq(item)
                                                    }
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
                                            onClick={() =>
                                                onEditFaq('old', item)
                                            }
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
                    <ModalHeader>FAQ Manager</ModalHeader>
                    <ModalBody>
                        <VStack spacing={4} align="stretch">
                            <Box>
                                <FormLabel htmlFor="question">
                                    Question
                                </FormLabel>
                                <Input
                                    id="question"
                                    name="question"
                                    type="text"
                                    placeholder="Type question"
                                    value={faqItem.question}
                                    onChange={onFaqItemChange}
                                />
                                <span className="errors">
                                    {!faqItem.question ? (
                                        <div>Required</div>
                                    ) : null}
                                </span>
                            </Box>
                            <Box>
                                <FormLabel htmlFor="answer">Answer</FormLabel>

                                <Textarea
                                    id="answer"
                                    name="answer"
                                    type="text"
                                    placeholder="Type answer"
                                    value={faqItem.answer}
                                    onChange={onFaqItemChange}
                                />

                                <span className="errors">
                                    {!faqItem.answer ? (
                                        <div>Required</div>
                                    ) : null}
                                </span>
                            </Box>
                            <Flex
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box>
                                    <Switch
                                        name="isActiveFaq"
                                        isChecked={faqItem.isActiveFaq}
                                        onChange={onFaqItemChange}
                                    />{' '}
                                    Show in FAQ
                                </Box>
                                <Stack direction="column">
                                    <Select
                                        name="category"
                                        placeholder="Select option"
                                        value={faqItem.category}
                                        onChange={onFaqItemChange}
                                    >
                                        <option value="Option 1">
                                            Option 1
                                        </option>
                                        <option value="Option 2">
                                            Option 2
                                        </option>
                                        <option value="Option 3">
                                            Option 3
                                        </option>
                                    </Select>
                                    <span className="errors">
                                        {!faqItem.category ? (
                                            <div>Required</div>
                                        ) : null}
                                    </span>
                                </Stack>
                            </Flex>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Discard
                        </Button>
                        <Button onClick={onSaveFaq}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default ManageFaq;
