import ReactEcharts from "echarts-for-react";



const AlphaaChart = ({ profitLoss, profitData, lossData, placeholder }) => {
    const totalProfit = profitData.filter(item => item !== "-").reduce((tot, item) => tot + Number(item), 0);
    const totalLoss = lossData.filter(item => item !== "-").reduce((tot, item) => tot + Number(item), 0);
    const net = totalProfit - totalLoss;
    const summary = Array(16).fill("-");
  
    let option = {
        title: {
            text: "Waterfall"
        },
        // tooltip: {
        //     trigger: "axis",
        //     axisPointer: {
        //         type: "shadow"
        //     },
        //     formatter: function (params) {
        //         let tar;
        //         if (params[1].value !== "-") {
        //             tar = params[1];
        //         } else {
        //             tar = params[0];
        //         }
        //         return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
        //     }
        // },
        legend: {
            data: ["Loss", "Profit"]
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
        },
        xAxis: {
            type: "category",
            splitLine: { show: false },
            data: (function () {
                let list = [];
                for (let i = 0; i < profitLoss.length; i++) {
                    list.push(profitLoss[i]["subcategory"]);
                }
                return list;
            })()
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                // name: "Placeholder",
                type: "bar",
                stack: "Total",
                itemStyle: {
                    borderColor: "transparent",
                    color: "transparent"
                },
                emphasis: {
                    itemStyle: {
                        borderColor: "transparent",
                        color: "transparent"
                    }
                },
                data: placeholder
            },
            {
                name: "Profit",
                type: "bar",
                stack: "Total",
                label: {
                    show: true,
                    position: "top"
                },
                itemStyle: {
                    color: "#b7e8ac"
                },
                data: profitData
            },
            {
                name: "Loss",
                type: "bar",
                stack: "Total",
                label: {
                    show: true,
                    position: "bottom"
                },
                itemStyle: {
                    color: "#e8acb3"
                },
                data: lossData
            },
            {
                name: "Summary",
                type: "bar",
                stack: "all",
                data: [...summary, net],
                itemStyle: {
                    color: "#accfe8"
                }
            }
        ]
    };
    return (
        <ReactEcharts option={option}
            style={{ height: "90vh", maxWidth: "80rem" }} />
    )


}

export default AlphaaChart