import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <h1 className="main-heading">
      <Link className="header-link-home" to="/">
        {title}
      </Link>
      </h1>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header" align="center">{header}</header>
      <hr className="header-line"/>
      <main>{children}</main>
      <footer align="center">
        Built on the foundation of God's ❤️
        <p>{new Date().getFullYear()} </p>
      </footer>
    </div>
  )
}

export default Layout
