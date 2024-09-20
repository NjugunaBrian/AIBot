import Image from "next/image"

const BotAvatar = () => {
    return(
        <Image src="/Image.jpg" className="rounded-full" height={16} width={16} alt="Bot"/>
    )
}

export default BotAvatar