function truncateText(text: string, length: number) {
	if (text.length <= length) {
		return text;
	}

	return text.substring(0, length) + '...';
}

export { truncateText };
