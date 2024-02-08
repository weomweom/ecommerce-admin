import Link from "next/link";
import { useRouter } from "next/router";
import NavLinks, { PanelLink } from "./NavLinks";

function Nav() {
    const inactiveLink = 'flex gap-1 p-1';
    const activeLink = inactiveLink + ' bg-white text-blue-900'
    const router = useRouter();
    const {pathname} = router;

    return (
        <aside className="text-white p-4">
            <Link href={PanelLink.href} className="flex gap-1 mb-4">
                {PanelLink.icon}
                <span>{PanelLink.label}</span>
            </Link>
            <nav className="flex flex-col gap-2">
                {NavLinks.map((icon, i) => (
                    <Link href={icon.href} className={icon.href !== '/' ? (pathname.includes(icon.href) ? activeLink : inactiveLink) : pathname === icon.href ? activeLink : inactiveLink} key={i}>
                        {icon.icon}
                        {icon.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

export default Nav;