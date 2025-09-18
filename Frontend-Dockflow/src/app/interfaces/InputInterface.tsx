import { Control, UseFormRegister} from "react-hook-form";

export interface InputInterface {
    type: 'text' | 'number' | "email" | "password";
    handleAction?: (e: any) => void;
    placeHolder: string
    formField: string
    control?: Control<any>
    register: UseFormRegister<any>
    validations: any
    errors: any
    disabled?: boolean
    maxLength?: number
    minLength?: number
}