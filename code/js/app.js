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

        // Variables for the chart values 
        var otu_ids = result.otu_ids;
        var samp_val = result.sample_values;
        var otu_lab = result.otu_labels;

        // Reformats the x, y ticks and labels in decending order and adds the OTU to the y ticks

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU_ID ${otuID}`).reverse();
        var xticks = samp_val.slice(0, 10).reverse();
        var labels = otu_lab.slice(0, 10).reverse();

        //console.log(yticks);
        //console.log(xticks);
        //console.log(labels);

        var trace1 = {
            x: xticks,
            y: yticks,
            text: labels,
            orientation: 'h',
            type: 'bar'
        };

        var data = [trace1] 

        var layout = {
            title: 'Top Ten OTUs Present in all Belly Button Samples'
        };
        
        Plotly.newPlot('bar', data, layout);

  // Bubble Chart 

        // Variables to fetch the chart's data
        var bubbleX = otu_ids.slice(0, 10);
        bubbleX.push.apply(bubbleX, otu_ids.slice(Math.max(otu_ids.length)));

        var bubbleY = samp_val.slice(0, 10);
        bubbleY.push.apply(bubbleY, samp_val.slice(Math.max(samp_val.length)));

        var bubblelab = otu_lab.slice(0, 10);
        bubblelab.push.apply(bubblelab, otu_lab.slice(Math.max(otu_lab.length)));

        //console.log(xticksbub);
        //console.log(labelsbub);
        //console.log(yticksbub);

        // plots data
        var trace1 = {
            x: bubbleX,
            y: bubbleY,
            mode: 'markers',
            marker: {
              color: bubbleX,  
              size: bubbleY,
              colorscale: "Earth"
            },
            text: bubblelab
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'Entire OTU Sample Population',
            xaxis: {
                title: "OTU-ID"
            },
            showlegend: false,
            height: 700,
            width: 1300
          };
          
          Plotly.newPlot('bubble', data, layout);

        // Demographic Chart

        // Fetches the metadata by user's input
        var resultArray2 = metadata.filter(metaObj => metaObj.id == TestID);

        console.log(resultArray2);

        var result2 = resultArray2[0];

        // Parses out all demos into variables

        var age = result2.age;
        var bbtype = result2.bbtype;
        var ethnicity = result2.ethnicity;
        var gender = result2.gender;
        var id = result2.id;
        var location = result2.location;
        var wfreq = result2.wfreq;

        // Key and value formatting
        // place the key and value in the HTML at the correct id
        var demoinfo = ` id: ${id} <br> ethnicity: ${ethnicity} <br> gender: ${gender} <br> age: ${age} <br> location: ${location} <br> bbtype: ${bbtype} <br> wfreq: ${wfreq}`
        document.getElementById('sample-metadata').innerHTML = demoinfo;

