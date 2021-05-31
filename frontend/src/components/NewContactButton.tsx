import { AddIcon } from '@chakra-ui/icons'
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import fs from 'fs'
import { Contact } from '../lib/types'
import ApplicationButton from './ApplicationButton'
import ApplicationInput from './ApplicationInput'
import { contactsPath } from '../lib/setup'

interface ModalProps {
  isOpen: boolean
  onFinish: (contact: Contact) => void
  onCancel: () => void
}

const NewContactModal: FC<ModalProps> = ({ isOpen, onCancel, onFinish }) => {
  const [name, setName] = useState('')
  const [id, setId] = useState('')

  const handleSubmit = () => {
    onFinish({ name, id })
  }

  return (
    <Modal isOpen={isOpen} onClose={onCancel} isCentered>
      <ModalOverlay />
      <ModalContent bg='mono.200' color='mono.900'>
        <ModalHeader>Create a contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl id='contact-name' isRequired>
              <FormLabel>Name</FormLabel>
              <ApplicationInput
                borderColor='mono.500'
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Name'
              />
              <FormHelperText>The name of this contact</FormHelperText>
            </FormControl>
            <FormControl id='contact-id' isRequired mt='10px'>
              <FormLabel>Id</FormLabel>
              <ApplicationInput
                borderColor='mono.500'
                type='text'
                value={id}
                onChange={e => setId(e.target.value)}
                placeholder='Id'
              />
              <FormHelperText>
                A user's id contains an encoded version of their IP and a secret key for encryption
              </FormHelperText>
            </FormControl>
            <Flex justifyContent='flex-end' mt='25px'>
              <ApplicationButton type='submit'>Create</ApplicationButton>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

interface Props {
  onCreateContact: (contact: Contact) => void
  contacts: Contact[]
}

const NewContactButton: FC<Props> = ({ onCreateContact, contacts }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const onClick = () => setModalOpen(true)

  const handleCreateContact = (contact: Contact) => {
    fs.writeFileSync(contactsPath, JSON.stringify([...contacts, contact]), {})
    onCreateContact(contact)
  }

  return (
    <>
      <IconButton
        aria-label='New contact'
        bg='mono.200'
        m='5%'
        w='90%'
        _hover={{ bg: 'mono.300' }}
        _active={{ bg: 'mono.400' }}
        onClick={onClick}
      >
        <AddIcon color='mono.900' />
      </IconButton>
      <NewContactModal isOpen={isModalOpen} onCancel={() => setModalOpen(false)} onFinish={handleCreateContact} />
    </>
  )
}

export default NewContactButton
