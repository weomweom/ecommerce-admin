import Layout from "@/components/layout"
import { useSession } from "next-auth/react";

export default function Home() {
	const {data: session} = useSession();
	return(
		<Layout>
			<div className="text-black flex justify-between">
				<h2>
					Hello, <b>{session?.user?.name}</b>
				</h2>
				<div>
					<img src={session?.user?.image} alt={session?.user?.name} className="w-6 h-6 rounded-full"/>
				</div>
			</div>
		</Layout>
	)
}