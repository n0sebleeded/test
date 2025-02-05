import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import "./modal.css";

import home from "@assets/home.svg";
import cross from "@assets/cross.svg";
import { postItem, PostItemProps, updateItem } from "@api/requests.ts";
import { Item } from "@types";

interface ModalProps {
    setShowModal: (state: boolean) => void;
    selectedItem: Item | null;
}

const Modal: React.FC<ModalProps> = ({ setShowModal, selectedItem }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PostItemProps>({
        defaultValues: {
            name: selectedItem?.name || "",
            description: selectedItem?.description || "",
            code: selectedItem?.code || "",
            measurement_units: selectedItem?.measurement_units || "",
        },
    });

    const onSubmit: SubmitHandler<PostItemProps> = async (data) => {
        try {
            if (selectedItem) {
                await updateItem({ ...data, id: selectedItem.id });
            } else {
                await postItem({ ...data });
            }
            console.log("Данные успешно отправлены:", data);
            setShowModal(false);
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    };

    return (
        <motion.div
            className="modal__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3 } }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowModal(false)}
        >
            <motion.div
                className="modal__layout"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%", transition: { duration: 0.3 } }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
            >
                <form className="modal" onSubmit={handleSubmit(onSubmit)}>
                    <div className="modal--wrapper">
                        <div className="modal--img-block__wrapper">
                            <div className="modal--img-block">
                                <img src={home} alt="home" />
                            </div>
                            <img
                                style={{ cursor: "pointer" }}
                                src={cross}
                                alt="cross"
                                onClick={() => setShowModal(false)}
                            />
                        </div>
                        <div>
                            <p className="modal__text--main">
                                {selectedItem
                                    ? "Редактирование"
                                    : "Новая позиция"}
                            </p>
                            <p className="modal__text--main-secondary">
                                {selectedItem
                                    ? "Измените необходимые поля"
                                    : "Заполните поля для создания новой номенклатуры"}
                            </p>
                        </div>
                        <div className="modal__input-group">
                            <p className="modal__input--heading">Название</p>
                            <input
                                type="text"
                                className="modal__input"
                                {...register("name", {
                                    required: "Это поле обязательно",
                                })}
                            />
                            {errors.name && (
                                <p className="modal__error">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="modal__input-group">
                            <p className="modal__input--heading">
                                Единицы измерения
                            </p>
                            <input
                                type="text"
                                className="modal__input"
                                {...register("measurement_units", {
                                    required: "Это поле обязательно",
                                })}
                            />
                            {errors.measurement_units && (
                                <p className="modal__error">
                                    {errors.measurement_units.message}
                                </p>
                            )}
                        </div>
                        <div className="modal__input-group">
                            <p className="modal__input--heading">Артикул/код</p>
                            <input
                                type="text"
                                className="modal__input"
                                {...register("code")}
                            />
                            {errors.code && (
                                <p className="modal__error">
                                    {errors.code.message}
                                </p>
                            )}
                        </div>
                        <div className="modal__input-group">
                            <p className="modal__input--heading">Описание</p>
                            <textarea
                                className="modal__input-textarea"
                                {...register("description")}
                            />
                        </div>
                    </div>
                    <div className="modal__button-container">
                        <button
                            type="button"
                            className="modal__button-alt"
                            onClick={() => setShowModal(false)}
                        >
                            <p className="modal__button--text">Отмена</p>
                        </button>
                        <button type="submit" className="modal__button-main">
                            <p className="modal__button--text">Подтверждение</p>
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default Modal;
