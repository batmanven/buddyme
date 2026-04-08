import { useAppContext } from '@/contexts/app-provider'
import { useUser } from '@clerk/expo'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { useChatContext } from 'stream-chat-expo'

const ExploreScreen = () => {

  const { setChannel } = useAppContext()
  const { user } = useUser()

  const { client } = useChatContext()
  const userId = user?.id ?? "";

  const [creating, setCreating] = useState<string | null>(null);
  const [search, setSearch] = useState("");




  return (
    <View>
      <Text>ExploreScreen</Text>
    </View>
  )
}

export default ExploreScreen