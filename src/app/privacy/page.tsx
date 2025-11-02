import { Header } from "@/components/pages/header";
import { Footer } from "@/components/pages/footer";

export const metadata = {
  title: "Privacy Policy - Reckoner",
  description: "Privacy policy for Reckoner runway calculator",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Data Collection</h2>
            <p>Reckoner is designed with privacy as a core principle. All financial calculations are performed entirely in your browser. We do not collect, store, or transmit any of your financial data to our servers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Local Storage</h2>
            <p>Your financial inputs may be saved in your browser's local storage for convenience. This data remains on your device and can be cleared at any time through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Analytics</h2>
            <p>We may use privacy-focused analytics to understand how users interact with our tool. This data is anonymized and does not include any financial information you enter.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Third-Party Services</h2>
            <p>Reckoner does not share your data with third-party services. All processing happens locally in your browser.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Contact</h2>
            <p>For privacy concerns, contact us through GitHub or LinkedIn (links in footer).</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
