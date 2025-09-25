<h1 align="center">Reckoner 🧮</h1>
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</p>

## What is Reckoner?

Reckoner is a web based tool that calculates your company's financial runway the number of months your business can operate before it runs out of money. By simply inputting your current cash balance, monthly revenue, and monthly expenses, you get an immediate, clear, and accurate picture of your financial health.

## Why Reckoner?

In the fast paced world of startups, financial clarity is crucial, but the tools to achieve it are often overly complex or expensive. Founders need quick, reliable answers to fundamental questions like, "How long can we last with the money we have?"

Reckoner was built to solve this problem by providing:

- **Simplicity:** No more wrestling with complicated spreadsheet formulas.
- **Speed:** Get the insights you need in seconds, not hours.
- **Accessibility:** A completely free tool, available to any founder, anywhere.

## How It Works

The calculation is straightforward but powerful. Reckoner uses two key formulas to determine your financial runway:

### 1. Net Monthly Burn Rate

First, it calculates your **net monthly burn rate**, which is the amount of money your company loses each month.

`Net Monthly Burn = Monthly Expenses - Monthly Revenue`

- If your expenses are higher than your revenue, you have a "burn."
- If your revenue is higher than your expenses, you are "profitable," and your burn is negative.

### 2. Financial Runway

Next, it uses your net burn to calculate your **financial runway**—the number of months you can continue operating before your cash runs out.

`Runway (in months) = Total Cash Balance / Net Monthly Burn`

- If you are profitable (i.e., your burn is negative), your runway is considered infinite because you are not losing money.
- Reckoner instantly computes these values and presents them in a clear, easy to understand format.

## Key Features

- **Instant Runway Calculation:** Get an immediate and accurate projection.
- **Visual Burn Down Chart:** Visualize your cash flow over the coming months.
- **Secure & Private:** All calculations are performed in your browser. Your financial data is never stored or sent to a server.
- **Responsive Design:** Access the calculator on any device, desktop or mobile.
- **Professional PDF Export:** Download a well formatted PDF report of your runway to share with stakeholders.

## Difference from Other Tools

While many financial tools exist, Reckoner stands out by focusing on one thing and doing it exceptionally well.

- **Zero Friction:** No sign up, no credit card, no bloated features. Just a calculator that works.
- **Founder-Focused:** Designed with the specific needs of early stage startups in mind.
- **Educational:** Includes a helpful FAQ section to clarify common financial terms like "burn rate."

## Tech Stack

This project is built with a modern, performant, and scalable tech stack:

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **PDF Generation:** [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You'll need [Node.js](https://nodejs.org/en/) (version 18 or later) and npm installed on your machine.

### Installation & Running

1.  Clone the repository:
    ```sh
    git clone https://github.com/muhammadtanveerabbas/Reckoner-Runway-cal.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd Reckoner-Runway-cal
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```
4.  Run the development server:
    `sh
npm run dev
`
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- [LinkedIn](https://linkedin.com/in/muhammadtanveerabbas)
- [GitHub](https://github.com/muhammadtanveerabbas)
- [Twitter / X](https://x.com/m_tanveerabbas)

Made with ❤️ by **Muhammad Tanveer Abbas**.
