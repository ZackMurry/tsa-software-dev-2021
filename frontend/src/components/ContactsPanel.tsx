import { Box, Heading, Text } from '@chakra-ui/layout'
import React, { FC, useEffect, useState } from 'react'
import fs from 'fs'
import { Contact } from '../lib/types'
import NewContactButton from './NewContactButton'
import { contactsPath } from '../lib/setup'

interface ItemProps {
  name: string
  id: string
}

const ContactItem: FC<ItemProps> = ({ name, id }) => (
  <Box bg='mono.300' p='10px' borderRadius='5px' mb='10px'>
    <Text>{name}</Text>
  </Box>
)

const ContactsPanel: FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const handleCreateContact = (contact: Contact) => {
    setContacts([...contacts, contact])
  }

  useEffect(() => {
    setContacts(JSON.parse(fs.readFileSync(contactsPath).toString()))
  }, [])

  return (
    <Box bg='mono.200' borderRadius='15px' w={{ base: '100%', md: '25%' }}>
      <Heading fontSize='24px' p='15px'>
        Contacts
      </Heading>
      <Box m='10px'>
        {contacts.map(contact => (
          <ContactItem {...contact} />
        ))}
      </Box>
      <NewContactButton onCreateContact={handleCreateContact} contacts={contacts} />
    </Box>
  )
}

export default ContactsPanel
