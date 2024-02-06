// Trace1 for the Belly Button Biodiversity
let mainData = [];
d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json')
    .then(function (data) {
        mainData = data;
        init(data);
});

function init(data){
    let testSubjetId = 940;
    let dropdownMenu = d3.select("#selDataset");

    for (let i = 0; i < data.samples.length; i++) {
        const sample = data.samples[i];
        dropdownMenu.insert("option").property("value", sample.id).text(sample.id);
    }

    optionChanged(testSubjetId);
}

function optionChanged(testSubjetId){
    let samples = mainData.samples;
    let finalSample = null;
    let finalMetadata = null;

    for (let i = 0; i < samples.length; i++) {
        const sample = samples[i];
        if (sample.id == testSubjetId) {
            finalSample = sample;
            break;
        }
    }

    for (let i = 0; i < mainData.metadata.length; i++) {
        const meta = mainData.metadata[i];
        if (meta.id == testSubjetId) {
            finalMetadata = meta;
            break;
        }
    }


    plotBar(finalSample);
    plotBubble(finalSample);
    showDemographicInfo(finalMetadata)
    plotGauge(finalMetadata)
}
function plotBar(sample) {
    console.log(sample.otu_ids.slice(0, 10));
    let bellyButtonBar = {
        x: sample.sample_values.slice(0, 10),
        y: sample.otu_ids.slice(0, 10).map(e => `OTU ${e}`),
        text: sample.otu_labels.slice(0, 10),
        type: "bar",
        orientation: "h"
    };

    // Data array
    let barData = [bellyButtonBar];

    // Apply a title to the layout
    let barLayout = {
        yaxis: {
            autorange: 'reversed'
        },
        margin: {
            l: 150,
            r: 150,
            t: 30,
            b: 30
        }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", barData, barLayout);
}

function plotBubble(sample) {
    let bubble = {
        x: sample.otu_ids,
        y: sample.sample_values,
        mode: 'markers',
        marker: {
            size: sample.sample_values,
            color: sample.otu_ids,
            colorscale: "Earth"
        }
    };

    let data = [bubble];

    let layout = {
        title: 'OTU ID',
        showlegend: false,
        height: 600,
        width: 1200
    };

    Plotly.newPlot('bubble', data, layout);

}

function showDemographicInfo(metadata) {
    let sampleMetadata = d3.select('#sample-metadata');
    sampleMetadata.selectAll("*").remove();
    sampleMetadata.insert("p").text(`id: ${metadata.id}`);
    sampleMetadata.insert("p").text(`ethnicity: ${metadata.ethnicity}`);
    sampleMetadata.insert("p").text(`gender: ${metadata.gender}`);
    sampleMetadata.insert("p").text(`age: ${metadata.age}`);
    sampleMetadata.insert("p").text(`location:${metadata.location}`);
    sampleMetadata.insert("p").text(`bbtype: ${metadata.bbtype}`);
    sampleMetadata.insert("p").text(`wfreq: ${metadata.wfreq}`);
}

function plotGauge(metadata) {
    var gauge = [{
        value: metadata.wfreq,
        type: "indicator",
        mode: "gauge+number",
        title: { text: "<b> Belly Button Washing Frequency </b> <br></br> Scrubs Per Week" },
        gauge: {
            axis: { range: [null, 9], dtick: "2" },

            steps: [
                { range: [0, 1], color: "rgb(238, 232, 233)" },
                { range: [1, 2], color: "rgb(243, 240, 229)" },
                { range: [2, 3], color: "rgb(233, 230, 202)" },
                { range: [3, 4], color: "rgb(229, 233, 177)" },
                { range: [4, 5], color: "rgb(213, 229, 149)" },
                { range: [5, 6], color: "rgb(183, 206, 141)" },
                { range: [6, 7], color: "rgb(136, 192, 127)" },
                { range: [7, 8], color: "rgb(133, 188, 139)" },
                { range: [8, 9], color: "rgb(128, 181, 135)" }
            ],
            dtick: 2
        }
    }];

    // 5. Create the layout for the gauge chart.
    var layout = {
        automargin: true
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gauge, layout)
}