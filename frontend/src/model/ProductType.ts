export type productTypeResponse = {
    TypeName: string;
    TypeNameNormalized: string;
    ImagePath: string;
    parentId: string;
    typeId: string;
}

export type productTypesWithChildrenResponse = {
    TypeName: string;
    TypeNameNormalized: string;
    ImagePath: string;
    typeId: string;
    children: productTypeResponse[];
}