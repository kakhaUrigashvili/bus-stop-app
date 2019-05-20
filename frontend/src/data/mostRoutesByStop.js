import {HTTP} from '../http-common'

export default function getChartData () {
    return HTTP
    .get('routes-most-stops')
    .then(response => {
      let data = response.data;
      data = data.sort((a,b) => a.number_of_stops - b.number_of_stops);
      const values = data.map(i => i.number_of_stops);
      const keys = data.map(i => `Route # : ${i.route}`);

        return {
            title: 
            {
                text: 'Top 10 Routes by # of Stops',
                x: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {},
            xAxis: {},
            yAxis: {data: keys},
            series: [{
                color: ['#157d90'],
                name: 'Routes',
                type: 'bar',
                showSymbol: true,
                data: values,
                label: {
                    show: true,
                    position: 'right'
                }
            }]
        }
    })
  }
  