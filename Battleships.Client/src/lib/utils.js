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

export function elongateOrientation(ori) {
    switch (ori) {
        case 'N':
            return 'North';
        case 'E':
            return 'East';
        case 'S':
            return 'South';
        case 'W':
            return 'West';
        default:
            return ori;
    }
}

export function intersects(a, b) {
    var setA = new Set(a);
    var setB = new Set(b);
    var intersection = new Set([...setA].filter(x => setB.has(x)));
    return Array.from(intersection).length > 0;
}