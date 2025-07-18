import { Button } from 'primereact/button';

const DeleteButton = ({ 
    itemId,
    onDelete,
    loading = false,
    loadingItemId = null,
    className = "p-button-danger p-button-text p-button-rounded",
    icon = "pi pi-trash",
    loadingIcon = "pi pi-spin pi-spinner",
    tooltip = "حذف",
    disabled = false
}) => {
    const isCurrentItemLoading = loading && loadingItemId === itemId;

    return (
        <Button
            icon={isCurrentItemLoading ? loadingIcon : icon}
            className={className}
            onClick={() => onDelete(itemId)}
            tooltip={tooltip}
            tooltipOptions={{ 
                position: 'top',
                className: 'roboto-tooltip'
            }}
            disabled={disabled || isCurrentItemLoading}
        />
    );
};

export default DeleteButton;