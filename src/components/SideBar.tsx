'use client'

import { useSession, signOut } from "next-auth/react"
import NewChat from "./NewChat"
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "../../firebase";
import { collection, orderBy, query } from "firebase/firestore";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

function SideBar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session && 
    query(
      collection(db, "users", session?.user?.email!, 'chats'),     
      orderBy('createdAt', "asc")
    )
  );

  return (
    <div className='p-2 flex flex-col h-screen'>
        <div className = 'flex-1'>
            <div>
                {/* new chat */ }
                <NewChat />
                <div className='hidden sm:inline'>
                    <ModelSelection />
                </div>

                <div className="flex flex-col space-y-2 my-2">
                  { loading && (
                    <div className='animate-pulse text-center text-white'>
                        <p>
                          Loading chats...
                        </p>
                    </div>
                  )}
                </div>
            <div>
            


            </div>
            
            {/* Map through chat rows  */}
            {chats?.docs.map(chat => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
            </div>
        </div>
        {session && <img src={session.user?.image!} alt="" 
          onClick = {() => signOut()}
          className='h-12 w-12 rounded-full cursor-pointer ml-2 mx-auto mb-2 hover:opacity-50'
        />}
    </div>
  )
}

export default SideBar