"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addUser } from "@/app/CRUD/database";
import { UserData } from "@/app/CRUD/interface";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");

	const isValidUsername = (username: string): boolean => {
		const regex = /^[a-zA-Z0-9]+$/;
		return regex.test(username);
	};

	const isValid = (name: string): boolean => {
		return name.trim() === "";
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (isValid(name)) {
			setError("Please enter a nickname");
			return;
		}
		if (isValidUsername(username)) {
			console.log("Name:", name);
			console.log("Username:", username);
			setError("");
		} else {
			setError("Invalid username");
			return;
		}

		const userData: UserData = {
			uid: session?.user?.uid || "",
			name,
			username,
			createdAt: new Date(),
		};

		try {
			const success = await addUser(userData);
			if (success) {
				console.log("User data submitted:", userData);
				toast.success("Account created");
				setName("");
				setUsername("");
				setError("");
				router.push("/");
			} else {
				toast.error("Username already exists");
				setError("Username already exists");
			}
		} catch (error) {
			console.error("Error adding user data:", error);
			setError("Error adding user data");
		}
	};

	return (
		<div className="flex w-full h-[30rem] justify-center items-center">
			<Toaster
				position="top-right"
				richColors
			/>
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Create profile</CardTitle>
					<CardDescription>What is your preferred nickname.</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">Nickname</Label>
							<Input
								id="name"
								placeholder="Ex. KyleGwapo"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">Username</Label>
							<div className="flex">
								<Input
									id="name"
									placeholder="@"
									disabled
									className="w-10 disabled:cursor-default"
								/>
								<Input
									id="name"
									placeholder="Ex. @kylegwapo"
									className="z-[1]"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							{error && (
								<p className="text-[.8rem] font-light text-red-500">{error}</p>
							)}
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col justify-end">
					<Button
						className="w-full"
						onClick={handleSubmit}>
						Submit
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Page;
