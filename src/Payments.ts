export function calculatePaymentSchedule(total: number, feePercentage: number,  terms: string, duration: number, startDate: string, currency: string ): any {
    var schedule = [];
    const fee = total * (feePercentage/100);

    if(terms === 'net') {
        //calculate single net payment
        schedule.push({ 
            date: addDays(startDate, duration + 1),
            amount: Math.ceil(total + fee),
            currency: currency
        });
    } else if (terms === 'installments') {
        //calculate payments for 3 installments
        schedule = calculatetInstallments(total, fee, duration, startDate, 3, currency );
    }
    return schedule;
}

//normally would have used a date library but wanted to show logic for this exercise
function addDays(startDate: string, days: number): any {
    const start = new Date(startDate);
    const end = start.setDate(start.getDate() + days);
    var endDate = new Date(end);
    var nextWeekDay;
    if(endDate.getDay() === 0 ) {
        nextWeekDay = endDate.setDate(endDate.getDate() + 1);
        endDate = new Date(nextWeekDay);
    } else if(endDate.getDay() === 6) {
        nextWeekDay = endDate.setDate(endDate.getDate() + 2);
        endDate = new Date(nextWeekDay);
    } 
    const month = (endDate.getMonth() + 1 ) < 10 ? `0${endDate.getMonth() + 1}` : endDate.getMonth() + 1  ;
    const date = endDate.getDate() < 10 ? `0${endDate.getDate()}` : endDate.getDate();
    return `${endDate.getFullYear()}-${month}-${date}`;
}

//payment schedule for installments
function calculatetInstallments(total: number, fee: number, duration: number, startDate: string, numberOfInstallments: number, currency: string): any {
    const remainderDays = duration % (numberOfInstallments - 1);
    const paymentSchedule = [];
    const remainingAmount = (Math.ceil(total + fee)) % numberOfInstallments;
    const amountPerPayment = (Math.ceil(total + fee) - remainingAmount) / numberOfInstallments;
    const daysBetweenPayments = (duration - remainderDays) / (numberOfInstallments - 1);

    //first payment on startDate
    paymentSchedule.push({
        date: startDate,
        amount: amountPerPayment,
        currency: currency
    });

    //remaining payments
    for(let i=1; i <= numberOfInstallments - 1; i++) {
        if(i ===  numberOfInstallments - 1) {
            startDate = addDays(startDate, daysBetweenPayments + remainderDays + 1);
        } else {
            startDate = addDays(startDate, daysBetweenPayments + 1);
        }

        let payment = {
            date: startDate,
            amount: (i ===  numberOfInstallments - 1) ? (amountPerPayment + remainingAmount) : amountPerPayment,
            currency: currency
        };

        paymentSchedule.push(payment);
    }
    return paymentSchedule;
}




