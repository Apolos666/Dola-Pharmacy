export type ProvinceType = {
    Name: string;
    District: DistrictType[];
}

type DistrictType = {
    Name: string;
    Ward: WardType[];
}

type WardType = {
    Name: string;
}

export type ResponseAdministrativeDivisionType = {
    data: ProvinceType[];
}