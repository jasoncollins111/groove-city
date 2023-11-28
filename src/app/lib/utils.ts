export function capitalizeAndReplace(inputString: string) {
    return inputString?.replace(/-([a-z])/g, function(match, group1) {
    return ' ' + group1.toUpperCase();
    }).replace(/^\w/, function(firstLetter) {
    return firstLetter.toUpperCase();
    });
}