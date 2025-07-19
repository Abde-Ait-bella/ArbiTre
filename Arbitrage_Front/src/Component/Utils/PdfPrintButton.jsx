import { Button } from 'primereact/button';
import { usePdfPrinter } from './usePdfPrinter';

const PdfPrintButton = ({ 
    matchId, 
    homeClubName, 
    awayClubName, 
    matchDate, 
    className = "p-button-success p-button-sm ms-2 ",
    icon = "fa-print fa-solid text-secondary ms-2",
    tooltip = "طباعة التقرير",
    children = ""
}) => {
    const { printPdf, isPdfLoading } = usePdfPrinter();

    const handlePrint = () => {
        printPdf(matchId, homeClubName, awayClubName, matchDate);
    };

    return (
        <Button
            icon={isPdfLoading ? 'fa-solid fa-spinner fa-spin text-secondary ms-2' : icon}
            className={className}
            onClick={handlePrint}
            tooltip={tooltip}
            tooltipOptions={{ position: 'top' }}
            disabled={isPdfLoading}
        >
            {children}
        </Button>
    );
};

export default PdfPrintButton;