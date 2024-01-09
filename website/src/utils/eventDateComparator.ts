
const compareDates = ((aEventDateMillis, bEventDateMillis) => {
    return bEventDateMillis - aEventDateMillis;
})

export const eventDateComparator = ((a, b) => {
    const aEventDateMillis = new Date(a.metadata.frontMatter.eventDateISO || a.metadata.date);
    const bEventDateMillis = new Date(b.metadata.frontMatter.eventDateISO || b.metadata.date);
    // logger.info(aEventDate);
    // logger.info(bEventDate);

    const value = compareDates(aEventDateMillis, bEventDateMillis);
    if (value !== 0)
        return value

    const aEventEndDateMillis = new Date(a.metadata.frontMatter.eventEndDateISO || a.metadata.date);
    const bEventEndDateMillis = new Date(b.metadata.frontMatter.eventEndDateISO || b.metadata.date);

    return compareDates(aEventEndDateMillis, bEventEndDateMillis)
})
