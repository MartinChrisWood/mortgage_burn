function unpack(rows, key) {
  // Utility, unpack an array of lists to a single array
  return rows.map(function(row) {return row[key]; });
}

function subset(df, columns) {
  //Utility, select
}

function prettifyTable(df) {
  // Convenience function essentially for printing out my tables to QA
  strout = "<br />" + df.columns.join(", ") + "<br />";   // Column names
  df.map(function(row) {strout = strout + Object.values(row).join(", ") + "<br />"});  // Row values
  return strout;
}

function createTraces(data, seriesColumns, xColumn="date", hoverColumn=null, traceType="scatter", lineFill=false) {
  // Utility, unpacks a data structure into an array of trace objects for
  // use with plotly
  var traces = [];

  for(let i = 0; i < seriesColumns.length; i++) {
    var name = seriesColumns[i];
    // Sanity check columns are not x axis or hover text
    if(name == xColumn) {continue; }
    if(name == hoverColumn) {continue; }
    trace = {
      name: name,
      type: traceType,
      x: unpack(data, xColumn),
      y: unpack(data, name)
    }
    // Optional fill
    if (lineFill == true) {
      console.log("here");
      trace['fill'] = 'tonexty';
    }
    // Optional hovertext column
    if (!hoverColumn == false) {
      trace['text'] = unpack(data, hoverColumn).map(element => element.toString() + " " + hoverColumn);
    }
    traces.push(trace);
  }
  return traces;
}
