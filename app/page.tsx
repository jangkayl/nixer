import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Users from "@/components/Users";

export default function Home() {
	return (
		<main className="flex justify-between max-w-6xl mx-auto py-5">
			<Sidebar />
			<Feed />
			<Users />
		</main>
	);
}
