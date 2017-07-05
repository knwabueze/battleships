export function snakeToCamel(str) {
    return str.replace(/(-\w)/g, function (substr) {
        return substr[1].toUpperCase();
    });
};

export function shallowFlatten(arr) {
    return arr.reduce((prev, curr) => {
        return prev.concat(curr);
    }, []);
};

export function deepFlatten(arr) {
    return arr.reduce((prev, curr) => {
        return prev.concat(Array.isArray(curr) ? deepFlatten(curr) : curr);
    }, []);
}