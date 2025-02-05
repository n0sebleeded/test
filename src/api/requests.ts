import axiosInstance from "./axiosInstance.ts";
import config from "../config.ts";
import { SortOrder } from "@types";

export interface PostItemProps {
    name: string;
    measurement_units: string;
    description?: string;
    code?: string;
}

export interface GetItemProps {
    selectedPage: number;
    selectedPageSize: number;
    sortOrder?: SortOrder;
    itemName?: string;
}

export const getAccessToken = () => {
    const login = config.login;
    const password = config.password;

    return axiosInstance
        .post("/auth/login", {
            login: login,
            password: password,
        })
        .then((res) => {
            console.log(res.data.access_token);
            sessionStorage.setItem("access_token", res.data.access_token);
            return res;
        });
};

export const getItems = ({
    selectedPage,
    selectedPageSize,
    sortOrder,
    itemName,
}: GetItemProps) => {
    let page = 1500 / selectedPageSize + selectedPage;
    if (sortOrder === SortOrder.DESC || itemName) {
        page = selectedPage;
    }

    const queryParams = [
        `page=${page}`,
        `pageSize=${selectedPageSize}`,
        sortOrder ? `sortOrder=${sortOrder}` : "",
        itemName ? `itemName=${itemName}` : "",
    ]
        .filter(Boolean)
        .join("&");

    return axiosInstance.get(`/wh/items?${queryParams}`);
};

export const postItem = ({
    name,
    measurement_units,
    description,
    code,
}: PostItemProps) => {
    return axiosInstance.post(`/wh/items`, {
        name: name,
        measurement_units: measurement_units,
        description: description,
        code: code,
    });
};

export const updateItem = ({
    name,
    measurement_units,
    description,
    code,
    id,
}: PostItemProps & { id: string }) => {
    return axiosInstance.patch(`/wh/items/${id}`, {
        name: name,
        measurement_units: measurement_units,
        description: description,
        code: code,
    });
};
