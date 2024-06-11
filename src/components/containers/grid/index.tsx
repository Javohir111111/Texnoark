import "./style.scss";
import { gridPropType } from "@interface";

const index = ({cols, gap,}:gridPropType) => {
    console.log(cols, gap);

    const style={
        display:'grid',
        gridTemplateColumns:`repeat(${cols}, 1fr)`,
        gridGap:`${gap}px`
    }

    return (
        <div style={style}>
           {/* {children} */}
        </div>
    );
};

export default index;