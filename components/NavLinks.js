import HomeLogo from './Icons/HomeLogo'
import ProductsLogo from './Icons/ProductsLogo'
import OrdersLogo from './Icons/OrdersLogo'
import SettingsLogo from './Icons/SettingsLogo'
import PanelLogo from './Icons/PanelLogo'

export const PanelLink = 
    {
        icon: <PanelLogo/>,
        href: '/',
        label: 'Ecommerce admin'
    }

const NavLinks = [
    {
        icon: <HomeLogo/>,
        href: '/',
        label: 'Dashboard'
    },
    {
        icon: <ProductsLogo/>,
        href: '/products',
        label: 'Products'
    },
    {
        icon: <OrdersLogo/>,
        href: '/orders',
        label: 'Orders'
    },
    {
        icon: <SettingsLogo/>,
        href: '/settings',
        label: 'Settings'
    }
]

export default NavLinks