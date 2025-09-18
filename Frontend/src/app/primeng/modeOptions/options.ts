import { FilterMatchMode } from "primeng/api";

export const matchModeOptions = [
    {
        label: 'Empieza con',
        value: FilterMatchMode.STARTS_WITH
    },
    {
        label: 'Contiene',
        value: FilterMatchMode.CONTAINS
    },
    {
        label: 'No contiene',
        value: FilterMatchMode.NOT_CONTAINS
    },
    {
        label: 'Termina con',
        value: FilterMatchMode.ENDS_WITH
    },
    {
        label: 'Igual a',
        value: FilterMatchMode.EQUALS
    }
];

export const dateOptions = [
    {
        label: 'Fecha exacta',
        value: FilterMatchMode.DATE_IS
    },
    {
        label: 'Fecha diferente de',
        value: FilterMatchMode.DATE_IS_NOT
    },
    {
        label: 'Antes de',
        value: FilterMatchMode.DATE_BEFORE
    },
    {
        label: 'Después de',
        value: FilterMatchMode.DATE_AFTER
    },
];

export const numberOptions = [
    {
        label: 'Menor que',
        value: FilterMatchMode.LESS_THAN
    },
    {
        label: 'Mayor que',
        value: FilterMatchMode.GREATER_THAN
    },
    {
        label: 'Menor o igual que',
        value: FilterMatchMode.LESS_THAN_OR_EQUAL_TO
    },
    {
        label: 'Mayor o igual que',
        value: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
    },
]