function unpack(rows, key) {
  // Utility, unpack an array of lists to a single array
  return rows.map(function(row) {return row[key]; });
}

function prettifyTable(df) {
  // Convenience function essentially for printing out my tables to QA
  strout = "<br />" + df.columns.join(", ") + "<br />";   // Column names
  df.map(function(row) {strout = strout + Object.values(row).join(", ") + "<br />"});  // Row values
  return strout;
}

function createTraces(data, xColumn="date", traceType="scatter") {
  // Utility, unpacks a data structure into an array of trace objects for
  // use with plotly
  var columnNames = data['columns'];
  var traces = [];

  for(let i = 0; i < columnNames.length; i++) {
    var name = columnNames[i];
    if(name == xColumn) {continue; }
    trace = {
      name: name,
      type: traceType,
      x: unpack(data, xColumn),
      y: unpack(data, name)
    }
    if (name.includes("smoothed") == false) {
      trace['visible'] = "legendonly";
    }
    traces.push(trace);
  }
  return traces;
}

var Mortgage = {
  deposit: 10000.0,                   // Initial deposit
  years: 30,                          // Years over which mortgage is repaid
  property_cost: 210000.0,
  annual_interest_rate: 3.5,          // Interest rate is a %
  annual_homeowner_insurance: 800,    // additional cost of homeowner's insurance
}
