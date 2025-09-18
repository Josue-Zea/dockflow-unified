
import { Controller } from "react-hook-form";
import { InputInterface } from "../interfaces/InputInterface";
// import PhoneInputWithFlag from "./PhoneInputWithFlag";
// import CustomDatePicker from "./CustomDatePicker";
// import { CountryEnum } from "@/interfaces/FormPropsInterface";
export const CustomInput = ({ placeHolder, type, formField, register, validations, errors, disabled, maxLength = 0, minLength = 0 }: InputInterface) => {
    const classNameDefault = `
        w-full p-2 border border-gray-300 rounded border-2
        ${errors[formField] ? 'border-red-500' : ''}`

    const containerClassName = "w-full flex justify-center items-center"

    const renderInput = () => {
        switch (type) {
            case 'text':
                return (
                    <div className={containerClassName}>
                        <input
                            autoComplete="off"
                            type={type}
                            maxLength={maxLength !== 0 ? maxLength : undefined}
                            minLength={minLength !== 0 ? minLength : undefined}
                            placeholder={placeHolder}
                            className={classNameDefault}
                            {...register(formField, validations)}
                            disabled={disabled}
                        />
                    </div>
                )
            // case 'tel':
            //     return (
            //         <div className={containerClassName}>
            //             <Controller
            //                 name={formField}
            //                 control={control}
            //                 rules={validations}
            //                 render={({ field: { onChange, onBlur, value, ref } }) => (
            //                     <PhoneInputWithFlag
            //                         errors={errors}
            //                         onChange={onChange}
            //                         value={value}
            //                         formField={formField}
            //                         handleAction={handleAction}
            //                         defaultCountry={countryCode}
            //                         ref={ref}
            //                     />
            //                 )}
            //             />
            //         </div>
            //     )
            // case 'date':
            //     return (
            //         <div className={containerClassName}>
            //             <Controller
            //                 name={formField}
            //                 control={control}
            //                 rules={validations}
            //                 render={({ field: { onChange, onBlur, value,ref } }) => (
            //                     <CustomDatePicker
            //                         errors={errors}
            //                         onChange={onChange}
            //                         selectedDate={value}
            //                         formField={formField}
            //                         ref={ref}
            //                     />
            //                 )}
            //             />
            //         </div>
            //     )
            // case 'email':
            //     return (
            //         <div className={containerClassName}>
            //             <input
            //                 autoComplete="off"
            //                 type="email"
            //                 maxLength={maxLength !== 0 ? maxLength : undefined}
            //                 placeholder={placeHolder}
            //                 className={className}
            //                 {...register(formField, validations)}
            //             />
            //         </div>
            //     )
            // case 'dpi':
            //     return (
            //         <div className={containerClassName}>
            //             <input
            //                 autoComplete="off"
            //                 type="text"
            //                 placeholder={placeHolder}
            //                 className={className}
            //                 {...register(formField, validations)}
            //                 inputMode="numeric"
            //                 maxLength={maxLength !== 0 ? maxLength : undefined}
            //                 onKeyPress={(e) => {
            //                     if (!/^[0-9]+$/.test(e.key)) {
            //                         e.preventDefault(); // Evita que se ingresen caracteres que no sean números
            //                     }
            //                 }}
            //             />
            //         </div>
            //     )
            case 'number':
                return (
                    <div className={containerClassName}>
                        <input
                            autoComplete="off"
                            type="number"
                            placeholder={placeHolder}
                            className={classNameDefault}
                            {...register(formField, validations)}
                            inputMode="numeric"
                            min={minLength !== 0 ? minLength : undefined}
                            max={maxLength !== 0 ? maxLength : undefined}
                        />
                    </div>
                )
            // case 'password':
            //     return (
            //         <div className={containerClassName}>
            //             <input
            //                 autoComplete="off"
            //                 type="password"
            //                 placeholder={placeHolder}
            //                 className={className}
            //                 {...register(formField, validations)}
            //             />
            //         </div>
            //     )
        }
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            {
                renderInput()
            }

            {
                errors[formField] && (
                    <div className="mx-8 text-lg font-bold text-red-500">
                        *
                        {
                            errors[formField].message
                        }
                    </div>
                )
            }
        </div>
    )

}