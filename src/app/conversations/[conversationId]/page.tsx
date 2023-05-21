import getConversationsById from '@/actions/getConversationById'
import getMessages from '@/actions/getMessages'
import StateEmpty from '@/app/components/StateEmpty'
import Body from './components/Body'
import FormMessage from './components/FormMessage'
import Header from './components/Header'

interface Params {
  conversationId: string
}
const ConversationId = async ({ params }: { params: Params }) => {
  const conversation = await getConversationsById(params.conversationId)
  const messages = await getMessages(params.conversationId)

  if (!conversation) {
    return (
      <div className="h-full lg:pl-80">
        <div className="h-full">
          <StateEmpty />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full lg:pl-80">
      <div className="flex h-full flex-col">
        <Header conversation={conversation} />
        <Body />
        <FormMessage />
      </div>
    </div>
  )
}

export default ConversationId
