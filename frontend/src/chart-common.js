export const MAP_URL = "https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWJvdWNoYXVkIiwiYSI6ImNpdTA5bWw1azAyZDIyeXBqOWkxOGJ1dnkifQ.qha33VjEDTqcHQbibgHw3w";

export function getBarChartOptions (seriesName, keys, values) {
  return {
    backgroundColor: '#fff',
    tooltip: {
        trigger: 'item'
    },
    grid: {
        left: 300
    },
    legend: {borderRadius: 6},
    xAxis: {
        show: false
    },
    yAxis: {
        data: keys,
        axisTick : {
            show: false
        }
    },
    series: [{
        color: ['#209cee'],
        name: seriesName,
        type: 'bar',
        showSymbol: true,
        data: values,
        label: {
            show: true,
            position: 'insideRight',
            fontWeight: 'bold'
        }
    }]
}
}