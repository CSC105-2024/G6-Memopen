import { Link } from "react-router-dom";
import {fabric} from "fabric";
import { useState } from "react";
function Editor(){
    const [textColor , setTextColor] = useState("#000000");
    const [fontStyle , setFontStyle] = useState({
        bold:false,
        italic: false,
        underline:false,
    })
    return(
        <div>
            <div className="editor-nav bg-black flex justify-between items-center px-7 py-5  ">
                <div className="editor-nav-left">
                    <h3 className="HomeNavigate text-white text-3xl font-bold uppercase"><Link to="/HomePage">Memopen</Link></h3>
                </div>
                <div className="editor-nav-right flex gap-5">
                    <button className="bg-[#00917C] px-[26px] py-[16px] rounded-[10px] text-white text-3xl">Dowload</button>
                    <button className="bg-[#00BE33] px-[26px] py-[16px] rounded-[10px] text-white text-3xl">Save</button>
                </div>
            </div>
            <div className="area flex justify-center items-center flex-col">
                <div className="canvas-box flex flex-col  m-10 max-w-[960px]">
                    <div className="canvas-head bg-black">
                        <button className="bg-[#D9D9D9] px-[23px] py-[10px] text-2xl rounded-[10px] font-semibold">Add text</button>
                        <div className="font-style">
                            
                        </div>
                    </div>
                    <canvas width={960} height={540} className="border"/>
                </div>
                <div className="addTagBox">
                    <label>Add Tag</label>
                    <input  type="color"/>
                    <input className="border" type="text"/>
                </div>
                
            </div>
            
            


        </div>

    )
}
export default Editor;