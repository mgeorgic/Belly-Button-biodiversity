// Initiate the function for the metadata panel
// d3.json to grab the metadata for a sample
// d3 to select the id '#selDataset' in the index.html
var data;
function init() {
    d3.json("data/samples.json").then(starterData =>{
        data = starterData;
        var uservalues = starterData.names;
        var userSelect = d3.select("#selDataset");
        uservalues.forEach(value => {
            userSelect
                .append("option")
                .text(value)
                .attr("value", function(){
                    return value;
                });
        });
    });
}
// initate the function to fill values for user's selection
init();

// Use d3 to grab the dataset selected and change it upon user's selection
d3.selectAll("#selDataset").on("change", plotFunctions);

// Create the plot function and where to grab the values for each plot
function plotFunctions() {
    var valueReturn = d3.select("#selDataset").node().value;
    demoFunct(valueReturn);
    panelgraph(valueReturn);
    demoFunct(valueReturn);
    bubbleGraph(valueReturn);
    gaugeGraph(valueReturn);
}

// Create demographic map where only top ten are returned
// for id, otu_id, sample_values, otu_labels
function demoFunct(valueReturn) {
    var filterID = data.samples.filter(value => value.id == valueReturn);
    var otuID = filterID.map(val => val.otu_ids);
    otuID = treatotuID(otuID[0].slice(0,10));
    var sampleVal = filterID.map(val => val.sample_values);
    sampleVal= sampleVal[0].slice(1,10);

    var output_name = filterID.map(val => val.otu_labels);
    var names = treatbacteriaName(output_name[0]).slice(0,10);
    console.log(otuID);
    console.log(sampleVal);
    console.log(output_name)
    console.log(names);

    //Create the trace in order to add to bar plot containing sample values and outID's
    var trace = {
        x: sampleVal,
        y: otuID,
        text: names,
        type: "bar",
        orientation: 'h'
    };

    var layout = {
        yaxis: {autorange:"reversed"}
    };

    // Make an array to plot the data into trace and layout
    var samVal = [trace];
    Plotly.newPlot("bar", samVal, layout);
}

// Build metadata value chart for the Test Subject ID
// Append to the list starting at zero index
function panelgraph(valueReturn) {
    var filterVal = data.metadata.filter(value => value.id == valueReturn);
        
    var panelValues = d3.select("#sample-metadata");
    panelValues.html("");
    panelValues.append("p").text('id: ${filterVal[0].id}');
    panelValues.append("p").text('ethnicity: ${filterVal[0].ethnicity}');
    panelValues.append("p").text('gender: ${filterVal[0].gender}');
    panelValues.append("p").text('age: ${filterVal[0].age}');
    panelValues.append("p").text('location: ${filterVal[0].location}');
    panelValues.append("p").text('bbqtype: ${filterVal[0].bbqtype}');
    panelValues.append("p").text('wfreq: ${filterVal[0].wfreq}');
    }
