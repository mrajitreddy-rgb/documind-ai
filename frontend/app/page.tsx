import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import SocialProof from "@/components/landing/SocialProof";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      

      <main className="bg-slate-950 text-white">
        
        <Navbar />
        
        <Hero />

        <Features />

        <HowItWorks />

        

        <SocialProof />

        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}