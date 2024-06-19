import {useLocation, useMatches} from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {Fragment} from "react";
import "@/app/app.css"

export function BreadCrumbCustom() {
    const matches = useMatches();
    const location = useLocation();

    if (location.pathname === "/") // If the current path is the home page then don't show the crumb
        return null;

    // todo: nếu ở trang home thì sẽ không lấy cái crumb của nó để hiện thị
    let crumbs = matches
        .filter((match) => Boolean(match.handle?.crumb))
        .map((match) => match.handle!.crumb());

    return (
        <>
            <div className="h-14 bg-[#D9E6FF] text-center">
                <Breadcrumb className="container-app">
                    <BreadcrumbList>
                        {crumbs.map((crumb, index) => (
                            <Fragment key={index}>
                                <BreadcrumbItem>
                                    {index < crumbs.length - 1 ? ( // If not the last crumb then add a link
                                        <BreadcrumbLink className="text-base" href={matches[index].pathname}>
                                            {crumb}
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbPage className="text-base text-[#003cbf]">
                                            {crumb}
                                        </BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>
                                {index < crumbs.length - 1 && <BreadcrumbSeparator/>} {/* Add separator if not the last crumb */}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </>
    )
}