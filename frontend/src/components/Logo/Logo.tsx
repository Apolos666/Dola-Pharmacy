import {Link} from "react-router-dom";

export function Logo({widthPercent}: {widthPercent: string}) {
    return (
        <>
            <div className={`${widthPercent}`}>
                <Link to="/">
                    <img className="w-full h-full" src="/logo.webp" alt=""/>
                </Link>
            </div>
        </>
    )
}