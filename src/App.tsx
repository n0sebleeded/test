import Header from "./components/Header/Header.tsx";
import { useEffect, useRef, useState } from "react";
import Table from "./components/Table/Table.tsx";
import Pagination from "./components/Pagination/Pagination.tsx";
import axios from "axios";
import Modal from "./components/Modal/Modal.tsx";

export type item = {
    id: string;
    name: string;
    description?: string;
    measurement_unit?: string;
    code?: string;
};

function App() {
    const authToken = useRef<null | string>(null);

    const [itemList, setItemList] = useState<item[]>();
    const [selectedPageSize, setSelectedPageSize] = useState<number>(5);
    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [showModal, setShowModal] = useState(false);

    const url = import.meta.env.VITE_BASE_URL;
    const login = import.meta.env.VITE_AUTH_LOGIN;
    const password = import.meta.env.VITE_AUTH_PASS;

    useEffect(() => {
        axios
            .post(`${url}/auth/login`, { login: login, password: password })
            .then((res) => {
                authToken.current = res.data.access_token;
                axios
                    .get(
                        `${url}/wh/items?page=${1500 / selectedPageSize + selectedPage}&pageSize=${selectedPageSize}`,
                        {
                            headers: {
                                Authorization: authToken.current,
                            },
                        }
                    )
                    .then((res) => {
                        console.log(res.data.result);
                        setItemList(res.data.result);
                    });
            });
    }, [selectedPageSize, selectedPage]);

    return (
        <>
            {showModal && <Modal setShowModal={setShowModal} />}
            <Header setShowModal={setShowModal} />
            <Table itemList={itemList} />
            <Pagination
                setSelectedPageSize={setSelectedPageSize}
                setSelectedPage={setSelectedPage}
                selectedPage={selectedPage}
                totalPages={1140 / selectedPageSize}
            />
        </>
    );
}

export default App;
