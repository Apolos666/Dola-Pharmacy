import {useEffect, useRef, useState} from "react";
import {AdministrativeDivisionApi} from "@/api/AdministrativeDivisions/AdministrativeDivisionApi.ts";
import {
    ProvinceType,
    ResponseAdministrativeDivisionType
} from "@/hooks/AdministrativeDivision/AdministrativeDivisionHookConfig.ts";

export function useAdministrativeDivision(): ResponseAdministrativeDivisionType {
    const [provinces, setProvinces] = useState<ProvinceType[]>([]);
    const provinceRef = useRef<ProvinceType[]>([]);

    async function fetchAdministrativeDivisionData() {
        const response = await AdministrativeDivisionApi.getAllAdministrativeDivisionVietNam();
        const data = response.data;
        handleSetAdministrativeDivision(data);
    }

    function handleSetAdministrativeDivision(data) {
        const newProvinces = data.map((provinceResponse) => ({
            Name: provinceResponse.Name,
            District: provinceResponse.Districts.map((districtResponse) => ({
                Name: districtResponse.Name,
                Ward: districtResponse.Wards.map((wardResponse) => ({
                    Name: wardResponse.Name
                }))
            }))
        }));
        provinceRef.current = newProvinces;
        setProvinces(newProvinces);
    }

    useEffect(() => {
        fetchAdministrativeDivisionData();
    }, []);

    return { data: provinces };
}