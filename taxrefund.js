// These function  and variable define the data structures we'll use to store
// tax bracket and tax schedule and tax year data for computing taxes.

function TaxBracket(cutoff, standardRate, higherRate) {
    this.cutoff = cutoff; // how much money to be in this bracket
    this.standardRate = standardRate; // the standard tax rate for this bracket
    this.higherRate = higherRate; // the higher tax rate for this bracket 
}

var taxFilingYear = [ // This contain four meta schedules each representing the tax year under consideration

    [ // meta schedule for year 2012

        new TaxBracket(32800, 0.2, 0.41), // tax brackets for filing status- Single

        new TaxBracket(36800, 0.2, 0.41), // tax brackets for filing status- Single parent family                        

        new TaxBracket(41800, 0.2, 0.41), // tax brackets for filing status- Married single income                       

        new TaxBracket(41800, 0.2, 0.41), // tax brackets for filing status- Married two incomes                     

        [1200, 2400, 2400, 4800], //  Rent relief options

        [10036, 16016, 0.020, 0.040, 0.070], //  Rent relief options        
    ],

    [ // meta schedule for year 2013

        new TaxBracket(32800, 0.2, 0.41), // tax brackets for filing status- Single

        new TaxBracket(36800, 0.2, 0.41), // tax brackets for filing status- Single parent family                        

        new TaxBracket(41800, 0.2, 0.41), // tax brackets for filing status- Married single income                       

        new TaxBracket(41800, 0.2, 0.41), // tax brackets for filing status- Married two incomes     

        [1000, 2000, 2000, 3600], //  Rent relief options 

        [10036, 16016, 0.020, 0.040, 0.070], //  Rent relief options     
    ],

    [ // meta schedule for year 2014

        new TaxBracket(32800, 0.2, 0.41), // tax brackets for filing status- Single

        new TaxBracket(36800, 0.2, 0.41), // tax brackets for filing status- Single parent family                        

        new TaxBracket(41800, 0.2, 0.41), // tax brackets for filing status- Married single income                       

        new TaxBracket(41800, 0.2, 0.41), // tax brackets for filing status- Married two incomes                     

        [600, 1200, 1200, 2400], //  Rent relief options

        [10036, 16016, 0.020, 0.040, 0.070], //  Rent relief options                             
    ],

    [ // meta schedule for year 2015

        new TaxBracket(33800, 0.2, 0.40), // tax brackets for filing status- Single

        new TaxBracket(37800, 0.2, 0.40), // tax brackets for filing status- Single parent family                        

        new TaxBracket(42800, 0.2, 0.40), // tax brackets for filing status- Married single income                       

        new TaxBracket(42800, 0.2, 0.40), // tax brackets for filing status- Married two incomes                     

        [600, 1200, 1200, 2400], //  Rent relief options 

        [12012, 17576, 70044, 0.015, 0.035, 0.070, 0.080], //  Rent relief options       
    ],

];


var tuitionFeesgYear = [ // This contain four arrays representing the year under consideration

    [2250, 1125], // disregard amount  schedule for year  2012          

    [2500, 1250], // disregard amount  schedule for year  2013           

    [2750, 1375], // disregard amount  schedule for year  2014          

    [3000, 1500], // disregard amount  schedule for year  2015                                                        
];


var married2income = [23800, 23800, 23800, 24800];


var f = document.refundcalc; // This is the form we'll we working with.

f.hideme.addEventListener("click", function(event) {
    event.preventDefault()
});



function showblock() {
    var filing_tatus = f.filing_status.selectedIndex;
    if (filing_tatus === 3) {
        document.getElementById("secondearner").className = "show";

    }
}



