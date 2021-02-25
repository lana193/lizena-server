import { baseUrl } from '../../config/base';

export const filterObjArrReduce = ((objToFilter, key) => {
    const result = objToFilter.reduce((accumulator, item) => {
        accumulator.push(item[key]);
        return accumulator;
    }, []);
    return result;
});

export const filterObjArrMap = ((objToFilter, folder) => {
    const result = objToFilter.map((item) => {
        const image = item;//[key].replace(/\\/g, "/");
        console.log('filterObjArr', image);
        return `${baseUrl}/uploads/${folder}/${image}`;
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

