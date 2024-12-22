import Link from 'next/link';
import Logo from './Logo';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logoLink}>
                    <Logo />
                </Link>
                <div className={styles.menu}>
                    <Link href="/chunks" className={styles.menuItem}>
                        英语块学习
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 