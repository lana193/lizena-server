export const filterObjArrReduce = ((objToFilter, key) => {
    const result = objToFilter.reduce((accumulator, item) => {
        accumulator.push(item[key]);
        return accumulator;
    }, []);
    return result;
});

export const filterObjArrMap = ((objToFilter, key, folder) => {
    const result = objToFilter.map((item) => {
        const image = item[key].replace(/\\/g, "/");
        console.log(333, image);
        // return image;
        return `//localhost:3003${image.split('public')[1]}`;
        // return `//lizena/public/uploads/${folder}/${image.split('public')[1]}`;
    });
    return result;
});

export const filterObjArrForEach = ((objToFilter, key) => {
    const result = [];
    objToFilter.forEach((item) => {
        return result.push(item[key]);
    });
    return result;
});