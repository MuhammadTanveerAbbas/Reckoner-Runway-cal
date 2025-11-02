import { Header } from "@/components/pages/header";
import { Footer } from "@/components/pages/footer";

export const metadata = {
  title: "Terms of Service - Reckoner",
  description: "Terms of service for Reckoner runway calculator",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Acceptance of Terms</h2>
            <p>By using Reckoner, you agree to these terms. If you disagree with any part, please do not use our service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Service Description</h2>
            <p>Reckoner provides a free financial runway calculator for informational purposes. Results are estimates based on your inputs and should not be considered financial advice.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">No Warranty</h2>
            <p>This tool is provided "as is" without warranties of any kind. We do not guarantee accuracy, reliability, or suitability for any particular purpose.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Limitation of Liability</h2>
            <p>We are not liable for any decisions made based on calculations from this tool. Always consult with qualified financial professionals for business decisions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use constitutes acceptance of updated terms.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
