import axios from "axios";

async function getAllAdministrativeDivisionVietNam() {
    try {
        return await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
    } catch (e) {
        throw new Error(e)
    }
}

export const AdministrativeDivisionApi = {
    getAllAdministrativeDivisionVietNam
}