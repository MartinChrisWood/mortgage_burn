// TOFIX - hoverColumn and line_fill arguments not working as desired

function fetchMortgageParameters() {
  // Retrieves the mortgage details from the form in the page
  var mortgage = new FormData(document.getElementById("input_form"));
  var deets = {};
  for(var pair of mortgage.entries()) {
    deets[pair[0]] = pair[1];
  };
  return deets;
}

function calculateMonthlyPayments(mortgage) {
  // Calculates the assumed monthly payment amount
  monthly_interest = mortgage['annual_interest_rate'] / 12.0 / 100.0;
  principal = mortgage['property_cost'] - mortgage['deposit'];
  n_payments = mortgage['years'] * 12.0;

  monthly_payment = (monthly_interest * principal) /
                    (1.0 - ((1.0 + monthly_interest) ** -n_payments));

  return monthly_payment;
}

function tabulatePayments(mortgage) {
  // Generate a monthly table of our what's paid to where
  // Need to record month, payment, payment of interest, payment of principal, remaining to-pay and principal
  monthly_payment = calculateMonthlyPayments(mortgage);
  n_payments = mortgage['years'] * 12.0;

  var df = [];
  remaining_principal = mortgage['property_cost'] - mortgage['deposit'];
  remaining_total = n_payments * monthly_payment;
  for(let i = 0; i < n_payments; i++) {

    // Calculate the payment components
    interest_component = (mortgage['annual_interest_rate'] / 12.0 / 100.0) * remaining_principal;
    principal_component = monthly_payment - interest_component;
    remaining_principal = remaining_principal - principal_component;
    remaining_total = remaining_total - monthly_payment;

    // Record that month
    //of_which_interest: interest_component.toFixed(2),
    //of_which_principal: principal_component.toFixed(2),
    df.push({month: i+1,
             payment_amount: monthly_payment.toFixed(2),
             payments_made: ((i+1.0) * monthly_payment).toFixed(2),
             of_which_principal: principal_component.toFixed(2),
             of_which_interest: interest_component.toFixed(2),
             remaining_principal: remaining_principal.toFixed(2),
             remaining_total: remaining_total.toFixed(2)})
  }
  // Add metadata, column names
  df.columns = Object.keys(df[0]);
  return df;
}

function plotPlan(df) {
  trace_array = createTraces(df,
                             seriesColumns=["remaining_total", "remaining_principal"],
                             xColumn="month",
                             hoverColumn="of_which_interest");
  // Add title/aesthetics/labels
  var layout = {title: "How much remains to pay"};
  // Behaviours
  var config = {responsive: true};
  Plotly.newPlot("plan_plot", trace_array, layout, config);
}

function plotPayments(df) {
  trace_array = createTraces(df,
                             seriesColumns=["payment_amount", "of_which_principal", "of_which_interest"],
                             xColumn="month",
                             hoverColumn="month",
                             lineFill=true);
  // Add title/aesthetics/labels
  var layout = {title: "How your monthly payments divide"};
  // Behaviours
  var config = {responsive: true};
  Plotly.newPlot("pay_plot", trace_array, layout, config);
}

function main() {
  // Primary, called from user button-click
  mortgage = fetchMortgageParameters();
  df = tabulatePayments(mortgage);
  plotPayments(df);
  plotPlan(df);
  // document.getElementById("calc_space").innerHTML = prettifyTable(df);
}

main()
