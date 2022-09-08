import React, { useState , useCallback } from "react";
import "../../Common/table/scrollStyle.css";
import tableStyle from "../../Common/table/table.module.css";
import { AiOutlineDelete } from "react-icons/ai";

export const LayerList = ({style, data, ...props}) => {
    const [hovering, setHovering] = useState(false);
    
    const lengthArray = data.map(d => Object.keys(d.info).length);
    const maxLengthIndex = lengthArray.indexOf(Math.max(...lengthArray));
    const columns = [...Object.keys(data[maxLengthIndex].info)];

    const handleMouseOver = useCallback(() => {
        !hovering &&
        setHovering(true);
    }, [hovering]);

    const handleMouseOut = useCallback(() => {
        !!hovering &&
        setHovering(false);
    }, [hovering]);
    
    return (
        <div 
            className={`${hovering? "scrollhost":"disViable"} ${tableStyle.container}`}
            style={style}
            onMouseLeave={handleMouseOut}
            onMouseEnter={handleMouseOver}
        >
            <table style={{"width":"100%"}}>
                <thead>
                    <tr
                        key={"column"}
                        style={{"width":"100%"}}
                    >
                        <th className={tableStyle.th}>index</th>
                        { columns.map((column) => (
                            <th className={tableStyle.th}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(d => (
                        <tr className={tableStyle.tbodyTr}>
                            <td className={tableStyle.td}>{d.idx}</td>
                            { columns.map(
                                column => (
                                    <td className={tableStyle.td}>
                                        {Object.keys(d.info).includes(column)? 
                                            JSON.stringify(d.info[column]): "null"}
                                    </td>
                                )
                            )}
                            {props.isHandleRemove &&
                                <td 
                                    className={[tableStyle.td, tableStyle.removeTd].join(' ')}
                                    onClick={()=>props.handleRemove(d.idx)}>
                                    <AiOutlineDelete/>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}