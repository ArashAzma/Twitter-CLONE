import * as React from 'react';
import { RiSettings3Line, RiLoginCircleLine } from "react-icons/ri";
import { signOut } from "next-auth/react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from "next/image"
import Link from "next/link"

export default function AccountMenu({image, name, email}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="absolute justify-between items-between py-4 px-[15px] flex-col grid grid-rows-2 w-[200px] h-[125px] bg-[#1b2730] top-[55px] right-10 rounded-lg gap-y-4">
      <div className="relative flex justify-between items-center gap-x-2 ">
      <Image src={image} width={35} height={35} alt="404" className="rounded-lg"/>
        <div className="flex flex-col">
          <div className="text-[14px]">
            {name}
          </div>
          <div className="text-[11px] opacity-60">
            {email}
          </div>
        </div>
        <div className="absolute top-[3px] right-0">
         <Link href="/profile" className="text-lg font-light opacity-70 hover:text-[#1da1f2] hover:opacity-100 transition-all duration-300"><RiSettings3Line/></Link>
        </div>
      </div>
      
      <div className="">
        <button
              type="button"
              className="flex items-center gap-x-2 bg-[#1da1f2] px-8 py-1 rounded-full hover:bg-blue-600 duration-200"
              onClick={signOut}
            >
              logout
        </button>
      </div>
      
    </div >
  );
}