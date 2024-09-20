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
    api: `/api/route.ts`,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const onSubmit = async(e: FormEvent<HTMLFormElement>) => {
    if(!input){
      e.preventDefault()
      return
    }

    Promise.all([handleSubmit(e)])

    setMessages('USER', input)

    try {
      const response = await fetch('api/route.ts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      })

      if(!response.ok){
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      if(!reader){
        throw new Error('No reader available');
      }

      let aiResponse = '';
      while(true){
        const { done, value } = await reader.read()
        if(done) break
        const chunk = new TextDecoder('utf-8').decode(value);
        aiResponse += chunk;
        setMessages('AI', aiResponse);

      }

    } catch (error) {
      console.error('Error reading from stream:', error);
      setMessages('AI', 'An error occurred while processing your request');
    }
    setInput('')
  }

  useEffect(() => {
    if (!completion || !isLoading) return
    setMessages('AI', completion)
  },[setMessages, completion, isLoading])

  return (
    <div className="z-10 h-screen flex-col gap-5 p-5">
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
      <div className="flex justify-between items-center p-5">
      <Chat.Input
        value={input}
        onChange={handleInputChange}
        onSubmit={onSubmit}
        disabled={isLoading} 
      />
      <button className="flex items-center cursor-pointer rounded-lg gap-2 text-xs text-red-500" onClick={clearMessages}>
          <Trash className="size-4" />
          Clear Chat
      </button>
      </div>
    </div>
    
  );
}

export default Home
