import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav"

export default function Layout({children}) {
	const { data: session } = useSession()
	if(session) {
		return <>
			<div className="bg-blue-900 w-screen h-screen flex">
				<Nav/>
				<div className="flex-grow bg-white p-4">
					{children}
				</div>
			</div>
		</>
	}
	return(
		<div className="bg-blue-900 w-screen h-screen flex items-center">
			<div className="text-center w-full">
				<button className="bg-white p-2 px-4 rounded-lg" onClick={() => signIn('google')}>Login with Google</button>
			</div>
		</div>
	)
}