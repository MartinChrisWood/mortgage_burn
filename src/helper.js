function prettifyTable(df) {
  // Convenience function essentially for printing out my tables to QA
  keys = Object.keys(df);
  nrows = df[keys[0]].length;
  strout = "<br />" + keys.join(", ") + "<br />";
  for(let i = 0; i < nrows; i++) {
    values = [];
    keys.forEach(key => values.push(df[key][i].toString()));
    strout = strout + values.join(", ") + "<br />";
  }
  return strout;
}
