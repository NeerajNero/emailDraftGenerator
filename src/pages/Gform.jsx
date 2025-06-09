import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const agents = ["Neeraj"];
const sources = ["Email", "Chat", "Inbound", "Outbound", "Feedback"];
const products = ["Amount Pro", "Amount Pro - Cashswift", "Amount Pro -loanpro", "amountpro- easycredit", "amountpro-quickfund", "amountpro-speedycash", "Capital Rupee", "Credigen", "Fastcash Now", "fastcashnow - cash loan", "fastcashnow - consumer loan", "fastcashnow - credit loan", "fastcashnow - micro-credit", "fastcashnow - salary loan", "Finikash", "Finikash - CashNow", "Finikash - CreditFinance", "Finikash - KashLoan", "Finikash - MoneyFund", "Finikash - RupeeFund", "Flying Cash", "Front Loan", "Hopefundad", "HopeFundad-CreditSwift", "HopeFundad-EasyLend", "HopeFundad-LoanEase", "HopeFundad-MoneyKash", "HopeFundad-QuickFunds", "HopefundIOS", "HopeFundIOS-EasyLend", "HopeFundIOS-QuickFunds", "HopeFundIOS-MoneyKash", "HopeFundH5", "IMB fund - Loanswift", "IMB fund- cashwave", "IMB fund- Easylend", "IMB fund- Secureloanpro", "IMBFund Android", "imbfundad- QuickCashNow", "Instanova", "Instanova - BoostLoan", "Instanova - FastMoney", "Instanova - FundRupee", "Instanova - Loan Loom", "Instanova - MoneyLoan", "Jackpotfundios", "Jackpotfundios - CashEase", "Jackpotfundios - CreditSwift", "Jackpotfundios - FundFlow", "Jackpotfundios - JackpotFund", "Jackpotfundios - LoanGenie", "Jackpotfundios - MoneyMatter", "Kredeaze", "Kredeaze - Bharat Blend", "Kredeaze - MitraFunds", "Kredeaze - SarvaLoan", "Kredeaze - SmartFinance", "Kredeaze - UnityLoan", "Loanifi", "loanifi - loan quick", "Loanifi Android", "Loanifi-CrediPoint", "Loanifi-EasyRupee", "Loanifi-FundSwift", "Loanifi-QuickLoaner", "LoVeFinance", "LoVeFinance-Blink", "LoVeFinance-Flox", "LoVeFinance-Kash", "LoVeFinance-ZapL", "LoVeFinance-ZLoan", "Lucky Money", "Lucky Money Android", "Luckymoney - EasyEMI", "Luckymoney - Flexifund", "Luckymoney - PrimeCredit", "Luckymoney - QuickLoan", "Luckymoney - SecureAdvance", "Medi Credit Score", "Medi Credit Score- creditguard", "Medi Credit Score- financeease", "Medi Credit Score- loansage", "Medi Credit Score- safefunds", "Medi Credit Score- smartborrow", "Money Mingle", "SarvatraKash - Entrepreneur", "SarvatraKash Ad", "SarvatrakashAd - Investor", "SarvatrakashAd - Job Seeker", "SarvatrakashAd - Philanthropist", "SarvatrakashAd - Retiree", "SarvatrakashAd - Working Professional", "Stashfing", "Try Cash", "Rupeefinance - Rupeefinance", "rupeefinance - Elite Loan", "rupeefinance - Salary Loan", "rupeefinance - Credit loan", "rupeefinance - Micro-credit", "rupeefinance - Cash Loan", "Fund Flow", "Fund flow - SalaryTurnover", "Fund flow - BusinessTurnover", "Fund flow - MedicalEmergencyFund", "Fund flow - FamilyEmergencyFund", "Fund flow - ReserveFund"];
const concerns = ["Loan Related concern", "Loan Rejection", "Loan Cancellation", "App/Login Issues", "Disbursement Issues", "Repayment Issues", "Incomplete Query", "Due Date Extension", "Account Deactivate/blocked", "Loan closure (Double Rollover Payment made)", "Loan closure Execption case", "High Processing Charges", "Credit Limit Increase", "Spam", "Bank account Change", "Loan Status", "NOC related", "Tenure details", "Cashback/offer related", "Harassment", "General enquiry", "Fraud issue reported"];
const statuses = ["Resolved", "Pending", "CX Awaiting Response"];
const entryMap = {
  agent: "entry.1554510001",
  source: "entry.2011780965",
  loanId: "entry.726653694",
  ticketNo: "entry.1145382921",
  customerNo: "entry.1185274153",
  customerName: "entry.953502551",
  product: "entry.1760102003",
  concern: "entry.1630997678",
  status: "entry.1212057470",
  remarks: "entry.442062352"
};

