import { LANGUAGE_TO_FLAG } from "../constants/constants";

export function getLanguageFlag(language) {
    if (!language) return null;
    const languageLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[languageLower];
    if (countryCode) {
        return `https://flagcdn.com/w20/${countryCode}.png`
    } else {
        return null; // or a default flag
    }
}


export function capitalizeFirstLetter(string) {
    if (!string) return null;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function formatLocation(location) {
    return location
        .split(', ') // Split by comma and space
        .map(part => part.split(' ') // Split each part by spaces
            .map(word => {
                // If the word is an abbreviation (e.g., "US"), keep it uppercase
                return word.length <= 2 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(' ') // Join words back together
        )
        .join(', '); // Join the parts back together with a comma and space
}