// Validator
/**
 * Validates input from users form with RegExp.
 * @param {String} name Pet name
 * @param {String} breed Pet breed
 * @param {String} color Pet color
 * @param {Number} age Pet age
 * @param {Array} images Pet images
 * @returns
 */
function petFormValidator(name, breed, color, age, images) {
    // Checks if the fields are fulfilled
    if (!name || !breed || !color || !age || !images) {
        return false;
    }

    // Checks if string fields are valid
    const stringRegExp = /^[\w' ][^"!@#$%¨&*()\-=_+[{\]},.<>;:/?°\|\\]{2,32}$/;
    if (
        !stringRegExp.test(name) ||
        !stringRegExp.test(breed) ||
        !stringRegExp.test(color)
    )
        return false;

    // Checks if numbers fields are valid
    const numberRegExp = /^[0-9]{1,6}$/;
    if (!numberRegExp.test(age)) return false;

    return true;
}

// Export
module.exports = petFormValidator;
