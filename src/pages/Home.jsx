function Home() {
  const features = [
    {
      title: "Submit Lost Item",
      description: "Report a lost item with details to help others identify it.",
      icon: "📝",
      link: "/submission",
      buttonText: "Submit Item"
    },
    {
      title: "Search Items",
      description: "Browse through found items to locate your lost belongings.",
      icon: "🔍",
      link: "/search",
      buttonText: "Search Now"
    },
    {
      title: "Claim Item",
      description: "Found your item? Claim it by verifying the details.",
      icon: "✅",
      link: "/claim",
      buttonText: "Claim Now"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-outfit">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Lost & Found
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Reuniting lost items with their owners through a simple and efficient platform.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <a
                href={feature.link}
                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {feature.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;

