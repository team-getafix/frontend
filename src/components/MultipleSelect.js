import { addScaleCorrector } from "framer-motion";
import React, { useState } from "react";

const MultipleSelect = ({title, options}) => {
    /** 
     * Custom select that supports multiple selection
     * @param {title} the title of the select
     * @param {options} options must be a list filled with dictionaries (each one a different option) that have the following keys: value and label
    */

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setSelectedOptions([...selectedOptions, value]);
        } else {
            setSelectedOptions(selectedOptions.filter((option) => option !== value));
        }
    };

    return (
        <div className="p-2 bg-white rounded shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                { title }
            </h2>
            <div className="space-y-3">
                {options.map((option) => (
                    <label key={option.value} className={`flex items-center p-3 rounded-lg transition-all duration-200 ${selectedOptions.includes(option.value) ? "bg-blue-50 border border-blue-200" : "bg-gray-50 hover:bg-gray-100 border border-gray-200"}`}>
                        <input type="checkbox" value={option.value} checked={selectedOptions.includes(option.value)} onChange={handleCheckboxChange} className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                        <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
  
  export default MultipleSelect;