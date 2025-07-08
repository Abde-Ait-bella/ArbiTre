
function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];
    
    // Générer un tableau de pages à afficher
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    
    return (
        <div className="flex justify-center mt-6">
            <nav className="inline-flex rounded shadow-sm" aria-label="Pagination">
                {/* Bouton précédent */}
                <button 
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-3 py-2 rounded-l-md text-sm font-medium
                        ${currentPage === 1 
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                >
                    &laquo;
                </button>
                
                {/* Pages */}
                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium
                            ${currentPage === page
                            ? 'bg-yellow-600 text-white hover:bg-yellow-500 z-10' 
                            : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                    >
                        {page}
                    </button>
                ))}
                
                {/* Bouton suivant */}
                <button
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-3 py-2 rounded-r-md text-sm font-medium
                        ${currentPage === totalPages 
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                >
                    &raquo;
                </button>
            </nav>
        </div>
    );
}

export default Pagination;