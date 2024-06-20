import {Link} from "react-router-dom";

export function Logo({widthPercent, className}: {widthPercent?: string, className?: string}) {
    return (
        <>
            <div className={`${widthPercent} ${className}`}>
                <Link to="/">
                    <img className="w-full h-full" src="/logo.webp" alt=""/>
                </Link>
            </div>
        </>
    )
}