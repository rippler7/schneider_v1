import "./Modal.css"
import React from "react";
import eventBus from "../../eventBus";
import lbData from '../db/leaderBoards.json';
 
  eventBus.on('openLeaderboard', (data) => {
    eventBus.remove('openLeaderboard');
    console.log(lbData);
  });

  export default function Modal(){
    
    // eventBus.on("clickedObj",function(data){
    //   console.log("clicked Object is: "+data.clickedObj);
    //   eventBus.remove("clickedObj");
    // })
    function onCloseModal(event){
      var modl = event.target.parentNode.parentNode; 
      modl.classList.remove('showModal');
      modl.classList.add('hideModal');
      var blackSheet = document.getElementById('blackSheet');
      blackSheet.style.display = "none";
      blackSheet.style.zIndex = -1;
    };
    return (
      <div id="blackSheet">
        <div id="mainModal" className="modal-wrapper">        
          <div className="modal-header">
            <h1 id="modalHeader">Welcome!</h1>
            <img id="bldgIcon" src={"/assets/img/office.png"} alt="" />
            <span className="close-modal-btn" onClick={onCloseModal}>X</span>
          </div>
          <div className="modal-content">
            <div className="modal-body">
              <p>Some text inside a modal</p>
            </div>
            <div className="modal-footer">    
            </div>
          </div>
        </div>
      </div>
    );
};
