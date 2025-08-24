document.addEventListener('DOMContentLoaded', function () {
    const data = {
        "ecosistema_bolivia_2024": {
            "metricas_generales": {
                "total_startups": 167,
                "evolucion_startups": { "2019": 152, "2020": 160, "2021": 155, "2022": 185, "2023": 147, "2024": 167 },
                "empleos_directos_estimados": 1500,
                "tasa_supervivencia": "+14%"
            },
            "distribucion_geografica": {
                "santa_cruz": { "startups": 69, "porcentaje": 41 },
                "la_paz": { "startups": 60, "porcentaje": 36 },
                "cochabamba": { "startups": 26, "porcentaje": 16 },
                "otros_departamentos": { "startups": 12, "porcentaje": 7 }
            },
            "distribucion_por_vertical": [
                { "nombre": "Fintech", "porcentaje_2024": 32, "porcentaje_2023": 30, "tendencia": "Alta" },
                { "nombre": "SaaS (Software as a Service)", "porcentaje_2024": 22, "porcentaje_2023": 11, "tendencia": "Crecimiento Explosivo" },
                { "nombre": "EdTech", "porcentaje_2024": 16, "porcentaje_2023": 14, "tendencia": "Estable" },
                { "nombre": "eCommerce & Marketplace", "porcentaje_2024": 8, "porcentaje_2023": 14, "tendencia": "En declive" },
                { "nombre": "Healthtech", "porcentaje_2024": 6, "porcentaje_2023": 6, "tendencia": "Estable" },
                { "nombre": "Mobility-tech & Logistics", "porcentaje_2024": 4, "porcentaje_2023": 6, "tendencia": "Estable" },
                { "nombre": "Agrotech", "porcentaje_2024": 2, "porcentaje_2023": 3, "tendencia": "Estable" },
                { "nombre": "Otras", "porcentaje_2024": 10, "porcentaje_2023": 16, "tendencia": "Estable" }
            ],
            "modelo_de_negocio": { "B2B": 55, "B2C": 41, "B2G": 4 },
            "actores_del_ecosistema": { "inversores_formales": 9, "aceleradoras": 4, "incubadoras": 7, "instituciones_de_apoyo": 35, "comunidades_tecnologicas": 27, "universidades": 25 },
            "benchmark_oportunidades": [
                { "vertical": "Fintech & SaaS", "potencia": "Muy Alta" },
                { "vertical": "Mobility-tech, Logistics & Agrotech", "potencia": "Alta" },
                { "vertical": "EdTech & HealthTech", "potencia": "Media" }
            ]
        }
    };

    const ecosystemData = data.ecosistema_bolivia_2024;

    // Métricas Generales
    document.getElementById('total-startups').textContent = ecosystemData.metricas_generales.total_startups;
    document.getElementById('empleos-directos').textContent = ecosystemData.metricas_generales.empleos_directos_estimados;
    document.getElementById('tasa-supervivencia').textContent = ecosystemData.metricas_generales.tasa_supervivencia;

    // Evolución de Startups
    const evolucionData = ecosystemData.metricas_generales.evolucion_startups;
    const evolucionOptions = {
        chart: { type: 'line', height: 350 },
        series: [{ name: 'Startups', data: Object.values(evolucionData) }],
        xaxis: { categories: Object.keys(evolucionData) },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " startups"
                }
            }
        }
    };
    new ApexCharts(document.querySelector("#evolucion-chart"), evolucionOptions).render();

    // Distribución Geográfica
    const geoData = ecosystemData.distribucion_geografica;
    const geoOptions = {
        chart: { type: 'bar', height: 350 },
        series: [{ name: 'Startups', data: Object.values(geoData).map(d => d.startups) }],
        xaxis: { categories: Object.keys(geoData).map(k => k.replace('_', ' ').toUpperCase()) },
        tooltip: {
            y: {
                formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
                    const percentage = Object.values(geoData)[dataPointIndex].porcentaje;
                    return val + " startups (" + percentage + "%)"
                }
            }
        }
    };
    new ApexCharts(document.querySelector("#distribucion-geografica-chart"), geoOptions).render();

    // Modelo de Negocio
    const modeloData = ecosystemData.modelo_de_negocio;
    const modeloOptions = {
        chart: { type: 'donut', height: 350 },
        series: Object.values(modeloData),
        labels: Object.keys(modeloData),
        tooltip: {
            y: {
                formatter: function(val) {
                    return val + " %"
                }
            }
        }
    };
    new ApexCharts(document.querySelector("#modelo-negocio-chart"), modeloOptions).render();

    // Distribución por Vertical
    const verticalData = ecosystemData.distribucion_por_vertical;
    const verticalOptions = {
        chart: { type: 'treemap', height: 400 },
        series: [{
            data: verticalData.map(v => ({ x: v.nombre, y: v.porcentaje_2024 }))
        }],
        tooltip: {
            custom: function({ series, seriesIndex, dataPointIndex, w }) {
                const vertical = verticalData[dataPointIndex];
                return '<div class="arrow_box">' +
                    '<span><b>' + vertical.nombre + '</b></span>' + 
                    '<p>2024: ' + vertical.porcentaje_2024 + '%</p>' +
                    '<p>2023: ' + vertical.porcentaje_2023 + '%</p>' +
                    '<p>Tendencia: ' + vertical.tendencia + '</p>' +
                    '</div>'
            }
        }
    };
    new ApexCharts(document.querySelector("#distribucion-vertical-chart"), verticalOptions).render();
    
    // Actores del ecosistema
    const actoresData = ecosystemData.actores_del_ecosistema;
    const actoresOptions = {
        chart: { type: 'bar', height: 350 },
        series: [{ name: 'Cantidad', data: Object.values(actoresData) }],
        xaxis: { categories: Object.keys(actoresData).map(k => k.replace('_', ' ').toUpperCase()) },
        plotOptions: {
            bar: {
                horizontal: true
            }
        }
    };
    new ApexCharts(document.querySelector("#actores-ecosistema-chart"), actoresOptions).render();

    // --- GRÁFICOS DE CONCLUSIONES ---

    // 1. Crecimiento de SaaS
    const saasData = ecosystemData.distribucion_por_vertical.find(v => v.nombre.includes('SaaS'));
    const saasGrowthOptions = {
        chart: { type: 'bar', height: 250, sparkline: { enabled: true } },
        series: [{ name: 'Participación', data: [saasData.porcentaje_2023, saasData.porcentaje_2024] }],
        xaxis: { categories: ['2023', '2024'] },
        yaxis: { labels: { formatter: (val) => val + '%' } },
        colors: ['#008FFB', '#00E396'],
        plotOptions: { bar: { columnWidth: '45%' } },
        tooltip: { y: { formatter: (val) => val + '%' } }
    };
    new ApexCharts(document.querySelector("#saas-growth-chart"), saasGrowthOptions).render();

    // 2. Potencial de Inversión
    const potencialData = ecosystemData.benchmark_oportunidades;
    const potencialOptions = {
        chart: { type: 'bar', height: 250 },
        series: [{ name: 'Nivel de Potencial', data: potencialData.map(item => {
            if (item.potencia === 'Muy Alta') return 3;
            if (item.potencia === 'Alta') return 2;
            return 1;
        }).reverse() }],
        xaxis: { categories: potencialData.map(item => item.vertical).reverse() },
        plotOptions: { bar: { horizontal: true, distributed: true } },
        legend: { show: false },
        colors: ['#fca311', '#14213d', '#e5e5e5'],
        tooltip: {
            y: {
                formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
                    return 'Potencial: ' + potencialData.reverse()[dataPointIndex].potencia;
                }
            }
        }
    };
    new ApexCharts(document.querySelector("#potencial-chart"), potencialOptions).render();

    // 3. Concentración Geográfica
    const concentracionOptions = {
        chart: { type: 'donut', height: 250 },
        series: [93, 7],
        labels: ['Eje Troncal (SCZ, LP, CBB)', 'Otros Departamentos'],
        colors: ['#14213d', '#e5e5e5'],
        legend: { position: 'bottom' }
    };
    new ApexCharts(document.querySelector("#concentracion-chart"), concentracionOptions).render();
});
