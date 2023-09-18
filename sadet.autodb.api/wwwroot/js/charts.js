/*
*/
class Charts {
    createChart(obj, dataset) {
        const labels = [];
        for (let i = 0; i < dataset.data.length; ++i) {
            labels.push(i.toString());
        }
        const config = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [dataset]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Line Chart'
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Value'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            },
        };
        return new Chart(obj, config);
    }
}