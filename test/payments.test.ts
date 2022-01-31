import { calculatePaymentSchedule } from "../src/Payments";

test("Net60 - Total amount due 60 days from now", () => {
    expect(calculatePaymentSchedule(3000, 5, "net", 60,  "2022-01-10",  "usd")).toEqual(
        expect.arrayContaining([
          expect.objectContaining( { date: '2022-03-11', amount: 3150, currency: 'usd' })
        ])
      );
    
});

test("Installments, 60 days - 1/3 of the total due today, 1/3 due 30 days from now, and 1/3 due 60 days from now.", () => {
    expect(calculatePaymentSchedule(3000, 5, "installments", 60,  "2022-01-10",  "usd")).toEqual(
        expect.arrayContaining([
          expect.objectContaining( { date: '2022-01-10', amount: 1050, currency: 'usd' }),
          expect.objectContaining({ date: '2022-02-09', amount: 1050, currency: 'usd' }),
          expect.objectContaining({ date: '2022-03-11', amount: 1050, currency: 'usd' })
        ])
      );
    
});

test("Installments, 60 days - 1/3 of the total due today, 1/3 due 30 days from now, and 1/3 due 60 days from now. Not evenly divisible total.", () => {
    expect(calculatePaymentSchedule(1000, 3, "installments", 60,  "2022-01-10",  "usd")).toEqual(
        expect.arrayContaining([
          expect.objectContaining( { date: '2022-01-10', amount: 343, currency: 'usd' }),
          expect.objectContaining({ date: '2022-02-09', amount: 343, currency: 'usd' }),
          expect.objectContaining({ date: '2022-03-11', amount: 344, currency: 'usd' })
        ])
      );
    
});

test("Installments, 60 days - 1/3 of the total due today, 1/3 due 30 days from now, and 1/3 due 60 days from now. Total is not a whole number.", () => {
    expect(calculatePaymentSchedule(3001, 5, "installments", 60,  "2022-01-10",  "usd")).toEqual(
        expect.arrayContaining([
          expect.objectContaining( { date: '2022-01-10', amount: 1050, currency: 'usd' }),
          expect.objectContaining({ date: '2022-02-09', amount: 1050, currency: 'usd' }),
          expect.objectContaining({ date: '2022-03-11', amount: 1052, currency: 'usd' })
        ])
      );
    
});

test("Net45 - Total amount due 45 days from now, adjusted for the weekend", () => {
    expect(calculatePaymentSchedule(3000, 5, "net", 45,  "2022-01-12",  "usd")).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ date: '2022-02-28', amount: 3150, currency: "usd" })
         ])
      );
    
});


