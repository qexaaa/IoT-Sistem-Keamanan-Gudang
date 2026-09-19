const ctx = document.getElementById("motionChart");

const motionChart = new Chart(ctx, {

    type: "line",

    data: {

        labels: [],

        datasets: [{

            label: "Jarak Objek",

            data: [],

            borderColor: "#2563eb",
            backgroundColor: "#2563eb",

            borderWidth: 2,

            pointRadius: 5,
            pointHoverRadius: 7,

            tension: 0.3,

            fill: false

        }]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {
                display: false
            }

        },

        scales: {

            x: {

                title: {

                    display: true,
                    text: "Waktu Deteksi"

                }

            },

            y: {

                beginAtZero: true,

                title: {

                    display: true,
                    text: "Jarak (cm)"

                }

            }

        }

    }

});