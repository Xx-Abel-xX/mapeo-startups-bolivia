document.addEventListener('DOMContentLoaded', () => {

    const data = {
        "ecosistema_bolivia_2024": {
            "metricas_generales": {
                "total_startups": 167,
                "evolucion_startups": {
                    "2019": 152,
                    "2020": 160,
                    "2021": 155,
                    "2022": 185,
                    "2023": 147,
                    "2024": 167
                }
            },
            "distribucion_geografica": {
                "santa_cruz": { "startups": 69, "porcentaje": 41 },
                "la_paz": { "startups": 60, "porcentaje": 36 },
                "cochabamba": { "startups": 26, "porcentaje": 16 },
                "otros_departamentos": { "startups": 12, "porcentaje": 7 }
            },
            "distribucion_por_vertical": [
                { "nombre": "Fintech", "porcentaje_2024": 32, "porcentaje_2023": 30 },
                { "nombre": "SaaS", "porcentaje_2024": 22, "porcentaje_2023": 11 },
                { "nombre": "EdTech", "porcentaje_2024": 16, "porcentaje_2023": 14 },
                { "nombre": "eCommerce & Marketplace", "porcentaje_2024": 8, "porcentaje_2023": 14 },
                { "nombre": "Healthtech", "porcentaje_2024": 6, "porcentaje_2023": 6 },
                { "nombre": "Mobility-tech & Logistics", "porcentaje_2024": 4, "porcentaje_2023": 6 },
                { "nombre": "Agrotech", "porcentaje_2024": 2, "porcentaje_2023": 3 },
                { "nombre": "Otras", "porcentaje_2024": 10, "porcentaje_2023": 16 }
            ],
            "modelo_de_negocio": { "B2B": 55, "B2C": 41, "B2G": 4 },
            "financiamiento": {
                "fuentes": {
                    "Recursos Propios": 65,
                    "Familiares/Amigos": 31,
                    "Inversionistas Ángeles": 18,
                    "Venture Capital": 12,
                    "Gobierno/Cooperación": 14
                }
            },
            "talento_y_equipos": {
                "tamanio_equipos": {
                    "1-5 personas": 51,
                    "6-10 personas": 29,
                    "11-20 personas": 10,
                    "21-50 personas": 6,
                    "+50 personas": 4
                }
            },
            "benchmark_oportunidades": [
                { "vertical": "Fintech & SaaS", "potencia": "Muy Alta", "valor": 100 },
                { "vertical": "Mobility, Logistics & Agrotech", "potencia": "Alta", "valor": 75 },
                { "vertical": "EdTech & HealthTech", "potencia": "Media", "valor": 50 }
            ]
        }
    };

    const chartData = data.ecosistema_bolivia_2024;
    const primaryColor = '#007bff';
    const secondaryColor = '#6c757d';
    const colorPalette = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#17a2b8', '#6c757d', '#fd7e14', '#6610f2'];

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y + '%';
                        }
                        return label;
                    }
                }
            }
        }
    };

    // 1. Evolución de Startups
    new Chart(document.getElementById('evolucionChart'), {
        type: 'line',
        data: {
            labels: Object.keys(chartData.metricas_generales.evolucion_startups),
            datasets: [{
                label: 'N° de Startups',
                data: Object.values(chartData.metricas_generales.evolucion_startups),
                borderColor: primaryColor,
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: { ...chartOptions, plugins: { legend: { display: false } } }
    });

    // 2. Distribución Geográfica
    new Chart(document.getElementById('distribucionGeograficaChart'), {
        type: 'doughnut',
        data: {
            labels: Object.keys(chartData.distribucion_geografica).map(k => k.replace('_', ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase())),
            datasets: [{
                label: 'Porcentaje',
                data: Object.values(chartData.distribucion_geografica).map(v => v.porcentaje),
                backgroundColor: colorPalette,
            }]
        },
        options: { ...chartOptions, plugins: { legend: { position: 'right'} } }
    });

    // 3. Modelo de Negocio
    new Chart(document.getElementById('modeloNegocioChart'), {
        type: 'pie',
        data: {
            labels: Object.keys(chartData.modelo_de_negocio),
            datasets: [{
                label: 'Porcentaje',
                data: Object.values(chartData.modelo_de_negocio),
                backgroundColor: [colorPalette[0], colorPalette[1], colorPalette[2]],
            }]
        },
        options: { ...chartOptions, plugins: { legend: { position: 'right'} } }
    });

    // 4. Distribución por Vertical
    new Chart(document.getElementById('distribucionVerticalChart'), {
        type: 'bar',
        data: {
            labels: chartData.distribucion_por_vertical.map(v => v.nombre),
            datasets: [
                {
                    label: '2023',
                    data: chartData.distribucion_por_vertical.map(v => v.porcentaje_2023),
                    backgroundColor: secondaryColor,
                },
                {
                    label: '2024',
                    data: chartData.distribucion_por_vertical.map(v => v.porcentaje_2024),
                    backgroundColor: primaryColor,
                }
            ]
        },
        options: { ...chartOptions, scales: { y: { beginAtZero: true, ticks: { callback: value => value + '%' } } } }
    });

    // 5. Fuentes de Financiamiento
    new Chart(document.getElementById('financiamientoChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(chartData.financiamiento.fuentes),
            datasets: [{
                label: '% de Startups',
                data: Object.values(chartData.financiamiento.fuentes),
                backgroundColor: colorPalette,
            }]
        },
        options: { ...chartOptions, indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { ticks: { callback: value => value + '%' } } } }
    });

    // 6. Tamaño de Equipos
    new Chart(document.getElementById('talentoChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(chartData.talento_y_equipos.tamanio_equipos),
            datasets: [{
                label: '% de Startups',
                data: Object.values(chartData.talento_y_equipos.tamanio_equipos),
                backgroundColor: primaryColor
            }]
        },
        options: { ...chartOptions, plugins: { legend: { display: false } }, scales: { y: { ticks: { callback: value => value + '%' } } } }
    });

    // --- Conclusion Charts ---

    // 7. Crecimiento SaaS
    const saasData = chartData.distribucion_por_vertical.find(v => v.nombre === 'SaaS');
    new Chart(document.getElementById('saasGrowthChart'), {
        type: 'bar',
        data: {
            labels: ['2023', '2024'],
            datasets: [{
                label: 'Participación de Mercado (%)',
                data: [saasData.porcentaje_2023, saasData.porcentaje_2024],
                backgroundColor: [secondaryColor, primaryColor]
            }]
        },
        options: { ...chartOptions, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { callback: value => value + '%' } } } }
    });

    // 8. Oportunidades
    new Chart(document.getElementById('oportunidadesChart'), {
        type: 'polarArea',
        data: {
            labels: chartData.benchmark_oportunidades.map(b => b.vertical),
            datasets: [{
                label: 'Potencial',
                data: chartData.benchmark_oportunidades.map(b => b.valor),
                backgroundColor: ['rgba(40, 167, 69, 0.7)', 'rgba(255, 193, 7, 0.7)', 'rgba(220, 53, 69, 0.7)']
            }]
        },
        options: { ...chartOptions, plugins: { legend: { position: 'bottom'} } }
    });

    // 9. Eje Central
    const ejeCentralData = {
        'Eje Central (SC, LP, CB)': 93,
        'Resto del País': 7
    };
    new Chart(document.getElementById('ejeCentralChart'), {
        type: 'doughnut',
        data: {
            labels: Object.keys(ejeCentralData),
            datasets: [{
                data: Object.values(ejeCentralData),
                backgroundColor: [primaryColor, secondaryColor]
            }]
        },
        options: { ...chartOptions, plugins: { legend: { position: 'bottom'} } }
    });
});