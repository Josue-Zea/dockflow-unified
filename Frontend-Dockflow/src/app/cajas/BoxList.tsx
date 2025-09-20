import React, { useState } from "react";
import { Box } from "../interfaces/Box";
import { CustomInput } from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { BoxTable } from "./BoxTable";
import { BigIconAlert } from "../alerts/alerts.functions";
import { boxService } from "../services/boxService";
import { VALIDATIONS } from "../constants/VALIDATIONS";

export const BoxList = ({
    boxs,
    selectBox,
    handleRemoveDocumentFromBox,
    reloadBoxes
}: BoxListProps) => {
    const [addBox, setAddBox] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    const handleCreateBox = handleSubmit(async (data) => {
        const token = localStorage.getItem("token");
        try {
            const body = { nombre: data.nombreCaja };
            const response = await boxService.createBox(
                "/dockflow/caja",
                { Authorization: `Bearer ${token}` },
                body
            );

            if (response.status === 200) {
                BigIconAlert(
                    "success",
                    "Éxito",
                    `Se ha creado la caja ${data.nombreCaja}`,
                    "center"
                );
                reset();
                setAddBox(false);
                reloadBoxes && reloadBoxes();
            } else {
                BigIconAlert(
                    "error",
                    "Error",
                    `Ha ocurrido un error al crear la caja ${data.nombreCaja}`,
                    "center"
                );
            }
        } catch (err: any) {
            BigIconAlert("error", "Error", `No se pudo crear la caja: ${err.message}`, "center");
        }
    });

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Cajas</h1>

            {addBox ? (
                <form className="mb-6" onSubmit={handleCreateBox}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                            Nombre
                        </label>
                        <CustomInput
                            type="text"
                            placeHolder="Nombre de la caja"
                            formField="nombreCaja"
                            register={register}
                            validations={VALIDATIONS.fullNameValidation}
                            errors={errors}
                        />
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:opacity-80 transition"
                        >
                            Crear caja
                        </button>
                        <button
                            type="button"
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:opacity-80 transition"
                            onClick={() => {
                                reset();
                                setAddBox(false);
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:opacity-80 transition mb-4"
                    onClick={() => setAddBox(true)}
                >
                    Nueva caja
                </button>
            )}

            {boxs.length > 0 ? (
                <BoxTable
                    boxs={boxs}
                    clickBox={selectBox}
                    handleRemoveDocumentFromBox={handleRemoveDocumentFromBox}
                />
            ) : (
                <p className="text-gray-500 italic">No se han creado cajas aún.</p>
            )}
        </>
    );
};

interface BoxListProps {
    boxs: Box[];
    selectBox: (box: Box) => void;
    handleRemoveDocumentFromBox: () => void;
    reloadBoxes?: () => void;
}
