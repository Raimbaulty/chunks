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
                    <Link href="/convert" className={styles.menuItem}>
                        文件转英语块
                    </Link>
                    <Link href="/chunks" className={styles.menuItem}>
                        英语块练习
                    </Link>
                    <Link href="/about" className={styles.menuItem}>
                        关于
                    </Link>
                    <Link href="/settings" className={styles.menuItem}>
                        设置
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 