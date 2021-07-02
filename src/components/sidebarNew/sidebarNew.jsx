import React from 'react'
import { NavLink } from 'react-router-dom'

import CoinsIcon from '../../assets/coins-red.png'
import PickIcon from '../../assets/pick-grey.png'
import Logo from '../../assets/white-logo.png'
import {
  sidebar,
  sidebarLogo,
  sidebarNavList,
  sidebarNavItem,
  sidebarNavLink,
  sidebarNavLinkIcon,
  sidebarNavLinkActive,
} from './sidebarNew.module.scss'

const linksList = [
  { path: '/staking', exact: true, text: 'Staking', icon: CoinsIcon },
  { path: '/farming', exact: true, text: 'Farming', icon: PickIcon },
]

function NavLinks({ linksList }) {
  return linksList.map(({ path, exact, text, icon }, idx) => (
    <li key={idx} className={sidebarNavItem}>
      <NavLink
        activeClassName={sidebarNavLinkActive}
        className={sidebarNavLink}
        exact={exact}
        to={path}
      >
        <img className={sidebarNavLinkIcon} src={icon} alt="#" />
        {text}
      </NavLink>
    </li>
  ))
}

export function SidebarNew() {
  return (
    <div className={sidebar}>
      <div className={sidebarLogo}>
        <img src={Logo} alt="DAO1" />
      </div>

      <ul className={sidebarNavList}>
        <NavLinks linksList={linksList} />
      </ul>
    </div>
  )
}
