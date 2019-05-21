import {HTTP} from '../http-common'

export default function getChartData () {
    return HTTP
    .get('stops-most-routes')
    .then(response => {
      let data = response.data;
      data = data.sort((a,b) => a.number_of_routes - b.number_of_routes);
      const values = data.map(i => i.number_of_routes);
      const keys = data.map(i => i.stop_name);

        return {
            tooltip: {
                trigger: 'item'
            },
            grid: {
                left: 250
            },
            legend: {},
            xAxis: {},
            yAxis: {data: keys},
            series: [{
                color: ['#209cee'],
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
  