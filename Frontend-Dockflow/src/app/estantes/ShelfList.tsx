import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomInput } from "../components/CustomInput";
import { Shelf } from "../interfaces/Shelf";
import { shelfsService } from "../services/shelfsService";
import { BigIconAlert } from "../alerts/alerts.functions";
import { VALIDATIONS } from "../constants/VALIDATIONS";

interface ShelfListProps {
    shelfs: Shelf[];
    selectShelf: (shelf: Shelf) => void;
    reloadShelfs?: () => void;
}

interface FormValues {
    nombreEstante: string;
    ejeX: number;
    ejeY: number;
    ejeZ: number;
    alto: number;
    ancho: number;
}

export const ShelfList = ({ shelfs, selectShelf, reloadShelfs }: ShelfListProps) => {
    const [addShelf, setAddShelf] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        const token = localStorage.getItem("token");
        setLoading(true);

        try {
            const body = {
                nombre: data.nombreEstante,
                ejex: data.ejeX,
                ejey: data.ejeY,
                ejez: data.ejeZ,
                alto: data.alto,
                ancho: data.ancho,
            };

            const response = await shelfsService.createNewShelf(
                "/dockflow/estante",
                { Authorization: `Bearer ${token}` },
                body
            );

            if (response.status === 200) {
                BigIconAlert(
                    "success",
                    "Éxito",
                    `Se ha creado el estante ${data.nombreEstante}`,
                    "center"
                );
                reset();
                setAddShelf(false);
                if (reloadShelfs) reloadShelfs();
            } else {
                BigIconAlert(
                    "error",
                    "Error",
                    `Ha ocurrido un error al crear el estante ${data.nombreEstante}`,
                    "center"
                );
            }
        } catch (err: any) {
            BigIconAlert("error", "Error", `Error al crear: ${err.message}`, "center");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Estantes</h1>

            {addShelf ? (
                <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label
                            htmlFor="nombreEstante"
                            className="block mb-2 text-sm font-bold text-gray-700"
                        >
                            Nombre
                        </label>
                        <CustomInput
                            type="text"
                            placeHolder="Nombre del estante"
                            formField="nombreEstante"
                            register={register}
                            validations={VALIDATIONS.fullNameValidation}
                            errors={errors}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {[
                            { name: "ejeX", label: "Eje X" },
                            { name: "ejeY", label: "Eje Y" },
                            { name: "ejeZ", label: "Eje Z" },
                            { name: "alto", label: "Alto" },
                            { name: "ancho", label: "Ancho" },
                        ].map(({ name, label }) => (
                            <div key={name}>
                                <label
                                    htmlFor={name}
                                    className="block mb-2 text-sm font-bold text-gray-700"
                                >
                                    {label}
                                </label>
                                <CustomInput
                                    type="number"
                                    placeHolder={label}
                                    formField={name}
                                    register={register}
                                    validations={VALIDATIONS.numberValidation}
                                    errors={errors}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-blue-500 text-white px-4 py-2 rounded transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
                                }`}
                        >
                            {loading ? "Creando..." : "Crear estante"}
                        </button>
                        <button
                            type="button"
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:opacity-80 transition"
                            onClick={() => setAddShelf(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:opacity-80 transition mb-4"
                    onClick={() => setAddShelf(true)}
                >
                    Crear estante
                </button>
            )}

            {/* Tabla de estantes */}
            <h2 className="text-xl font-bold mb-4">Listado de Estantes</h2>
            {shelfs.length > 0 ? (
                <table className="table-auto w-full bg-white shadow-md rounded mb-4">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Nombre</th>
                            <th className="py-3 px-6 text-left">Eje X</th>
                            <th className="py-3 px-6 text-left">Eje Y</th>
                            <th className="py-3 px-6 text-left">Eje Z</th>
                            <th className="py-3 px-6 text-left">Alto</th>
                            <th className="py-3 px-6 text-left">Ancho</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {shelfs.map((shelf, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                                onClick={() => selectShelf(shelf)}
                            >
                                <td className="py-3 px-6">{shelf.nombre}</td>
                                <td className="py-3 px-6">{shelf.ejex}</td>
                                <td className="py-3 px-6">{shelf.ejey}</td>
                                <td className="py-3 px-6">{shelf.ejez}</td>
                                <td className="py-3 px-6">{shelf.alto}</td>
                                <td className="py-3 px-6">{shelf.ancho}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500">No hay estantes registrados.</p>
            )}
        </>
    );
};
