import { Button } from "@/components/ui/button";
import { Github, Trash } from "lucide-react";
import Link from "next/link";

const Home = () =>  {
  return (
    <div className="z-10 h-screen flex-col gap-5 p-5">
      <header className="flex items-center justify-between border-b px-6 py-3">
        <h1 className="text-xl font-bold">NjugunaBot</h1>
        <div className="flex items-center gap-3">
          <Link href="https://github.com/NjugunaBrian" passHref={true}>
          <Button variant="outline">
            <Github className="size-4 mr-2" />
            Github
          </Button>
          </Link>
        </div>
      </header>
      {/*<div>
        <Trash className="size-4" />
        Clear Chat
      </div>
      */}
    </div>
    
  );
}

export default Home
