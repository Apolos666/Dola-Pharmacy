import {useLocation, useMatches, useParams} from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {Fragment, useEffect, useState} from "react";
import "@/app/app.css"
import {ProductTypeApi} from "@/api/Product/ProductType/ProductTypeApi.ts";
import {productTypeResponse} from "@/model/ProductType.ts";
import {useProductType} from "@/hooks/Entity/useProductType.tsx";

export function BreadCrumbCustom() {
    const matches = useMatches();
    const location = useLocation();
    const { productTypeNameNormalized } = useParams();
    const productType = useProductType(productTypeNameNormalized)

    if (location.pathname === "/") // If the current path is the home page then don't show the crumb
        return null;

    let crumbs = matches
        .filter((match) => Boolean(match.handle?.crumb))
        .map((match) => match.handle!.crumb(productType?.TypeName));

    return (
        <>
            <div className="h-14 bg-[#D9E6FF] text-center">
                <Breadcrumb className="container-breadCrumb">
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