function computeRefund() { // Declare function

    // get the tax year under consideration
    var taxYear = f.tax_year.selectedIndex;

    // get the filing status

    var filingStatus = f.filing_status.selectedIndex;

    // get deductible medical expenses

    var deducMedExp = parseFloat(f.deduc_med_exp.value);
    if (isNaN(deducMedExp)) { deducMedExp = 0 }
    if (deducMedExp < 0) { deducMedExp = 0 }



    // get rent paid.

    var rentPaid = parseFloat(f.rent_paid.value);
    if (isNaN(rentPaid)) { rentPaid = 0 }
    if (rentPaid < 0) { rentPaid = 0 }

    // get school fees paid

    var schFeesPaid = parseFloat(f.tuition_fees_paid.value);
    if (isNaN(schFeesPaid)) { schFeesPaid = 0 }
    if (schFeesPaid < 0) { schFeesPaid = 0 }

    // get information about the type of student 

    var typeOfStudent = f.type_of_student.selectedIndex;

    // get the school year under consideration

    var schoolYear = f.school_year.selectedIndex;


    // get total wages

    var totalWages = parseFloat(f.total_wages.value);
    if (isNaN(totalWages)) { totalWages = 0 }
    if (totalWages < 0) { totalWages = 0 }

    // get tax allowance

    var taxDeducExpenses = parseFloat(f.tax_deduc_exp.value);
    if (isNaN(taxDeducExpenses)) { taxDeducExpenses = 0 }
    if (taxDeducExpenses < 0) { taxDeducExpenses = 0 }

    // get total tax allowance

    var totalTaxAllowance = parseFloat(f.total_tax_allowance.value);
    if (isNaN(totalTaxAllowance)) { totalTaxAllowance = 0 }
    if (totalTaxAllowance < 0) { totalTaxAllowance = 0 }



    // get number of employers

    var numOfEmployers = f.num_of_employers.selectedIndex;

    // get total wages

    var SecondEarnerWages = parseFloat(f.second_earner_wages.value);
    if (isNaN(SecondEarnerWages)) { SecondEarnerWages = 0 }
    if (SecondEarnerWages < 0) { SecondEarnerWages = 0 }


    // get tax allowance

    var secondTaxAllowance = parseFloat(f.second_tax_allowance.value);
    if (isNaN(secondTaxAllowance)) { secondTaxAllowance = 0 }
    if (secondTaxAllowance < 0) { secondTaxAllowance = 0 }

    // get tax allowance

    var taxDeducExpenses2 = parseFloat(f.tax_deduc_exp2.value);
    if (isNaN(taxDeducExpenses2)) { taxDeducExpenses2 = 0 }
    if (taxDeducExpenses2 < 0) { taxDeducExpenses2 = 0 }

    // get number of employers

    var numOfEmployers2 = f.num_of_employers2.selectedIndex;


    // get total tax paid

    var totalTaxPaid = parseFloat(f.total_tax_paid.value);
    if (isNaN(totalTaxPaid)) { totalTaxPaid = 0 }
    if (totalTaxPaid < 0) { totalTaxPaid = 0 }


    // get total usc paid

    var totalUscPaid = parseFloat(f.total_usc_paid.value);
    if (isNaN(totalUscPaid)) { totalUscPaid = 0 }
    if (totalUscPaid < 0) { totalUscPaid = 0 }

    // get total prsi paid

    var totalPrsiPaid = parseFloat(f.total_prsi_paid.value);
    if (isNaN(totalPrsiPaid)) { totalPrsiPaid = 0 }
    if (totalPrsiPaid < 0) { totalPrsiPaid = 0 }


    // get number of employers

    var numOfEmployers = f.num_of_employers.selectedIndex;


    // This section determines the age from the birthday information


    var agewa = f.birthday.value; // This extracts and stores the birthday from the form in the format yy-mm-dd

    var bdate = new Date(agewa); // This determines and stores the number of milliseconds between the birthday stored in "agewa" and January 1, 1970

    var cur = new Date(); // This determines and stores the number of milliseconds between now and January 1, 1970

    var diff = cur - bdate; // This is the difference in milliseconds

    var age = Math.floor(diff / 31536000000);

    if (isNaN(age)) {
        age = 0;
        f.birthday.value = "0";
    }

    if (age < 0) { age = 0 };



    // compute taxable income

    var taxableIncome = totalWages - totalTaxAllowance - taxDeducExpenses;

    // compute taxable income for second earner in a married or in civil partnership

    var taxableIncome2 = SecondEarnerWages - secondTaxAllowance - taxDeducExpenses2;




    // retrive the meta schedule for the year selected

    var Schedule = taxFilingYear[taxYear];


    // retrieve the tax bracket for the filing status selected

    var bracket = Schedule[filingStatus];



    // determine which tax bracket to use within that schedule, then compute the tax payable based on that bracket

    var standardTax = bracket.cutoff * bracket.standardRate;

    var higherTax = (taxableIncome - bracket.cutoff) * bracket.higherRate;

    var taxPayable;

    var taxPayable2;

    var increaseOf = married2income[taxYear];

    // Calculate tax payeble by the second earner in a married or civil partnership

    if (SecondEarnerWages <= increaseOf) {

        taxPayable2 = SecondEarnerWages * bracket.standardRate;

    } else if (SecondEarnerWages > increaseOf) {

        taxPayable2 = (increaseOf * bracket.standardRate) + ((SecondEarnerWages - increaseOf) * (bracket.higherRate));

    }

    // Calculate tax payeble by the second earner in a married or civil partnership------END

    if (filingStatus === 3) {

        if (taxableIncome <= bracket.cutoff) {

            taxPayable = Math.round((taxableIncome * bracket.standardRate) + taxPayable2);
        } else {

            taxPayable = Math.round((standardTax + higherTax) + taxPayable2);

        }


    } else {

        if (taxableIncome <= bracket.cutoff) {

            taxPayable = Math.round(taxableIncome * bracket.standardRate);
        } else {

            taxPayable = Math.round(standardTax + higherTax);

        }

    }




    //  compute total tax credit  based on that bracket

    var standardAnnualTaxCredit = 3300;

    var singleParentTaxCredit = 1650;


    var totalTaxCredit;

    if ((filingStatus === 1) && (totalWages <= 36800)) {

        totalTaxCredit = Math.round(standardAnnualTaxCredit + singleParentTaxCredit);

    } else {

        totalTaxCredit = Math.round(standardAnnualTaxCredit);
    }

    // compute paye tax 

    var calPayeTax = taxPayable - totalTaxCredit;
    if (isNaN(calPayeTax)) { calPayeTax = 0 }
    if (calPayeTax < 0) { calPayeTax = 0 }




    // compute the adjusted (Adj) values for the deductible expenditures based on the appropriate bracket


    var deducMedExpAdj = deducMedExp * 0.20;


    // Calculating tuition fees relief
    var disregardArray = tuitionFeesgYear[schoolYear];

    var disregardAmount = disregardArray[typeOfStudent];

    var tuitiontaxrelief = ((schFeesPaid - disregardAmount) * 0.2);

    if (isNaN(tuitiontaxrelief)) { tuitiontaxrelief = 0 }
    if (tuitiontaxrelief < 0) { tuitiontaxrelief = 0 }



    // Calculating rent relief  

    var rentOption = Schedule[4];

    var rentRelief;

    if (document.getElementById("rent_yes").checked) {

        if ((filingStatus === 0) && (age < 55)) { //Yes medical card radio button is checked

            rentRelief = rentOption[0];

        } else if ((filingStatus === 0) && (age > 55)) { //No medical card radio button is checked

            rentRelief = rentOption[1];

        } else if (!(filingStatus === 0) && (age < 55)) { //No medical card radio button is checked

            rentRelief = rentOption[2];

        } else if (!(filingStatus === 0) && (age > 55)) { //No medical card radio button is checked

            rentRelief = rentOption[3];

        }

    } else if (document.getElementById("rent_no").checked) { //No medical card radio button is checked

        rentRelief = 0; //taxableIncome = 20000;

    }


    // calculating the home carer tax credit

    var homeCarerRelief;

    if (filingStatus === 3) {

        if (SecondEarnerWages <= 5080) {

            homeCarerRelief = 1000;

        } else if ((SecondEarnerWages > 5080) && (SecondEarnerWages < 6700)) {

            homeCarerRelief = 1000 - ((SecondEarnerWages - 5080) / 2);

        } else if (SecondEarnerWages >= 6700) {

            homeCarerRelief = 0;
        }

    } else {

        homeCarerRelief = 0;
        f.second_earner_wages.value = 0;
        f.second_tax_allowance.value = 0;

    }


    // compute total tax deductions  based on selected bracket

    var totalDeductExp = parseInt(deducMedExpAdj + tuitiontaxrelief + rentRelief + homeCarerRelief);

    // compute net tax payable

    var netTaxpPayable = Math.round(taxPayable - totalTaxCredit - totalDeductExp);


    if (isNaN(netTaxpPayable)) { netTaxpPayable = 0 }
    if (netTaxpPayable < 0) { netTaxpPayable = 0 }


    // This section determines the USC given the medical card status, the age and income of the applicant.

    var Schedule2 = taxFilingYear[3]
    var uscOption = Schedule2[5];

    var Schedule1 = taxFilingYear[0]

    var uscOption1 = Schedule1[5];

    var usc1;
    var usc2;
    var usc3;
    var usc4;

    var totalUscComputed;
    if (isNaN(totalUscComputed)) { totalUscComputed = 0 }
    if (totalUscComputed < 0) { totalUscComputed = 0 }

    var totalWagesUsc;
    if (filingStatus === 3) {

        totalWagesUsc = totalWages + SecondEarnerWages;

    } else {

        totalWagesUsc = totalWages;

    }

    if (totalWagesUsc > 13000) {

        if (document.getElementById("med_card_yes").checked) {

            if (!(taxYear === 3)) {

                usc1 = uscOption1[0] * uscOption1[2];

                usc2 = (totalWagesUsc - uscOption1[0]) * uscOption1[3];

                usc3 = 0;

                usc4 = 0;

                totalUscComputed = usc1 + usc2 + usc3 + usc4;


            } else if (taxYear === 3) {

                usc1 = uscOption[0] * uscOption[3];

                usc2 = (totalWagesUsc - uscOption[0]) * uscOption[4];

                usc3 = 0;

                usc4 = 0;

                totalUscComputed = usc1 + usc2 + usc3 + usc4;

            }




        } else if (document.getElementById("med_card_no").checked) { //No medical card radio button is checked


            if (!(taxYear === 3)) {

                if ((uscOption1[0] < totalWagesUsc) && (totalWagesUsc < uscOption1[1])) { //Yes medical card radio button is checked

                    usc1 = uscOption1[0] * uscOption1[2];

                    usc2 = (totalWagesUsc - uscOption1[0]) * uscOption1[3];

                    usc3 = 0;

                    usc4 = 0;

                } else if (totalWagesUsc > uscOption1[1]) { //No medical card radio button is checked

                    usc1 = uscOption1[0] * uscOption1[2];

                    usc2 = (uscOption1[1] - uscOption1[0]) * uscOption1[3];

                    usc3 = (totalWagesUsc - uscOption1[1]) * uscOption1[4];

                    usc4 = 0;

                }

                totalUscComputed = usc1 + usc2 + usc3 + usc4;


            } else if (taxYear === 3) {


                if ((uscOption[0] < totalWagesUsc) && (totalWagesUsc < uscOption[1])) { //Yes medical card radio button is checked

                    usc1 = uscOption[0] * uscOption[3];

                    usc2 = (totalWagesUsc - uscOption[0]) * uscOption[4];

                    usc3 = 0;

                    usc4 = 0;

                } else if ((uscOption[1] < totalWagesUsc) && (totalWagesUsc < uscOption[2])) { //No medical card radio button is checked

                    usc1 = uscOption[0] * uscOption[3];

                    usc2 = (uscOption[1] - uscOption[0]) * uscOption[4];

                    usc3 = (totalWagesUsc - uscOption[1]) * uscOption[5];

                    usc4 = 0;


                } else if (totalWagesUsc > uscOption[2]) {

                    usc1 = uscOption[0] * uscOption[3];

                    usc2 = (uscOption[1] - uscOption[0]) * uscOption[4];

                    usc3 = (uscOption[2] - uscOption[1]) * uscOption[5];

                    usc4 = (totalWagesUsc - uscOption[2]) * uscOption[5];



                }

                totalUscComputed = usc1 + usc2 + usc3 + usc4;

            } //Yes medical card radio button is checked                                                  

        }


    } else if (totalWagesUsc < 13000) { //No medical card radio button is checked

        totalUscComputed = 0;

    }




    // This section determines the Prsi given the medical card status, the age and income of the applicant.

    var prsiPayable;

    var totalWagesPrsi;

    if (filingStatus === 3) {

        totalWagesPrsi = totalWages + SecondEarnerWages;

    } else {

        totalWagesPrsi = totalWages;

    }

    if ((totalWagesPrsi > 18304) && (age < 66)) {

        prsiPayable = totalWagesPrsi * 0.04;

    } else {
        prsiPayable = 0;
    }


    // compute net income

    //  var netIncome = Math.round(totalWages - netTaxpPayable - totalUscComputed - prsiPayable);

    // compute first refund

    var refund1 = totalTaxPaid - netTaxpPayable;
    if (isNaN(refund1)) { refund1 = 0 }
    if (refund1 < 0) { refund1 = 0 }

    var refund2 = totalUscPaid - totalUscComputed;
    if (isNaN(refund2)) { refund2 = 0 }
    if (refund2 < 0) { refund2 = 0 }


    var refund3 = totalPrsiPaid - prsiPayable;
    if (isNaN(refund3)) { refund3 = 0 }
    if (refund3 < 0) { refund3 = 0 }


    var totalrefund = refund1 + refund2 + refund3;
    if (isNaN(totalrefund)) { totalrefund = 0 }
    if (totalrefund < 0) { totalrefund = 0 }



    document.getElementById("results").className = "show";

    var payeTax = document.getElementById('payetax');
    //payeTax.textContent = taxPayable - totalTaxCredit ;
    payeTax.value = parseInt(netTaxpPayable);

    var calUsc = document.getElementById('calusc');
    //calUsc.textContent = Math.round(totalUscComputed) ;
    calUsc.value = parseInt(Math.round(totalUscComputed));

    var calPrsi = document.getElementById('calprsi');
    //calPrsi.textContent = prsiPayable ;
    calPrsi.value = parseInt(prsiPayable);

    var elt = document.getElementById('refund');
    //elt.textContent = totalrefund ;
    elt.value = parseInt(totalrefund);

    // this sends the result to the PHP files for onward journey to the database


    //var cal_usc=  (Math.round(totalUscComputed)) ;
    //var cal_prsi=  prsiPayable;
    //var cal_refund= netIncome;


    //ajax({
    //  type: 'post',
    // url: "php/sendfrmfortaxrefund.php",
    //data: {
    //       paye_tax: paye_tax,
    //     cal_usc:  cal_usc,
    //   cal_prsi:  cal_prsi,
    // cal_refund: cal_refund
    // },
    //success: function( data ) {
    //  console.log( data );
    //}
    // });



}




// prevents the default function from executing



f.calc.addEventListener("click", function(event) {
    event.preventDefault()
});


// This extracts and stores the birthday from the form in the format yy-mm-dd

function changeClass() {
    document.getElementById("results").className = "hide";
    document.getElementById("secondearner").className = "hide";

}