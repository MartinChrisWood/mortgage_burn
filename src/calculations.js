var Mortgage = {
  deposit: 10000.0,                   // Initial deposit
  years: 30,                          // Years over which mortgage is repaid
  property_cost: 210000.0,
  annual_interest_rate: 3.5,          // Interest rate is a %
  annual_homeowner_insurance: 800,    // additional cost of homeowner's insurance
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
  // Need to record month, payment, payment of interest, payment of principal, total
  var df = {
    month: [],
    payment: [],
    of_which_interest: [],
    of_which_principal: [],
    remaining_principal: [],
    remaining_total: []
  }
  monthly_payment = calculateMonthlyPayments(mortgage);
  n_payments = mortgage['years'] * 12.0;
  remaining_principal = mortgage['property_cost'] - mortgage['deposit'];
  remaining_total = n_payments * monthly_payment;

  for(let i = 0; i < n_payments; i++) {
    // Calculate the payment components
    interest_component = (mortgage['annual_interest_rate'] / 12.0 / 100.0) * remaining_principal;
    principal_component = monthly_payment - interest_component;

    remaining_principal = remaining_principal - principal_component;
    remaining_total = remaining_total - monthly_payment;

    // Record that month
    df['month'].push(i+1);
    df['payment'].push(monthly_payment.toFixed(2));
    df['of_which_interest'].push(interest_component.toFixed(2));
    df['of_which_principal'].push(principal_component.toFixed(2));
    df['remaining_principal'].push(remaining_principal.toFixed(2));
    df['remaining_total'].push(remaining_total.toFixed(2));
  }
  return df;
}

df = tabulatePayments(Mortgage);
document.getElementById("calc_space").innerHTML = prettifyTable(df);
