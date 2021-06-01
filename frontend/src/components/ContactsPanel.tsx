import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import React, { FC, useEffect, useState } from 'react'
import fs from 'fs'
import { Contact } from '../lib/types'
import NewContactButton from './NewContactButton'
import { contactsPath } from '../lib/setup'
import { useDrag } from 'react-dnd'
import { IconButton } from '@chakra-ui/button'
import { DeleteIcon } from '@chakra-ui/icons'

interface ItemProps {
  name: string
  id: string
  onDelete: () => void
}

const ContactItem: FC<ItemProps> = ({ name, id, onDelete }) => {
  const [, drag] = useDrag(() => ({
    type: 'contact',
    item: { name, id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }))
  return (
    <Flex
      bg='mono.300'
      p='5px 10px'
      borderRadius='5px'
      mb='10px'
      ref={drag}
      role='contact'
      justifyContent='space-between'
      alignItems='center'
    >
      <Text>{name}</Text>
      <IconButton
        aria-label='Delete contact'
        bg='none'
        color='mono.900'
        _hover={{ bg: 'mono.400' }}
        _active={{ bg: 'mono.400' }}
        onClick={onDelete}
      >
        <DeleteIcon />
      </IconButton>
    </Flex>
  )
}

interface PanelProps {
  isFullHeight: boolean
}

const ContactsPanel: FC<PanelProps> = ({ isFullHeight }) => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const handleCreateContact = (contact: Contact) => {
    setContacts([...contacts, contact])
  }

  const handleDeleteContact = (id: string) => {
    const newContacts = contacts.filter(c => c.id !== id)
    setContacts(newContacts)
    // Persist to disk
    fs.writeFileSync(contactsPath, JSON.stringify(newContacts), {})
  }

  useEffect(() => {
    setContacts(JSON.parse(fs.readFileSync(contactsPath).toString()))
  }, [])

  return (
    <Box bg='mono.200' borderRadius='15px' w={{ base: '100%', md: '25%' }} h={{ md: isFullHeight ? undefined : '55vh' }}>
      <Heading fontSize='24px' p='15px'>
        Contacts
      </Heading>
      <Box m='10px'>
        {contacts.map(contact => (
          <ContactItem {...contact} onDelete={() => handleDeleteContact(contact.id)} key={contact.id} />
        ))}
      </Box>
      <NewContactButton onCreateContact={handleCreateContact} contacts={contacts} />
    </Box>
  )
}

export default ContactsPanel
