"use client"

import React, { useRef } from 'react'
import { Button } from '../ui/button';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';

type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    onSubmit:(e: React.FormEvent<HTMLFormElement>) => void;
    disabled?: boolean;

}

const ChatInput = ({ onChange, value, onSubmit, disabled}: Props) => {
    const formRef = useRef<HTMLFormElement>(null);
  return (
    <form ref={formRef} onSubmit={onSubmit}>
        <div className='flex flex-row items-center gap-8'>
            <div>
                <Textarea 
                    className='flex max-h-[14rem] min-h-[2.5rem] flex-1'
                    value={value}
                    autoFocus
                    rows={value.split('\n')?.length || 1}
                    onChange={onChange}
                    placeholder='Type your message'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter'){
                            e.preventDefault

                            if (e.shiftKey) onChange({target: {value: `${value}\n`}} as any)
                                else formRef.current?.requestSubmit()

                                return
                        }
                    }}
                />
            </div>
            <Button className={cn('gap-2', disabled && 'bg-neutral-300')} type="submit" disabled={disabled}>
                Send <Send className='size-3' />
            </Button>
        </div>

    </form>
  )
}

export default ChatInput