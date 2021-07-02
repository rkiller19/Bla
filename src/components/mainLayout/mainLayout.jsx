import React from 'react'

import { layout, mainSection, mainContent } from './mainLayout.module.scss'
import { SidebarNew, Header } from '../'

export function MainLayout({ children }) {
  return (
    <div className={layout}>
      <SidebarNew />
      <section className={mainSection}>
        <Header />
        <main className={mainContent}>{children}</main>
      </section>
    </div>
  )
}
