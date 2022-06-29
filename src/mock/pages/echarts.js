const areaChartOptions = {
  toolbox: {
    feature: {
      saveAsImage: {},
      dataView: {},
      restore: {}
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: [
      'Email marketing',
      'Affiliate advertising',
      'Video advertising',
      'Direct access',
      'Search engine'
    ],
    bottom: 10
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    top: '5%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ]
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Email marketing',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Affiliate Advertising',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video ads',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct access',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
}
const barChartOptions = {
  legend: {
    bottom: 10
  },
  toolbox: {
    feature: {
      saveAsImage: {},
      dataView: {},
      restore: {}
    }
  },
  tooltip: {},
  dataset: {
    source: [
      ['product', '2015', '2016', '2017'],
      ['Matcha Latte', 43.3, 85.8, 93.7],
      ['Milk Tea', 83.1, 73.4, 55.1],
      ['Cheese Cocoa', 86.4, 65.2, 82.5],
      ['Walnut Brownie', 72.4, 53.9, 39.1]
    ]
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '20%',
    top: '5%',
    containLabel: true
  },
  xAxis: { type: 'category' },
  yAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
}
const boxChartOptions = {
  title: [
    {
      text: 'Upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR',
      borderColor: '#999',
      // borderWidth: 1,
      textStyle: {
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 20
      },
      left: '10%',
      top: '90%'
    }
  ],
  toolbox: {
    feature: {
      saveAsImage: {},
      dataView: {},
      restore: {}
    }
  },
  dataset: [
    {
      source: [
        [
          850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930,
          650, 760, 810, 1000, 1000, 960, 960
        ],
        [
          960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880,
          880, 830, 800, 790, 760, 800
        ],
        [
          880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870,
          840, 840, 850, 840, 840, 840
        ],
        [
          890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860,
          880, 720, 840, 850, 850, 780
        ],
        [
          890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740,
          810, 940, 950, 800, 810, 870
        ]
      ]
    },
    {
      transform: {
        type: 'boxplot',
        config: { itemNameFormatter: 'expr {value}' }
      }
    },
    {
      fromDatasetIndex: 1,
      fromTransformResult: 1
    }
  ],
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '20%',
    top: '5%'
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    nameGap: 30,
    splitArea: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    name: 'km/s minus 299,000',
    splitArea: {
      show: true
    }
  },
  series: [
    {
      name: 'boxplot',
      type: 'boxplot',
      datasetIndex: 1
    },
    {
      name: 'outlier',
      type: 'scatter',
      datasetIndex: 2
    }
  ]
}
// const dottedBarChartOptions = {
//   toolbox: {
//     feature: {
//       saveAsImage: {},
//       dataView: {},
//       restore: {}
//     }
//   },
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'shadow'
//     }
//   },
//   legend: {
//     data: ['line', 'bar'],
//     textStyle: {
//       color: '#ccc'
//     },
//     bottom: 10,
//     top: '2%'
//   },
//   xAxis: {
//     data: category,
//     axisLine: {
//       lineStyle: {
//         color: '#ccc'
//       }
//     }
//   },
//   yAxis: {
//     splitLine: { show: false },
//     axisLine: {
//       lineStyle: {
//         color: '#ccc'
//       }
//     }
//   },
//   series: [
//     {
//       name: 'line',
//       type: 'line',
//       smooth: true,
//       showAllSymbol: true,
//       symbol: 'emptyCircle',
//       symbolSize: 15,
//       data: lineData
//     },
//     {
//       name: 'bar',
//       type: 'bar',
//       barWidth: 10,
//       itemStyle: {
//         barBorderRadius: 5,
//         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//           { offset: 0, color: '#14c8d4' },
//           { offset: 1, color: '#43eec6' }
//         ])
//       },
//       data: barData
//     },
//     {
//       name: 'line',
//       type: 'bar',
//       barGap: '-100%',
//       barWidth: 10,
//       itemStyle: {
//         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//           { offset: 0, color: 'rgba(20,200,212,0.5)' },
//           { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
//           { offset: 1, color: 'rgba(20,200,212,0)' }
//         ])
//       },
//       z: -12,
//       data: lineData
//     },
//     {
//       name: 'dotted',
//       type: 'pictorialBar',
//       symbol: 'rect',
//       itemStyle: {
//         color: '#0f375f'
//       },
//       symbolRepeat: true,
//       symbolSize: [12, 4],
//       symbolMargin: 1,
//       z: -10,
//       data: lineData
//     }
//   ]
// }
const guageChartOptions = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  series: [
    {
      name: 'Pressure',
      type: 'gauge',
      progress: {
        show: true
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}'
      },
      data: [
        {
          value: 50,
          name: 'SCORE'
        }
      ]
    }
  ]
}
const linkChartOptions = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  series: [
    {
      name: 'Pressure',
      type: 'gauge',
      progress: {
        show: true
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}'
      },
      data: [
        {
          value: 50,
          name: 'SCORE'
        }
      ]
    }
  ]
}
const scatterChartOptions = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  series: [
    {
      name: 'Pressure',
      type: 'gauge',
      progress: {
        show: true
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}'
      },
      data: [
        {
          value: 50,
          name: 'SCORE'
        }
      ]
    }
  ]
}
const pieChartOptions = {
  color: ['orange', 'cyan', 'pink', 'green', 'blue'],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    top: 'bottom',
    bottom: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access source',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '35%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct access' },
        { value: 580, name: 'Email marketing' },
        { value: 484, name: 'Affiliate Advertising' },
        { value: 300, name: 'Video ad' }
      ]
    }
  ]
}
export default {
  areaChartOptions,
  barChartOptions,
  boxChartOptions,
  // dottedBarChartOptions,
  guageChartOptions,
  linkChartOptions,
  scatterChartOptions,
  pieChartOptions
}
