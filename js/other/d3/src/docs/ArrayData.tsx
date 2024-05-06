import {useEffect, useState} from "react";
import * as d3 from "d3"

const ArrayData = () => {

    const data = [10, 12, 13, 14, 15, 16, 17]


    //bisector - позволяет найти индекс ближайшего значения в массиве к значению которое мы передаем в center, right или а
    useEffect(() => {
        const right = d3.bisector(d => d).center(data, 11)
        const bisect = d3.bisectLeft(data, 11)
    }, []);
    return <div>
        hello
    </div>
}

export default ArrayData
