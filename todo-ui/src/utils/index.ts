export const getFormattedDateTime = (date: string) => {
	let utcDate = new Date(date);
	return utcDate.toLocaleString();
};
