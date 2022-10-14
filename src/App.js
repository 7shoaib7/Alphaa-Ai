import { useState, useEffect } from "react";
import axios from "axios";
import AlphaaChart from "./components/AlphaaChart";
import IalphaaChart from "./components/IalphaaChart";
import './App.css';

function App() {
  const [chartdata, setData] = useState(false);
  const [profitLoss, setProfitLoss] = useState("");
  const [profitData, setProfitData] = useState([]);
  const [lossData, setLossData] = useState([]);
  const [placeholder, setPlaceHolder] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      "https://run.mocky.io/v3/e2ffac92-48e0-4826-a59f-bf76fc727383"
    );
    const response = res.data.data;
    setData(response);
    const profitCategories = (response) => {
      return response.filter((item) => item.d__2022sale > item.d__2021sale);
    };

    const profit = (profitCategories) => {
      const res = profitCategories.map((item) => {
        return {
          subcategory: item.subcategory,
          profit: item.d__2022sale - item.d__2021sale
        };
      });
      return res.sort((a, b) => b.profit - a.profit);
    };

    const lossCategories = (data) => {
      return data.filter((item) => item.d__2022sale < item.d__2021sale);
    };

    const loss = (lossCategories) => {
      const res = lossCategories.map((item) => {
        return {
          subcategory: item.subcategory,
          loss: item.d__2021sale - item.d__2022sale
        };
      });
      return res.sort((a, b) => a.loss - b.loss);
    };

    const finalChartData = [
      ...profit(profitCategories(response)),
      ...loss(lossCategories(response))
    ];

    const profitArr = finalChartData.map((item) => {
      if (item.profit) {
        return item.profit.toFixed(2);
      }
      return "-";
    });

    const lossArr = finalChartData.map((item) => {
      if (item.loss) {
        return item.loss.toFixed(2);
      }
      return "-";
    });

    let forProfit = [0];
    for (let i = 0; i < finalChartData.length; i++) {
      if (i === 0) {
        forProfit.push(Number(finalChartData[0].profit.toFixed(2)));
      } else {
        if (finalChartData[i].profit) {
          forProfit.push(
            finalChartData
              .slice(0, i + 1)
              .reduce((tot, item) => tot + Number(item.profit.toFixed(2)), 0)
          );
        }
      }
    }

    let forLoss = [];
    let fil = lossArr.filter((item) => item !== "-");
    for (let i = 0; i < fil.length; i++) {
      forLoss.push(forProfit[forProfit.length - 1] - Number(fil[i]));
    }

    setPlaceHolder([...forProfit.slice(0, forProfit.length - 1), ...forLoss]);
    setProfitLoss(finalChartData);
    setProfitData(profitArr);
    setLossData(lossArr);
    // console.log(profitLoss);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(profitLoss);
    // console.log(profitData);
    // console.log(lossData);
    // console.log(placeholder);
  }, [profitLoss, profitData, lossData]);
  
  
  return (
    <div className="App">
        <div className="appData">
          <div className="chart">
          <AlphaaChart profitLoss={profitLoss} profitData={profitData} lossData={lossData} placeholder={placeholder} />
          </div>
          <div className="summary">
          <IalphaaChart profitData={profitData} lossData={lossData} /> 
            </div>
        </div>    
        <div className="summaryBottom">
          <IalphaaChart profitData={profitData} lossData={lossData} /> 
        </div> 
    </div>
  );
}

export default App;
