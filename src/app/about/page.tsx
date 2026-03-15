'use client';

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 md:p-16 lg:p-24">
      <div className="flex place-items-center w-full max-w-4xl mt-8 sm:mt-16">
        <div className="space-y-8 sm:space-y-12 w-full bg-black p-4 sm:p-8 card-border">
          <h1 className="font-cyber text-3xl sm:text-4xl font-bold text-hot-pink text-center mb-8 sm:mb-12">
            About the doomsd<span className="text-citrus">AI</span> clock
          </h1>

          <div className="space-y-6 sm:space-y-8 text-white/80">
            <section className="space-y-3 sm:space-y-4">
              <h2 className="font-cyber text-xl sm:text-2xl text-citrus mb-2 sm:mb-4">Project Overview</h2>
              <p className="font-cyber text-sm sm:text-base leading-relaxed">
                The doomsdAI Clock is an AI-powered reimagining of the iconic Doomsday Clock, combining advanced data analysis with the historic symbolism of humanity's proximity to global catastrophe.
              </p>
            </section>

            <section className="space-y-3 sm:space-y-4">
              <h2 className="font-cyber text-xl sm:text-2xl text-citrus mb-2 sm:mb-4">Methodology</h2>
              <p className="font-cyber text-sm sm:text-base leading-relaxed">
                Our system employs a sophisticated weighted analysis of various global risk factors, including nuclear threats, climate change, emerging technologies, and more. Each factor is continuously monitored and evaluated using AI-driven data analysis.
              </p>
            </section>

            <section className="space-y-3 sm:space-y-4">
              <h2 className="font-cyber text-xl sm:text-2xl text-citrus mb-2 sm:mb-4">Historical Context</h2>
              <p className="font-cyber text-sm sm:text-base leading-relaxed">
                The original Doomsday Clock was created in 1947 by the Bulletin of the Atomic Scientists. It has served as a powerful symbol of humanity's proximity to global catastrophe, with midnight representing apocalyptic disaster.
              </p>
            </section>

            <section className="space-y-3 sm:space-y-4">
              <h2 className="font-cyber text-xl sm:text-2xl text-citrus mb-2 sm:mb-4">AI Enhancement</h2>
              <p className="font-cyber text-sm sm:text-base leading-relaxed">
                By incorporating artificial intelligence, we've enhanced the traditional model with real-time data analysis, predictive modeling, and comprehensive risk assessment across multiple domains of global security and stability.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