export default function Gform() {
  const [formData, setFormData] = useState({ agent: "Neeraj", source: "Email", loanId: "", ticketNo: "", customerNo: "", customerName: "", product: "", concern: "", status: "", remarks: "" });
  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = name === "customerNo" ? value.replace(/\s+/g, "") : value;
    setFormData({ ...formData, [name]: sanitizedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z\s]+$/.test(formData.customerName)) return toast.error("Customer name should only contain letters and spaces.");
    if (!/^\d+$/.test(formData.loanId)) return toast.error("Loan ID must be a number.");
    if (!/^\d+$/.test(formData.ticketNo)) return toast.error("Ticket Number must be a number.");
    if (!/^\d+$/.test(formData.customerNo)) return toast.error("Customer Number must be a number.");

    const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdGrnRQrr3iQYCxU_DEK-HOaOHAc0daZiIuOETqB_SGcs2mGw/viewform?usp=pp_url";
    const params = new URLSearchParams();
    Object.keys(formData).forEach((key) => params.append(entryMap[key], formData[key]));
    window.open(`${baseUrl}&${params.toString()}`, "_blank");
    toast.success("Google Form opened with filled details.");
  };

  const clearForm = () => {
    setFormData({ agent: "Neeraj", source: "Email", loanId: "", ticketNo: "", customerNo: "", customerName: "", product: "", concern: "", status: "", remarks: "" });
    toast("Form cleared");
  };

  const createSearchableDropdown = (label, name, options) => (
    <div className="col-md-6 mb-2">
      <label className="form-label">{label}</label>
      <input
        type="text"
        list={`${name}-list`}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="form-control"
      />
      <datalist id={`${name}-list`}>
        {options.map((opt) => (
          <option key={opt} value={opt} />
        ))}
      </datalist>
    </div>
  );

  return (
    <div className={darkMode ? "bg-dark text-white min-vh-100" : "bg-light text-dark min-vh-100"}> 
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="container py-4" style={{ maxWidth: "720px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Ticket Auto-Fill Form</h4>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>

        <div className="row">
          {createSearchableDropdown("Agent Name", "agent", agents)}
          {createSearchableDropdown("Concern Source", "source", sources)}
        </div>
        <div className="row">
          <div className="col-md-4 mb-2">
            <label className="form-label">Loan ID</label>
            <input type="text" name="loanId" value={formData.loanId} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-4 mb-2">
            <label className="form-label">Ticket Number</label>
            <input type="text" name="ticketNo" value={formData.ticketNo} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-4 mb-2">
            <label className="form-label">Customer Number</label>
            <input type="text" name="customerNo" value={formData.customerNo} onChange={handleChange} className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-2">
            <label className="form-label">Customer Name</label>
            <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} className="form-control" />
          </div>
          {createSearchableDropdown("Product", "product", products)}
        </div>
        <div className="row">
          {createSearchableDropdown("Concern Type", "concern", concerns)}
          {createSearchableDropdown("Complaint Status", "status", statuses)}
        </div>
        <div className="mb-2">
          <label className="form-label">Remarks</label>
          <textarea name="remarks" value={formData.remarks} onChange={handleChange} className="form-control" rows="2"></textarea>
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary w-100">Open Pre-Filled Google Form</button>
          <button type="button" className="btn btn-outline-secondary w-100" onClick={clearForm}>Clear All Fields</button>
        </div>
      </form>
    </div>
  );
}
