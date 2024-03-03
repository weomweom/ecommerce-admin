import Home from './Icons/Home'
import Products from './Icons/Products'
import Orders from './Icons/Orders'
import Settings from './Icons/Settings'
import Panel from './Icons/PanelLogo'
import Categories from './Icons/Categories'

export const PanelLink = 
    {
        icon: <Panel/>,
        href: '/',
        label: 'Ecommerce admin'
    }

const NavLinks = [
    {
        icon: <Home/>,
        href: '/',
        label: 'Dashboard'
    },
    {
        icon: <Products/>,
        href: '/products',
        label: 'Products'
    },
    {
        icon: <Categories/>,
        href: '/categories',
        label: 'Categories'
    },
    {
        icon: <Orders/>,
        href: '/orders',
        label: 'Orders'
    },
    {
        icon: <Settings/>,
        href: '/settings',
        label: 'Settings'
    },
]

export default NavLinks