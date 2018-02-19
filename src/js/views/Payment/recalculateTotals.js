//
//
export const recalculateTotals = function(who, data, amount){
    // do things here to manipulate view

    let dp = data.downpayment;
    let mp = data.payments;
    let m = data.months;
    let maxMonths = data.maxMonths;
    let total = data.costTotal;
    //let maxCost = this.state.maxCost;
    let maxPayments = data.maxPayments;
    let adjTotal = 0;
    let adjMP = 0;

    switch( who ){
      case "dp":
        this.setState({ downpayment: amount });
        adjTotal = total - amount;
        adjMP = Math.round(adjTotal / m);
        if( mp >= maxPayments){
          //m = Math.round( maxCost - (dp / maxPayments) );
          m = Math.round( (adjTotal / mp) - m );
        }
        break;

      case "mp":
        this.setState({ payments: amount });
        adjTotal = total;
        adjMP = amount;
        
        if( m <= maxMonths ){
          m = Math.round(total / amount);
        } else {
          dp = total - (maxMonths * amount)
        }
        break;

      case "m":
        this.setState({ months: amount });
        if( mp > maxPayments ){
          dp = total - (amount * maxPayments);
        }
          adjTotal = total - dp;
          adjMP = Math.round(adjTotal / amount);
        break;

      case "total":
        this.setState({ costTotal: amount });
        adjTotal = amount - dp;
        adjMP = Math.round(adjTotal / m);
        break;

      default:
        adjTotal = 0;
        adjMP = 0;
        break;
    }
    
    let totalsObject = {
      downpayment: dp,
      payments: adjMP,
      months: m,
      costTotal: adjTotal
    };

    return totalsObject;
};