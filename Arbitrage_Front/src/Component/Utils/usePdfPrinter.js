import { useState } from 'react';
import { axiosClinet } from '../../Api/axios';

export const usePdfPrinter = () => {
    const [isPdfLoading, setIsPdfLoading] = useState(false);

    const printPdf = async (matchId, homeClubName, awayClubName, matchDate) => {
        setIsPdfLoading(true);

        // Créer un nom de fichier unique avec les clubs et la date en arabe
        const createPdfFileName = () => {
            const homeClub = homeClubName || 'النادي الأول';
            const awayClub = awayClubName || 'النادي الثاني';
            const date = matchDate || 'no-date';
            
            return `تقرير الحكم - ${homeClub} ضد ${awayClub} - ${date}`;
        };

        try {
            const response = await axiosClinet.get(`rapport/${matchId}`, {
                responseType: 'blob',
                headers: {
                    'Accept': 'application/pdf'
                }
            });

            setIsPdfLoading(false);

            if (response.data.size === 0) {
                console.error("Le PDF reçu est vide");
                return;
            }

            const fileName = createPdfFileName();
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            // Ouvrir dans une nouvelle fenêtre avec design personnalisé
            const newWindow = window.open('', '_blank');
            if (newWindow) {
                newWindow.document.write(`
                    <!DOCTYPE html>
                    <html dir="rtl" lang="ar">
                    <head>
                        <title>${fileName}</title>
                        <meta charset="utf-8">
                        <link rel="preconnect" href="https://fonts.googleapis.com">
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
                        <style>
                            @font-face {
                                font-family: 'Cairo';
                                src: url('./Fonts/Cairo-VariableFont_slntwght.ttf') format('truetype');
                                font-weight: 100 900;
                                font-style: normal;
                            }
                            
                            * {
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                            }
                            
                            body { 
                                margin: 0; 
                                padding: 0; 
                                font-family: 'Cairo', Arial, sans-serif;
                                background-color: #dc3545;
                                color: white;
                                direction: rtl;
                            }
                            
                            .header {
                                background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
                                padding: 15px 25px;
                                border-bottom: 3px solid #ffffff20;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                            }
                            
                            .logo-section {
                                display: flex;
                                align-items: center;
                                gap: 15px;
                            }
                            
                            .logo {
                                width: 50px;
                                height: 50px;
                                background: white;
                                border-radius: 8px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-weight: bold;
                                color: #dc3545;
                                font-size: 18px;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            }
                            
                            .site-info {
                                display: flex;
                                flex-direction: column;
                                align-items: flex-end;
                            }
                            
                            .site-subtitle {
                                font-size: 12px;
                                color: #ffffff90;
                                font-weight: 400;
                            }
                            
                            .file-info {
                                display: flex;
                                flex-direction: column;
                                align-items: flex-end;
                                text-align: right;
                            }
                            
                            .filename {
                                font-weight: 600;
                                font-size: 16px;
                                color: white;
                                margin-bottom: 5px;
                                text-shadow: 0 1px 2px rgba(0,0,0,0.3);
                            }
                            
                            .file-date {
                                font-size: 12px;
                                color: #ffffff80;
                                font-weight: 400;
                            }
                            
                            .download-btn {
                                background: white;
                                color: #dc3545;
                                border: none;
                                padding: 10px 20px;
                                border-radius: 25px;
                                cursor: pointer;
                                text-decoration: none;
                                font-size: 14px;
                                font-weight: 600;
                                transition: all 0.3s ease;
                                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            }
                            
                            .download-btn:hover {
                                background: #f8f9fa;
                                transform: translateY(-1px);
                                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                            }
                            
                            .pdf-container {
                                background-color: #dc3545;
                                height: calc(100vh - 80px);
                                padding: 10px;
                            }
                            
                            iframe { 
                                width: 100%; 
                                height: 100%; 
                                border: none; 
                                border-radius: 8px;
                                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                            }
                            
                            @media (max-width: 768px) {
                                .header {
                                    flex-direction: column;
                                    gap: 15px;
                                    padding: 20px 15px;
                                }
                                
                                .logo-section {
                                    order: 2;
                                }
                                
                                .file-info {
                                    order: 1;
                                    align-items: center;
                                    text-align: center;
                                }
                                
                                .download-btn {
                                    order: 3;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                        
                        <a href="${url}" download="${fileName}.pdf" class="download-btn">
                            💾 تحميل التقرير
                        </a>
                        
                        <div class="file-info">
                        <div class="filename">📄 ${fileName}</div>
                        <div class="file-date">${new Date().toLocaleDateString('fr')}</div>
                        </div>

                        <div class="logo-section">
                            <div class="site-info">
                                <h1>ArbiTre</h1>
                                <div class="site-subtitle">ArbiTre Platform</div>
                            </div>
                        </div>
                        </div>
                        
                        <div class="pdf-container">
                            <iframe src="${url}#toolbar=1&navpanes=0&scrollbar=1&view=FitH" type="application/pdf"></iframe>
                        </div>
                    </body>
                    </html>
                `);
                newWindow.document.close();
            }

            // Nettoyer l'URL après utilisation
            setTimeout(() => URL.revokeObjectURL(url), 10000);
            
        } catch (error) {
            setIsPdfLoading(false);
            console.error("Erreur lors de la récupération du PDF:", error);
            alert("فشل في إنشاء تقرير PDF");
        }
    };

    return { printPdf, isPdfLoading };
};