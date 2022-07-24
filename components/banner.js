export const Banner = () => {
  return (
    <section>
      <div className="w-full max-w-4xl mx-auto py-32 px-4">
        <h1 className="text-6xl font-extrabold mb-1">☕️ Coffee Drinker</h1>
        <p className="mb-4">Find your favortie coffee shops</p>
        <button className="py-1 px-2 bg-black hover:bg-amber-900 text-orange-100">
          View nearby stores
        </button>
      </div>
    </section>
  );
};
