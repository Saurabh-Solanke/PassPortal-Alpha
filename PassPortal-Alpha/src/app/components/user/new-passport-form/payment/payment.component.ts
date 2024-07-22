import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.addScript();
  }

  addScript(): void {
    const script = document.createElement('script');
    script.innerHTML = `
      function showPaymentFields() {
        var selectedOption = document.getElementById("payment_option").value;
        var paymentFields = document.getElementsByClassName("paymentFields");
        for (var i = 0; i < paymentFields.length; i++) {
          paymentFields[i].classList.add("d-none");
        }
        document.getElementById(selectedOption + "Payment").classList.remove("d-none");

        var submitButton = document.getElementById("submitButton");
        if (selectedOption === "upi") {
          submitButton.textContent = "Go to UPI";
        } else {
          submitButton.textContent = "Pay Now";
        }
      }
    `;
    document.body.appendChild(script);
  }
}
