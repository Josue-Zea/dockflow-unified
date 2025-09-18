import Swal, { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";
// import { themeColor } from "../../configs";
// Icons: success, error, warning, info, question
// position: top, top-start, top-end, center, center-start, center-end, bottom, bottom-start, or bottom-end

export const IconAlert = (
        icon: SweetAlertIcon = 'success',
        text: string = 'Exito',
        timer: number = 1500,
        position: SweetAlertPosition = 'center') => {
    Swal.fire({
        position: position,
        icon: icon,
        title: text,
        showConfirmButton: false,
        timer: timer
    });
};

export const BigIconAlert = (
    icon: SweetAlertIcon = 'success',
    text: string = 'Exito',
    position: SweetAlertPosition = 'center') => {
    Swal.fire({
        title: 'Expediente 12345 creado',
        html:
          '<h5>Detalle</h5>' +
          '<h5>Número de expediente: 120-121</h5>' +
          '<h5>Tipo de trámite: Sociedad</h5>' +
          '<h5>Tipo de documento: Modificación</h5>' +
          '<h5>Fecha de creación: 06/05/2023</h5>' +
          '<h5>Encargado: Operador 1</h5>',
        position: position,
        icon: icon,
        showConfirmButton: true,
    });
};

export const InputAlert = async (text: string = "Ingresa tu nombre") => {
    const result = await Swal.fire({
        title: text,
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: false
    });
    return result.isConfirmed ? result.value : '';
};

export const YesNoAlert = async (
    icon: SweetAlertIcon = 'warning',
    title: string = '¿Estas seguro?',
    description: string = 'Esta accion no se puede deshacer',
    confirmDescription: string = 'Confirmar'
) => {
    const result = await Swal.fire({
        title: title,
        text: description,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmDescription,
        cancelButtonText: 'Cancelar'
    });
    return result.isConfirmed;
};

export const SmallIconAllert = (icon: SweetAlertIcon = "success", text: string = 'Exito', timer: number = 1500, position: SweetAlertPosition = 'top-end') => {
    const Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    Toast.fire({
        icon: icon,
        title: text
    });
}

export const TwoOptionsAlert = async (
    title: string = 'Seleccione la opcion a visualizar',
    option1: string = '',
    option2: string = ''
) => {
    const result = await Swal.fire({
        title: title,
        text: '',
        showCancelButton: true,
        // confirmButtonColor: themeColor.primary,
        // cancelButtonColor: themeColor.primary,
        confirmButtonText: option1,
        cancelButtonText: option2
    });
    return result.isConfirmed ? 0 : 1;
};