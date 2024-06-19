import {BannerTop} from "@/components/BannerTop/BannerTop.tsx";
import {TopBar} from "@/components/TopBar/TopBar.tsx";
import styles from './Header.module.css';

function Header() {

    return (
        <>
            <BannerTop />
            <div className={`${styles.gradientBg} h-48 text-center`}>
                <TopBar />
            </div>
        </>
    )
}

export default Header