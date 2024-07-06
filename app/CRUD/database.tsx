// firebaseHelpers.js
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import { UserData } from "./interface";

export async function addUser(userData: UserData): Promise<boolean> {
	try {
		const q = query(
			collection(db, "users"),
			where("username", "==", userData.username)
		);

		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			const docRef = await addDoc(collection(db, "users"), userData);
			console.log("Document written with ID: ", docRef.id);
		} else {
			console.log("Username already exists");
			return false;
		}
	} catch (e) {
		console.error("Error adding document: ", e);
		return false;
	}
	return true;
}
