"use client"

import React, { memo, useEffect, useRef } from 'react'
import { TMessage } from '../Message/Message'
import Message from '../Message';
import Avatar from '../Avatar';

type Props = {
    messages: TMessage[];
}

const Chat = ({messages}: Props) => {

    const scrollableContentRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if(scrollableContentRef.current){
            //scrollableContentRef.current.scrollTop = scrollableContentRef.current.scrollHeight;
            scrollableContentRef.current.scrollTo({
                top: scrollableContentRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages])

  return (
    <main ref={scrollableContentRef} className='flex flex-1 flex-col gap-4 overflow-y-scroll p-5 bg-zinc-50 dark:bg-zinc-950'>
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