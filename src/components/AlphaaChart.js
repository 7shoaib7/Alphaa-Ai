import ReactEcharts from "echarts-for-react";



const AlphaaChart = ({ profitLoss, profitData, lossData, placeholder }) => {
    const totalProfit = profitData.filter(item => item !== "-").reduce((tot, item) => tot + Number(item), 0);
    const totalLoss = lossData.filter(item => item !== "-").reduce((tot, item) => tot + Number(item), 0);
    const netTotal = totalProfit - totalLoss;
    const summary = Array(placeholder.length).fill("-");
  
    let option = {
        title: {
            text: "Waterfall"
        },
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
                list.push("total")
                return list;
            })()
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                name: "Placeholder",
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
                data: [...placeholder]
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
                data: [...profitData]
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
                data: [...lossData]
            },
            {
                name: "Summary",
                type: "bar",
                stack: "all",
                label: {
                    show: true,
                    position: "top"
                },
                data: [...summary, netTotal],
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