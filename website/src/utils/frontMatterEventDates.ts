// import logger from '@docusaurus/logger'

// If month/day are not present, extend with defaults.
// It does not accept negative values.
const makeDateISO = ((eventDate: string) => {
    let newDate
    if (eventDate.match(/[0-9][0-9]*-[0-9][0-9]*-[0-9][0-9]*/))
        newDate = new Date(eventDate);
    else if (eventDate.match(/[0-9][0-9]*-[0-9][0-9]*/))
        newDate = new Date(eventDate + '-15'); // mid month
    else if (eventDate.match(/[0-9][0-9]*/))
        newDate = new Date(eventDate + '-07-01'); // mid year
    else {
        // Last resort, parse as valid.
        newDate = new Date(eventDate);
    }

    // For weird reasons, 2 digit years are considered relative to epoch.
    // To allow dates in the antiquity, set explicitly.
    const year = eventDate.replace(/-.*/, '')
    newDate.setFullYear(year)

    return newDate.toISOString()
})

export const parseFrontMatterEventDates = async (params) => {
    // Reuse the default parser
    const result = await params.defaultParseFrontMatter(params);

    if (result.frontMatter.eventDate) {
        result.frontMatter.eventDateISO = makeDateISO(result.frontMatter.eventDate)

        if (result.frontMatter.eventEndDate) {
            result.frontMatter.eventEndDateISO = makeDateISO(result.frontMatter.eventEndDate)
        } else {
            result.frontMatter.eventEndDateISO = result.frontMatter.eventDateISO
        }
    } else if (result.frontMatter.date) {
        result.frontMatter.eventDateISO = new Date(result.frontMatter.date)
        result.frontMatter.eventEndDateISO = result.frontMatter.eventDateISO
    }
    // logger.info(result.frontMatter)
    return result;
}

