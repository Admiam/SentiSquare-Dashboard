export const generateColor = (i: number, total: number) => {
    const hue = Math.round((i / total) * 360);
    return `hsl(${hue}, 70%, 60%)`;
};
