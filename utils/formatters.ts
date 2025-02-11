// Hàm định dạng tiền Việt Nam
export const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

// Hàm định dạng ngày tháng năm từ chuỗi ISO
export const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: false,
    };
    return date.toLocaleString('vi-VN', options).replace(',', '');
}; 