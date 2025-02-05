import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Header from "@components/Header/Header.tsx";
import Table from "@components/Table/Table.tsx";
import Pagination from "@components/Pagination/Pagination.tsx";
import Modal from "@components/Modal/Modal.tsx";

import { getItems } from "@api/requests.ts";
import { Item, SortOrder } from "@types";

function App() {
    const [itemList, setItemList] = useState<Item[]>();
    const [selectedPageSize, setSelectedPageSize] = useState<number>(5);
    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [limit, setLimit] = useState<number>(1150);
    const [itemName, setItemName] = useState("");

    useEffect(() => {
        getItems({ selectedPage, selectedPageSize, sortOrder, itemName }).then(
            (res) => {
                setItemList(res.data.result);
            }
        );
    }, [selectedPageSize, selectedPage, sortOrder, showModal]);

    const handleEditItem = (item: Item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleAddItem = () => {
        setSelectedItem(null);
        setShowModal(true);
    };

    return (
        <React.Fragment>
            <Header
                selectedPage={selectedPage}
                selectedPageSize={selectedPageSize}
                itemName={itemName}
                totalSize={limit}
                setLimit={setLimit}
                handleAddItem={handleAddItem}
                setItemList={setItemList}
                setItemName={setItemName}
                setSelectedPage={setSelectedPage}
            />
            <Table
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                onEditItem={handleEditItem}
                itemList={itemList}
            />
            <Pagination
                setSelectedPageSize={setSelectedPageSize}
                setSelectedPage={setSelectedPage}
                selectedPage={selectedPage}
                totalPages={limit / selectedPageSize}
            />
            <AnimatePresence mode="wait">
                {showModal && (
                    <Modal
                        selectedItem={selectedItem}
                        setShowModal={setShowModal}
                    />
                )}
            </AnimatePresence>
        </React.Fragment>
    );
}

export default App;
