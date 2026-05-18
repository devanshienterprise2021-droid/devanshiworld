export default function KYDJOYWebsite() {
  const products = [
    {
      name: 'X Launcher Gun',
      image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?q=80&w=1200&auto=format&fit=crop',
      price: 'Wholesale Available'
    },
    {
      name: 'Geometric Shape Matching Game',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1200&auto=format&fit=crop',
      price: 'Bulk Orders Accepted'
    },
    {
      name: 'Hanging Ping Pong Trainer',
      image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1200&auto=format&fit=crop',
      price: 'Factory Direct Price'
    },
    {
      name: 'Wooden Money Bank',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
      price: 'Distributor Pricing'
    }
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-black mb-6">
            KYDJOY Toys & Kids Products
          </h1>
        </div>
      </section>
    </div>
  )
}
