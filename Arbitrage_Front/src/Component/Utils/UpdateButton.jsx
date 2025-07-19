import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

const UpdateButton = ({ 
    itemId, 
    updatePath,
    className = "p-button p-button-icon-only p-button-rounded p-button-text",
    icon = "pi pi-wrench",
    tooltip = "تعديل"
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`${updatePath}/${itemId}`);
    };

    return (
        <Button 
            onClick={handleClick}
            className={className}
            icon={icon}
            tooltip={tooltip}
            tooltipOptions={{ 
                position: 'top',
                className: 'roboto-tooltip'
            }}
        />
    );
};

export default UpdateButton;