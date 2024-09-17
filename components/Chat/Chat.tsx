import React, { memo } from 'react'
import { TMessage } from '../Message/Message'
import Message from '../Message';
import Avatar from '../Avatar';

type Props = {
    messages: TMessage[];
}

const Chat = ({messages}: Props) => {
  return (
    <main>
        {messages.map((message) => (
            <Message key={message.id} sender={message.creator}>
                {message.creator === 'AI' ? <Avatar.Bot /> : null}
                <Message.Balloon 
                    sender={message.creator}
                    message={message.text}
                    date={message.createdAt}

                />
                {message.creator === 'USER' ? <Avatar.User /> : null }

            </Message>
        ))}
    </main>
  )
}

export default memo(Chat)