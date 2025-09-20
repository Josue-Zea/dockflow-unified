export const VALIDATIONS = {
    fullNameValidation: {
        required: 'Debe ingresar su nombre completo',
        pattern: {
            value: /^[A-Za-zÀ-ÿ0-9\s]+$/,
            message: 'Solo se permiten letras, números y espacios',
            maxLength: {
                value: 100,
                message: 'El nombre no puede tener más de 100 caracteres',
            },
        }
    },
    nameValidation: {
        required: 'Debe ingresar su nombre',
        pattern: {
            value: /^[A-Za-zÀ-ÿ0-9\s]+$/,
            message: 'Solo se permiten letras, números y espacios',
            maxLength: {
                value: 100,
                message: 'Sus nombres no pueden tener más de 100 caracteres',
            },
        }
    },
    nameWorkValidation: {
        required: 'Debe ingresar su rubro de trabajo',
        pattern: {
            value: /^[A-Za-zÀ-ÿ0-9\s]+$/,
            message: 'Solo se permiten letras, números y espacios',
            maxLength: {
                value: 50,
                message: 'El rubro de trabajo no puede tener más de 50 caracteres',
            },
        }
    },
    numberValidation: {
        required: 'Debe ingresar un número',
        pattern: {
            value: /^[0-9]+$/,
            message: 'Solo se permiten números',
        },
        maxLength: {
            value: 10,
            message: 'El número no puede tener más de 10 caracteres',
        },
        min: {
            value: 1,
            message: 'El número no puede ser cero o negativo',
        }
    },
    documentNumberValidation: {
        required: 'Debe ingresar un número',
        pattern: {
            value: /^[0-9]+$/,
            message: 'Solo se permiten números',
        },
        maxLength: {
            value: 10,
            message: 'El número no puede tener más de 10 caracteres',
        },
        min: {
            value: 1,
            message: 'El número de expediente no puede ser cero o negativo',
        }
    },
    yearDocumentValidarion: {
        required: 'Debe ingresar un número',
        pattern: {
            value: /^[0-9]+$/,
            message: 'Solo se permiten números',
        },
        maxLength: {
            value: 10,
            message: 'El número no puede tener más de 10 caracteres',
        },
        min: {
            value: 1,
            message: 'El año del expediente no puede ser cero o negativo',
        }
    },
    fieldRequired: {
        required: 'Este campo es requerido'
    }
}