// Use d3 to select the ID in HTMl 'selDataset'
var filter = d3.select("#selDataset"); 
// Default for Test Subject ID 
var TestID = "940"
// Function to render the changes by user drop-down
function optChange(sample) {
    TestID = sample;
    console.log(TestID);
    //renderProcess();
};
// displays on refresh everytime
renderProcess();

function renderProcess(){ 
    d3.html('');
    d3.json("./data/samples.json").then((data) => {
        // Variable to store the samples array 
        var samples = data.samples;
        
        //Variable to store the metadata array
        var metadata = data.metadata;
        
        // Fetches the data for dropdown bar
        var valueDrop = samples.map(item => item.id)
        .filter((value, index, self) => self.indexOf(value) === index);
    
        // Creates drop down with all the before values fetched
        valueDrop.forEach(function (values) {
            filter.append('option').text(values);
        });

        // Fetches the samples for the user's selection
        var resultArray = samples.filter(sampleObj => sampleObj.id == TestID);
        console.log(resultArray);

        // Puts the first sample into the result variable 
        var result = resultArray[0];

        // gathers variables that hold the chart value parts
        var otu_ids = result.otu_ids;
        var samp_val = result.sample_values;
        var otu_lab = result.otu_labels;

        // reformats the x, y ticks and labels for the bar chart in decending order and adds the OTU to the y ticks

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var xticks = samp_val.slice(0, 10).reverse();
        var labels = otu_lab.slice(0, 10).reverse();

        console.log(yticks);
        console.log(xticks);
        console.log(labels);

        var trace1 = {
            x: xticks,
            y: yticks,
            text: labels,
            orientation: 'h',
            type: 'bar'
        };

        var data = [trace1] 

        var layout = {
            title: 'top 10 OTUs Found'
        };
        
        Plotly.newPlot('bar', data, layout);


      