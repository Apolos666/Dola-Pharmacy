import {BannerTop} from "@/components/BannerTop/BannerTop.tsx";
import {TopBar} from "@/components/TopBar/TopBar.tsx";
import styles from './Header.module.css';
import {StoreNavigation} from "@/components/StoreNavigation/StoreNavigation.tsx";

function Header() {

    return (
        <>
            <BannerTop />
            <div className={`${styles.gradientBg} xl:gap-4 text-center flex flex-col gap-16`}>
                <TopBar />
                <StoreNavigation />
            </div>
        </>
    )
}

export default Header