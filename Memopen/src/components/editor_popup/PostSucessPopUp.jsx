import { useNavigate } from "react-router-dom";

function PostSucessPopUp({ setSavePop , saveCanvas}) {
    const editPopUpNavigateToHome = useNavigate();
  return (
    <div>
      <div className="fixed inset-0  bg-black/40  bg-opacity-50 z-40"></div>        
        <div className="SavePopUp mx-10 fixed inset-0 justify-center items-center  flex flex-col  z-100  ">
            <div className=" rounded-t-3xl relative flex flex-col px-20 py-13 bg-[#00D639] w-full max-w-sm">
                    <button className="absolute left-[74%] top-[10px] " onClick={()=> setSavePop(false)}><img src="/assets/PostSucessPopup/EditPopUpClose.svg"/></button>
                    <img className="justify-center items-center" src="/assets/PostSucessPopup/sucessPic.svg"/>
            </div>
                <div className=" rounded-b-3xl savePoPButtom bg-white flex flex-col gap-9 px-8 py-10 w-full max-w-sm">
                    <div className="editPopUpTextField">
                        <h3 className="font-bold text-3xl text-center">DONE!</h3>
                        <p className="text-1xl text-center mt-3" >You successfully saved your work</p>
                    </div>
                    <div className="flex justify-center">
                        <button className="text-white justify-center  rounded-[10px] bg-black px-12 py-3" onClick={()=>{
                                saveCanvas();
                                editPopUpNavigateToHome("/HomePage")
                                
                        } }>OK</button>
                    </div>
                </div>
        </div>
    </div>
   
   
  );
}
export default PostSucessPopUp;
