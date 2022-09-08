import React from 'react'
import { Link } from 'react-router-dom';
import { SideParamBoard } from './ParamBoard';
import { SideCompileBoard } from './CompileBoard';
import { SideLayerBoard } from './LayerBoard';
import style from './ModelDashBoard.module.css';

export const ModelDashBoard = (props) => {
    const listStyle = {
        "fontSize":"1.125rem",
        "lineHeight":"1.75rem",
        "fontWeight":"500"
    }

    return (
        <div className={[`${props.isDashboardOpen? style.open:style.close}`, style.container].join(' ')}
        >
            <div className={style.modelInfo}>
                <h1 className={style.h1}>Model Info</h1>
                <div style={{"marginLeft": "1rem"}}>
                    <SideLayerBoard
                        style={listStyle}
                        link="/setting"/>
                    <SideCompileBoard
                        style={listStyle}
                        link="/setting"/>
                    <SideParamBoard
                        style={listStyle}
                        link="/setting"/>
                </div>
            </div>
            <div className={style.modelTrain}>
                <div className={style.div}>
                    <Link to='/tfjs_test/'>
                    <button className={style.button}>fit</button>
                    </Link>
                </div>
            </div>
        </div>
  )
}