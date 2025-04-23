import { useNavigate } from "react-router-dom";
function WarningPopUp({setBackHome}){
    const warningHomeNavigate = useNavigate();
    return(
        <div>
            <div className="fixed inset-0  bg-black/40  bg-opacity-50 z-40"></div>        
            <div className="SavePopUp fixed inset-0 justify-center items-center  flex flex-col  z-100  ">
            <div className=" rounded-t-3xl relative flex flex-col px-20 py-13 bg-[#FF2929] w-full max-w-sm">
                    <button className="absolute left-[74%] top-[10px] " onClick={()=> setBackHome(false)}><img src="\assets\PostSucessPopup\EditPopUpClose.svg"/></button>
                    <img className="justify-center items-center" src="\assets\PostSucessPopup\WarningPic.svg"/>
            </div>
                <div className=" rounded-b-3xl savePoPButtom bg-white flex flex-col gap-9 px-8 py-12 w-full max-w-sm">
                    <div className="editPopUpTextField">
                        <h3 className="font-bold text-3xl text-center">Unsave Changes</h3>
                        <p className="mt-3 text-1xl text-center " >Are you sure you want to leave this place ?
                        Changes you made will not saves</p>
                    </div>
                    <div className="flex justify-center gap-4">
                    <button className="text-[rgba(0, 0, 0, 0.47)] justify-center  rounded-[10px] bg-[#D9D9D9] px-10 py-3" onClick={()=>setBackHome(false)}>Cancel</button>
                    <button className="text-white justify-center  rounded-[10px] bg-[#FF2929] px-6 py-3" onClick={()=>warningHomeNavigate("/HomePage")}>Leave Page</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default WarningPopUp;