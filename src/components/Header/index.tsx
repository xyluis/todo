import styles from './Header.module.css'

import logo from '../../assets/logo.svg'

export function Header (): JSX.Element {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src={logo} alt="Blue and Purple Rocket with Todo text" />
    </div>
  )
}