"use client"
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { FaRegUserCircle } from "react-icons/fa";

const UserIconLink = () => {
  const { isSignedIn } = useUser();
  return (
    <div className="p-1">
     { isSignedIn? ( <UserButton />) :

     ( 
      <SignInButton>
     <FaRegUserCircle className="w-6 h-6"/>
     </SignInButton>
    )
       
     }
    </div>
  );
}

export default UserIconLink;
//kya karna hai  is mein yar woh karna ha userbutton wala bas ky puri condition lagai hai nhi na wohi tou samjh nhi arahi
