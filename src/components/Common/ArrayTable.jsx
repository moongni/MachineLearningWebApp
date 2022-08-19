import React, { useState , useCallback } from "react";
import { useEffect } from "react";
import "./scrollStyle.css";
import * as tf from "@tensorflow/tfjs";

const ArrayTable = ({children, ...props}) => {
    const [hovering, setHovering] = useState(false);
    const [arrayData, setArrayData] = useState([]);

    const handleMouseOver = useCallback(() => {
        !hovering &&
        setHovering(true);
    }, [hovering]);

    const handleMouseOut = useCallback(() => {
        !!hovering &&
        setHovering(false);
    }, [hovering]);
    
    useEffect(() => {
        console.log(Object.values(props.data));
        if (Object.values(props.data).length > 0){
            const concatedData = tf.concat(Object.values(props.data), 1);
            setArrayData(concatedData.arraySync());
        }
    }, [])

    return (
        <div>
            { (Array.isArray(props.columns) && props.columns.length > 0) && 
                <div className={`${hovering? "scrollhost":"disViable"} max-h-[28rem]`}
                     onMouseLeave={handleMouseOut}
                     onMouseEnter={handleMouseOver}
                >
                    <table className="w-full p-4">
                        <thead>
                            <tr key={"column"}
                                className="border-b-2 border-yellow-300">
                                { props.columns
                                    .map((column) => (
                                    <th className="sticky top-0 text-left p-3 border-r-8 border-slate-50 bg-slate-50 z-10">
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            { arrayData.map((items, idx) => {
                                return (
                                    <tr className="mx-1 py-2 border-b-2 border-slate-100"
                                        key={idx}>
                                        {
                                            props.columns.map((column, index) => (
                                                    <td className="w-5 p-3 mr-2 tracking-widest">
                                                        {items[index]? items[index]: "null"}
                                                    </td>
                                                )
                                            )
                                        }
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tbody>
                            <tr className=" sticky bottom-0 bg-slate-50">{children}</tr>
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default React.memo(ArrayTable);