"use client"


import Chat from "@/components/Chat";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMessages } from "@/lib/store";
import { useCompletion } from "ai/react";
import { Github, Trash } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect } from "react";

const Home = () =>  {

  const { messages, setMessages, clearMessages } = useMessages();

  const { input, setInput, handleInputChange, handleSubmit, completion, isLoading } = useCompletion({
    api: `/api`,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const onSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!input) return

    setMessages('USER', input)

    //await handleSubmit(e)
    Promise.all([handleSubmit(e)])

    setInput('')
  }

  useEffect(() => {
    if (!completion) return
    setMessages('AI', completion)
  },[setMessages, completion])

  return (
    <div className="z-10 h-screen flex-col gap-5 lg:p-5 p-2">
      <header className="flex items-center justify-between border-b px-6 py-3">
        <h1 className="text-xl font-bold">NjugunaBot</h1>
        <div className="flex items-center gap-3">
          <Link href="https://github.com/NjugunaBrian" passHref={true}>
          <Button variant="outline">
            <Github className="size-4 mr-2" />
            <span className="sr-only">Github link</span>
            Github
          </Button>
          </Link>
        </div>
      </header>
      <Chat messages= {messages} />
      <Separator />
      <div className="flex justify-between items-center mt-5">
      <Chat.Input
        value={input}
        onChange={handleInputChange}
        onSubmit={onSubmit}
        disabled={isLoading} 
      />
      <button className="flex items-center cursor-pointer rounded-lg gap-1 lg:gap-2 p-2 text-xs border border-red-500 text-red-500" onClick={clearMessages}>
          <Trash className="size-4" />
          Clear Chat
      </button>
      </div>
    </div>
    
  );
}

export default Home
