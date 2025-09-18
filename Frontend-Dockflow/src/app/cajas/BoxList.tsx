import React, { useState } from 'react'
import { Box } from '../interfaces/Box';
import { CustomInput } from '../components/CustomInput';
import { useForm } from 'react-hook-form';
import { BoxTable } from './BoxTable';
import { BigIconAlert } from '../alerts/alerts.functions';
import { boxService } from '../services/boxService';
import { VALIDATIONS } from '../constants/VALIDATIONS';

export const BoxList = ({ boxs, selectBox, handleRemoveDocumentFromBox }: BoxListProps) => {
    const [addBox, setAddBox] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm()

    const handleCreateBox = () => {
        handleSubmit(async (data) => {
            const token = localStorage.getItem("token");
            try {
                const body = {
                    nombre: data.nombreCaja
                };
                const response = await boxService.createBox('/dockflow/caja', { 'Authorization': `Bearer ${token}`}, body);
                if (response.status === 200) {
                    BigIconAlert(
                        'success',
                        'Exito',
                        `Se ha creado el estante ${data.nombreCaja}`,
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
            <h1 className="text-2xl font-bold mb-4">Cajas</h1>

            {
                addBox ? (
                    <form className="mb-6" onSubmit={() => console.log("")}>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700">Nombre</label>
                            <CustomInput
                                type="text"
                                placeHolder="Nombre de la caja"
                                formField="nombreCaja"
                                register={register}
                                validations={VALIDATIONS.fullNameValidation}
                                errors={errors}
                            />
                        </div>
                        <button
                            type="submit"
                            className={`bg-blue-500 text-white px-4 py-2 rounded hover:opacity-80 transition`}
                            onClick={handleCreateBox}
                        >
                            Crear caja
                        </button>
                    </form>
                ) : (
                    <button
                        type="submit"
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:opacity-80 transition mb-4`}
                        onClick={() => setAddBox(!addBox)}
                    >
                        Nueva caja
                    </button>
                )
            }

            {
                boxs.length > 0 ? (
                    <BoxTable boxs={boxs} clickBox={selectBox} handleRemoveDocumentFromBox={handleRemoveDocumentFromBox}/>
                ) : (
                    <h2 className="text-xl font-bold mb-4">No se han creado cajas</h2>
                )
            }
        </>
    )
}

interface BoxListProps {
    boxs: Box[]
    selectBox: (box: any) => void
    handleRemoveDocumentFromBox: () => void
}