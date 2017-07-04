export function snakeToCamel(str) {
    return str.replace(/(-\w)/g, function (substr) {
        return substr[1].toUpperCase();
    });
}