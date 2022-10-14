const IalphaaChart = ({profitData,lossData }) =>{
   const totalProfit = profitData.filter(item => item!=="-").reduce((tot,item)=>tot+ Number(item),0);
   const totalLoss =   lossData.filter(item => item!=="-").reduce((tot,item)=>tot+ Number(item),0); 

   return (
    <>
    <div className="dataSummary">
          <h3 className="summaryHeading">Net Change</h3>
          <div className="summaryCalculation">
            <div className="summaryProfit">
                <div className="summaryProfitDetails">
                <p>Profit</p>
                <p>{totalProfit}</p>
                </div>
            </div>

            <div className="summaryLoss">
                <div className="summaryLossDetails">
                <p>Loss</p>
                <p>{-totalLoss}</p>
                </div>
            </div>
            <div className="summaryNet">
                <div className="summaryNetDetails">
                <p>Net</p>
                <p>{totalProfit - totalLoss}</p>
                </div>
            </div>
          </div>
    </div>
    </>
   )

}

export default IalphaaChart;