import { addScaleCorrector } from "framer-motion";
import React, { useState } from "react";

const MultipleSelect = ({options, selectedOptions, onChange}) => {
    /** 
     * Custom select that supports multiple selection
     * @param {options} options must be a list filled with dictionaries (each one a different option) that have the following keys: value and label
    */

    // const [selectedOptions, setSelectedOptions] = useState([]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            onChange([...selectedOptions, value]);
        } else {
            onChange(selectedOptions.filter((option) => option !== value));
        }
    };

    // TODO: make the checks black to match the ui
    return ( 
        <div className="p-2 bg-white rounded shadow">
            <div className="space-y-3">
                {options.map((option) => (
                    <label key={option.value} className={`flex items-center p-3 rounded-lg transition-all duration-200 ${selectedOptions.includes(option.value) ? "bg-gray-50 border border-gray-200" : "bg-gray-50 hover:bg-gray-100 border border-gray-200"}`}>
                        <input type="checkbox" value={option.value} checked={selectedOptions.includes(option.value)} onChange={handleCheckboxChange} className="w-5 h-5 text-gray-400 border-gray-300 rounded focus:ring-gray-950"/>
                        <span className="ml-3 text-lg text-gray-700">{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
  
  export default MultipleSelect;