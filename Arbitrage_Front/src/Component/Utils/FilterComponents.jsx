import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

// Composant de filtre de date
export const DateFilterComponent = React.memo(({ options, placeholder }) => {
    // S'assurer que la valeur initiale est un objet Date valide ou null
    const [localValue, setLocalValue] = useState(() => {
        if (options.value instanceof Date) return options.value;
        if (typeof options.value === 'string') {
            const parsedDate = new Date(options.value);
            return isNaN(parsedDate.getTime()) ? null : parsedDate;
        }
        return null;
    });

    // Appliquer le filtre immédiatement
    const handleDateChange = (e) => {
        const newValue = e.value;
        setLocalValue(newValue);
        
        if (options.filterCallback) {
            options.filterCallback(newValue);
        }
    };

    const clearDateFilter = () => {
        setLocalValue(null);
        if (options.filterCallback) {
            options.filterCallback(null);
        }
    };

    return (
        <div className="p-column-filter" style={{width: '100%'}}>
            <Calendar
                value={localValue}
                onChange={handleDateChange}
                dateFormat="dd/mm/yy"
                placeholder={placeholder || "بحث بالتاريخ"}
                style={{width: '100%', direction: 'rtl'}}
                className="p-column-filter"
                locale="ar"
            />
        </div>
    );
});

// Composant de filtre de texte
export const TextFilterComponent = React.memo(({ options, placeholder }) => {
    const [localValue, setLocalValue] = useState(options.value || '');

    // Appliquer le filtre immédiatement
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        
        if (options.filterCallback) {
            options.filterCallback(newValue);
        }
    };

    const clearFilter = () => {
        setLocalValue('');
        if (options.filterCallback) {
            options.filterCallback('');
        }
    };

    return (
        <div className="p-column-filter" style={{width: '100%'}}>
            <InputText
                value={localValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                style={{width: '100%', direction: 'rtl'}}
                className="p-inputtext p-component p-filled"
            />
        </div>
    );
});

// Composant de filtre dropdown
export const DropdownFilterComponent = React.memo(({ options, items, placeholder }) => {
    const [localValue, setLocalValue] = useState(options.value);

    // Appliquer le filtre immédiatement
    const handleDropdownChange = (e) => {
        const newValue = e.value;
        setLocalValue(newValue);
        
        if (options.filterCallback) {
            options.filterCallback(newValue);
        }
    };

    const clearFilter = () => {
        setLocalValue(null);
        if (options.filterCallback) {
            options.filterCallback(null);
        }
    };

    return (
        <div className="p-column-filter" style={{width: '100%'}}>
            <Dropdown
                value={localValue}
                options={items}
                onChange={handleDropdownChange}
                placeholder={placeholder}
                className="p-column-filter"
                style={{width: '100%', direction: 'rtl'}}
                showClear
            />
        </div>
    );
});