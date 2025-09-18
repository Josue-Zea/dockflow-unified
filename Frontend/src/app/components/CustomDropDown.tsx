import React, { useState } from "react";

const CustomDropDown = ({ options, text, optionName, width, secondName, multiName = false, setOption }:
    { options: any[], text: string, optionName: string, width:number, secondName?: string, multiName?: boolean, setOption: (option: any) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    // Función para manejar la selección de una opción
    const handleOptionClick = (option: any) => {
        setSelectedOption(option);
        setOption(option);
        setIsOpen(false); // Cerrar el menú al seleccionar una opción
    };

    return (
        <div style={{ width: `${width}px`}} className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
            >
                {
                    selectedOption ?
                        multiName ?
                            selectedOption[optionName] + '-' + selectedOption[secondName!] :
                            selectedOption[optionName] :
                        text
                }
                <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-[200px] overflow-y-auto">
                    <ul className="py-1">
                        {options.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className="px-4 py-2 text-gray-800 cursor-pointer hover:bg-blue-100"
                            >
                                {
                                    multiName ?
                                        option[optionName] + '-' + option[secondName!] :
                                        option[optionName]
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomDropDown;