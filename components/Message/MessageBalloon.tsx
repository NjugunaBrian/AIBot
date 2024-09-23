"use client"

import { CodeBlockChild, extractTextFromCodeBlock, formatDate, parseMimeType } from "@/lib/utils"
import Markdown from "react-markdown"
import { Label } from "../ui/label"
import { Children, useState } from "react"
import { Check, Copy, Download } from "lucide-react"
import rehypeHighlight from "rehype-highlight"

type MessageBalloonProps = {
    sender: string,
    message: string,
    date: Date
}

function CopyButton({content}: {content: React.ReactNode}){
    const [copyOk, setCopyOk] = useState(false);

    const handleCopyClick = () => {
        const codeText = Children.toArray(content).map((child: any) => extractTextFromCodeBlock(child)).join('');

        navigator.clipboard.writeText(codeText)
        setCopyOk(true);
        setTimeout(() => {
            setCopyOk(false);
            }, 1500)
        
    }

    return (
        <>
        {copyOk ? (
            <div className="flex items-center gap-1 text-sm">
                Copied <Check size={15} className="text-emerald-500"/>
            </div>
        ) : (
            <div className="flex items-center gap-1 text-sm cursor-pointer hover:opacity-70" onClick={handleCopyClick}>
                Copy <Copy size={15} /> 
            </div>
        )}
        </>
    )

}

function DownloadButton({ mimeType, content } : {mimeType: string; content: React.ReactNode}){
    const [download, setDownload] = useState(false);

    const handleDownloadClick = () => {
        const codeText = Children.toArray(content).map((child: any) => extractTextFromCodeBlock(child)).join('');
        
        const blob = new Blob([codeText], {type: 'text/plain;charset=utf-8'})
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `code.${mimeType}`
        link.click
        URL.revokeObjectURL(link.href)

        setDownload(true);
        setTimeout(() => {
            setDownload(false);
            }, 1500)
    }

    return(
        <>
        {download ? (
            <div className="flex items-center gap-1 text-sm">
               Downloaded! <Check size={15} className="text-emerald-500"/>
            </div>
        ) : (
            <div className="flex items-center gap-1 text-sm cursor-pointer hover:opacity-70" onClick={handleDownloadClick}>
                Download <Download size={15} />
            </div>
        )}
        </>
    )
}

function CodeBlockHeader({mimeType, children}: {mimeType: string; children:CodeBlockChild }){
    const parsedMimeType = parseMimeType(mimeType);

    return(
        <div className="flex justify-between bg-zinc-900 px-4 py-2">
            <div className="flex items-center cursor-pointer text-sm">{parsedMimeType}</div>
            <div className="flex justify-end gap-4">
                <CopyButton content={children.props.children}/>
                <DownloadButton content={children.props.children} mimeType={mimeType} />
            </div>
        </div>
    )
}

function getMimeTypeFromClassName(className: string){
    const mimeType = className.split('language-')[1];
    return mimeType || 'text';
}

const Pre = ({children}: any) => {
    const mimeType = getMimeTypeFromClassName(children.props.className);
    return(
        <pre>
            <CodeBlockHeader mimeType={mimeType}>{children}</CodeBlockHeader>
            {children}
        </pre>

    )
}

const Blockquote = ({children, ...props}: any) => {
    return(
        <blockquote {...props} className="my-2 border-1-2 border-neutral-600 bg-neutral-800 p-2">
            {children}
        </blockquote>
    )
}

const MessageBalloon = ({ sender, message, date }: MessageBalloonProps) => {
    return (
        <div>
            <Label className='text-xs font-semibold text-white'>
                {sender === 'AI' ? "Brian" : "Me"}
                {formatDate(date)}
            </Label>

            <Label className="text-base text-white">
                <Markdown
                   components={{
                    pre: ({node, ...props}) => <Pre {...props} />,
                    blockquote: ({node, ...props}) => <Blockquote {...props} />,
                   }}
                   rehypePlugins={[() => rehypeHighlight({ detect: true })]}
                >
                    {message}
                </Markdown>
            </Label>
        </div>
    )

}

export default MessageBalloon