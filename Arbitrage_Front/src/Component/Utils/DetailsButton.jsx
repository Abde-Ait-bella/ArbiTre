import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';


const DetailsButton = ({ 
    matchId, 
    className = "rounded p-button btn-warning p-button-sm",
    tooltip = "عرض تفاصيل التقرير",
    children = "التفاصيل"
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/dashboard/detailleRapport/${matchId}`);
    };

    return (
        <Button 
            onClick={handleClick}
            className={className}
            tooltip={tooltip}
            tooltipOptions={{ position: 'top',
                className: 'roboto-tooltip' 
             }}
        >
            {children}
        </Button>
    );
};

export default DetailsButton;