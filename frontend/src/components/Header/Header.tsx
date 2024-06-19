import {BannerTop} from "@/components/BannerTop/BannerTop.tsx";
import {TopBar} from "@/components/TopBar/TopBar.tsx";
import styles from './Header.module.css';
import {StoreNavigation} from "@/components/StoreNavigation/StoreNavigation.tsx";

function Header() {

    return (
        <>
            <BannerTop />
            <div className={`${styles.gradientBg} h-48 text-center`}>
                <TopBar />
                <StoreNavigation />
            </div>
        </>
    )
}

export default Header