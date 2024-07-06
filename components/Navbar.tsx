"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import profile from "@/public/profile.png";
import logo from "@/public/lightLogo.png";
import darkLogo from "@/public/dark-x.png";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import { useDarkMode } from "@/app/hooks/useDarkMode";
import { IoPersonOutline } from "react-icons/io5";

const Navbar = () => {
	const { data: session } = useSession();
	const theme = useDarkMode();

	return (
		<div className="w-full justify-center flex dark:bg-[#050c1e] sticky top-0">
			<div className="flex items-center max-w-3xl p-2 justify-between w-full">
				<div>
					{theme ? (
						<Image
							src={darkLogo}
							width={50}
							height={50}
							alt="logo"
							priority
						/>
					) : (
						<Image
							src={logo}
							width={50}
							height={50}
							alt="logo"
							priority
						/>
					)}
				</div>
				<div className="flex items-center gap-2">
					<ModeToggle />
					{session ? (
						<DropdownMenu>
							<DropdownMenuTrigger className="outline-none">
								<Image
									src={session?.user?.image || ""}
									alt="userImg"
									width={40}
									height={40}
									priority
									className="rounded-full"
								/>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem onClick={() => signOut()}>
									Sign out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<IoPersonOutline
							size={20}
							className="cursor-pointer"
							onClick={() => signIn()}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
