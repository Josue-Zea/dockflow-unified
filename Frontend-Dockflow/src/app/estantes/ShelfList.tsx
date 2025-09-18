import React, { useState } from 'react'
import { CustomInput } from '../components/CustomInput';
import { useForm } from 'react-hook-form';
import { Shelf } from '../interfaces/Shelf';
import { shelfsService } from '../services/shelfsService';
import { BigIconAlert } from '../alerts/alerts.functions';
import { VALIDATIONS } from '../constants/VALIDATIONS';

export const ShelfList = ({ shelfs, selectShelf }: ShelfList) => {
    const [addShelf, setAddShelf] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm()

    const handleCreateShelf = () => {
        handleSubmit(async (data) => {
            const token = localStorage.getItem("token");
            try {
                const body = {
                    nombre: data.nombreEstante,
                    ejex: data.ejeX,
                    ejey: data.ejeY,
                    ejez: data.ejeZ,
                    alto: data.alto,
                    ancho: data.ancho
                };
                const response = await shelfsService.createNewShelf('/dockflow/estante', { 'Authorization': `Bearer ${token}`}, body);
                if (response.status === 200) {
                    BigIconAlert(
                        'success',
                        'Exito',
                        `Se ha creado el estante ${data.nombreEstante}`,
                        'center'
                    );
                } else {
                    BigIconAlert(
                        'error',
                        'Error',
                        `Ha ocurrido un error al crear el estante ${data.nombreEstante}`,
                        'center'
                    );
                }
            } catch (err: any) {
                alert(`Error al crear el estante: ${err.message}`);
            }
        })();
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Estantes</h1>

            {/* Formulario para agregar o editar un estante */}
            {
                addShelf ? (
                    <form className="mb-6" onSubmit={() => console.log("")}>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700">Nombre</label>
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
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-700">Eje X</label>
                                <CustomInput
                                    type="number"
                                    placeHolder="Eje X"
                                    formField="ejeX"
                                    register={register}
                                    validations={VALIDATIONS.numberValidation}
                                    errors={errors}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-700">Eje Y</label>
                                <CustomInput
                                    type="number"
                                    placeHolder="Eje Y"
                                    formField="ejeY"
                                    register={register}
                                    validations={VALIDATIONS.numberValidation}
                                    errors={errors}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-700">Eje Z</label>
                                <CustomInput
                                    type="number"
                                    placeHolder="Eje Z"
                                    formField="ejeZ"
                                    register={register}
                                    validations={VALIDATIONS.numberValidation}
                                    errors={errors}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-700">Alto</label>
                                <CustomInput
                                    type="number"
                                    placeHolder="Alto"
                                    formField="alto"
                                    register={register}
                                    validations={VALIDATIONS.numberValidation}
                                    errors={errors}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-700">Ancho</label>
                                <CustomInput
                                    type="number"
                                    placeHolder="Ancho"
                                    formField="ancho"
                                    register={register}
                                    validations={VALIDATIONS.numberValidation}
                                    errors={errors}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`bg-blue-500 text-white px-4 py-2 rounded hover:opacity-80 transition`}
                            onClick={handleCreateShelf}
                        >
                            Crear estante
                        </button>
                    </form>
                ) : (
                    <button
                        type="submit"
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:opacity-80 transition mb-4`}
                        onClick={() => setAddShelf(!addShelf)}
                    >
                        Crear estante
                    </button>
                )
            }

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
                                className="border-b border-gray-200 hover:bg-gray-100 "
                                onClick={() => selectShelf(shelf)}
                            >
                                <td className="py-3 px-6 text-left whitespace-nowrap">{shelf.nombre}</td>
                                <td className="py-3 px-6 text-left">{shelf.ejex}</td>
                                <td className="py-3 px-6 text-left">{shelf.ejey}</td>
                                <td className="py-3 px-6 text-left">{shelf.ejez}</td>
                                <td className="py-3 px-6 text-left">{shelf.alto}</td>
                                <td className="py-3 px-6 text-left">{shelf.ancho}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500">No hay estantes registrados.</p>
            )}
        </>
    )
}

export interface ShelfList {
    shelfs: Shelf[]
    selectShelf: (shelf: Shelf) => void
}
