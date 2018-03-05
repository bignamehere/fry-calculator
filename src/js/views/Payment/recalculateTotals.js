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

    
    // DP = Investment - (MP * M)


    recalculateTotals(who, amount){
        // do things here to manipulate view
        console.log( "recalculateTotals " + who );
    
        let skip = false;
        let dp = this.state.downpayment;
        let mp = this.state.payments;
        let m = this.state.months;
        let investment = this.props.investment;
        //
        let maxDownPayment = this.props.investment;
        let maxPayments = this.state.maxPayments;
        let maxMonths = this.state.maxMonths;
        //
        let minDownPayment = this.state.minDownPayment;
        let minPayments = this.state.minPayments;
        let minMonths = this.state.minMonths;
        //
        let amountOwed = 0;
        let adjMP = 0;
        //
        let dpLocked = this.state.dpKnobLocked;
        let mpLocked = this.state.mpKnobLocked;
        let mLocked = this.state.mKnobLocked;
    
        switch( who ){
          case "dp":
          
            if(!dpLocked){
              
              dp = amount;
              amountOwed = investment - dp;
              
              if(!mpLocked) adjMP = Math.round(amountOwed / m);
              else adjMP = mp;
    
              if( (mp >= maxPayments) || mpLocked ){
                //m = Math.round( maxCost - (dp / maxPayments) );
                if(!mLocked) m = Math.round( (amountOwed / mp) - m );
              
              } 
    
            } else {
              skip = true;
            }
    
            break;
    
          case "mp":
    
            if(!mpLocked){
    
              amountOwed = investment;
              adjMP = amount;
    
              if(!mLocked){
    
                if( m > minMonths){
                  
                  m = Math.round( (amountOwed - dp) / adjMP );
    
                } else if (m < maxMonths) {
    
                  if( dp <= 0){
                    dp = 0;
                    adjMP = this.state.payments; // keep same value
                  } else {
    
                  }
                }
    
              } else {
    
                if( dp <= 0){
                  dp = 0;
                  if(adjMP > this.state.payments) {
                    console.log("up")
    
                    if(!mLocked) m = Math.round( amountOwed / adjMP);
    
                  } else {
    
                    console.log("down");
    
                    if(!mLocked) m = maxMonths;
                    if(!mpLocked) adjMP = this.state.payments;
                    if(!dpLocked) dp = Math.round( amountOwed - (adjMP * m) );
                      
                  }
                } else if(dp >= investment){
                  if(!mLocked) m = Math.round( amountOwed / amount);
                } else {
                  if(!dpLocked) dp = Math.round( amountOwed - (adjMP * m) );
                }
              }
            } else {
              skip = true;
            }
    
            break;
    
          case "m":
            if(!mLocked){
              
              m = amount;
    
              if( mp > maxPayments ){
                if(!dpLocked) dp = investment - (m * maxPayments);
              }
    
              amountOwed = investment - dp;
              adjMP = Math.round(amountOwed / m);
    
            } else {
              skip = true;
            }
    
            break;
          
          case "total":
            this.setState({ investment: amount });
            amountOwed = amount - dp;
            adjMP = Math.round(amountOwed / m);
            break;
    
          default:
            amountOwed = 0;
            adjMP = 0;
            break;
        }
        
        if(!skip){
          let totalsObject = {
            downpayment: dp,
            payments: adjMP,
            months: m,
            amountOwed: amountOwed
          };
          this.setState( totalsObject );
          this.setValues( totalsObject );
        }
      } 

    return totalsObject;
};