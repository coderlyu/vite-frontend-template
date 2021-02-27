export default {
  pie: function (data) {
    let options = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '人群特征',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '12 ~ 16岁' },
            { value: 735, name: '16 ~ 18岁' },
            { value: 580, name: '18 ~ 30岁' },
            { value: 484, name: '30岁 ~' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    return options
  },
  line: function (data) {
    let options = {
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      },
      {
        data: [80, 92, 91, 94, 190, 130, 120],
        type: 'line',
        smooth: true
      }]
    };
    return options
  },
  bar: function (data) {
    let options = {
      xAxis: {
        type: 'category',
        data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }]
    }
    return options
  }
}