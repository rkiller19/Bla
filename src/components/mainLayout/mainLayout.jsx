import React from 'react'

import { layout, mainSection, mainContent } from './mainLayout.module.scss'
import { SidebarNew, Header } from '../'

export function MainLayout({ title, children }) {
  return (
    <div className={layout}>
      <SidebarNew />
      <section className={mainSection}>
        <Header title={title} />
        <main className={mainContent}>{children}</main>
      </section>
    </div>
  )
}
