import { ToyProduct, ManufacturerAbout } from "../types";

export const CUSTOMER_CARE_WHATSAPP = "919712174855"; // Devanshi World WhatsApp API number

export interface CategoryMetadata {
  name: string;
  recommendedAge: string;
  description: string;
}

export const CATEGORIES_WITH_AGES: CategoryMetadata[] = [
  {
    name: "Plastic Toys",
    recommendedAge: "Ages 6 Months to 4 Years",
    description: "Shatter-proof, food-grade, 100% recycled BPA-free premium plastics for safe physical play."
  },
  {
    name: "Wooden Toys",
    recommendedAge: "Ages 1 Year to 8 Years",
    description: "Solid sustainable maple, oak, and beech wood with non-toxic saliva-proof beeswax and natural coatings."
  },
  {
    name: "Metal Toys",
    recommendedAge: "Ages 3 Years to 14 Years",
    description: "Heavy-duty, rust-proof, meticulously polished brass, alloys, and metals with smooth rounded bevels."
  }
];

export const MANUFACTURER_INFO: ManufacturerAbout = {
  name: "Devanshi World",
  tagline: "Eco-Friendly Premium Wooden, Recycled Plastic & Meticulous Metal Toys",
  history: "Founded in 2012, Devanshi World began with a pure vision: designing children's developmental toys that spark physical and sensory growth. We use uniquely sourced European beechwood, food-grade biodegradable polymers, and meticulously rounded non-toxic metal elements.",
  storyHeading: "Premium Safety, Infinite Play",
  storyBody: "We believe in tactile play that leaves a minimal footprint. At Devanshi World, each product is balanced for safety and learning. Every bevel is polished, and colors are derived from organic pigments. Our workshop in Rajkot crafts the fine line of toys that children of today adore and the families of tomorrow will continue to inherit.",
  factoryAddress: "201-202, Possible Triangle, Mavdi By Pass, Rajkot-360004, Gujarat, India",
  whatsappNumber: "919712174855",
  contactEmail: "devanshi.enterprise2021@gmail.com",
  values: [
    {
      title: "100% Biodegradable & Safe Materials",
      description: "We use strictly FSC-certified European Beech, Maple, and medical-grade recycled eco-polymers. No harmful chemical resin binders.",
      iconName: "ShieldCheck"
    },
    {
      title: "Non-Toxic Food-Grade Coating",
      description: "Our elements are coated in organic beeswax or water pigments making them saliva-resistant and 100% safe for active infants.",
      iconName: "Sparkles"
    },
    {
      title: "Pediatric-Approved Structures",
      description: "Every shape and color is designed together with Montessori development specialists to stimulate motor skills and mental calculation.",
      iconName: "Trees"
    },
    {
      title: "Worldwide Quality Guarantee",
      description: "Our materials are built to resist chips and dents, certified by the highest global EN71 child-toy safety standards.",
      iconName: "Heart"
    }
  ]
};

export const TOYS_CATALOG: ToyProduct[] = [
  {
    id: "wood-train-01",
    name: "Classic Artisan Wooden Train Set",
    description: "A gorgeous modern modular wooden train set with stackable blocks, encouraging motor coordination and spatial exploration.",
    longDescription: "This beautifully designed train set consists of a solid natural wood locomotive and two cargo cars loaded with colorful, geometric wood blocks. Children can load, stack, arrange, and tow the blocks, encouraging open-ended sandbox play and developing basic fine motor skills. Handcrafted to a buttery-smooth perfection with natural grain elements.",
    features: [
      "15 modular wooden blocks in warm design-forward pastel hues",
      "Heavy durable magnetic connectors for easy toddler hookup",
      "Sanded triple-smooth to eliminate any splinters",
      "Finished with certified non-toxic plant pigments"
    ],
    price: 38.50,
    category: "Wooden Toys",
    rating: 4.9,
    image: "/src/assets/images/wooden_train_set_1779445000065.png",
    images: [
      "/src/assets/images/wooden_train_set_1779445000065.png",
      "https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545558014-868513582683?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop"
    ],
    stock: 500,
    dimensions: "14.5 x 3.2 w x 4.8 inches",
    materials: "Solid European Maple & Beech wood",
    recommendedAge: "18 Months+",
    isFeatured: true,
    reviews: [
      {
        id: "r1",
        userName: "Elena R.",
        rating: 5,
        comment: "Absolutely gorgeous toy. The sanding is incredibly smooth and the soft color palette looks fantastic in our living room instead of the usual bright neon clutter.",
        date: "2026-04-12"
      },
      {
        id: "r2",
        userName: "Marc K.",
        rating: 5,
        comment: "Exceptional quality. My toddler throws these blocks on the stone floor constantly and they haven't chipped once. True heritage quality.",
        date: "2026-05-01"
      }
    ]
  },
  {
    id: "plastic-stacker-02",
    name: "Premium Food-Grade Recycled Plastic Stacking Ring Set",
    description: "An ultra-safe, colorful stacking cone set made of food-grade, 100% recycled BPA-free premium bio-plastics.",
    longDescription: "Meet our premier infant physical development classic. Sourced from 100% ocean-bound recycled milk jugs, these stacking rings present zero risk of chemical leeching. Rounded edges, smooth weight balance, and a soft pleasant grip make this the ultimate water-safe, saliva-proof stacking toy for active, exploratory toddlers.",
    features: [
      "100% FDA-compliant food-grade recycled polymers",
      "Totally free from BPA, phthalates, and heavy metal finishes",
      "Hollow, floating waterproof rings ideal for bath-time play",
      "Durable non-warping concentric structures designed for early coordination"
    ],
    price: 24.00,
    category: "Plastic Toys",
    rating: 4.8,
    image: "/src/assets/images/teddy_plush_bear_1779445021922.png", // reusing local placeholder for catalog visual
    images: [
      "/src/assets/images/teddy_plush_bear_1779445021922.png",
      "https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1537655780520-1e392edd816a?q=80&w=600&auto=format&fit=crop"
    ],
    stock: 350,
    dimensions: "9.0 x 5.5 w x 5.5 inches",
    materials: "100% Recycled Food-Grade HDPE Bio-polymers",
    recommendedAge: "6 Months+",
    isFeatured: true,
    reviews: [
      {
        id: "r3",
        userName: "Sarah T.",
        rating: 5,
        comment: "My 8-month-old chews on these rings constantly. I love knowing they are chemical-free recycled food containers and super easy to throw in the dishwasher to clean!",
        date: "2026-03-22"
      }
    ]
  },
  {
    id: "rainbow-stack-03",
    name: "Montessori Rainbow Stacking Arch",
    description: "An elegant, multi-functional 9-arch rainbow stacking toy made of single-block timber for open-ended play.",
    longDescription: "Our Rainbow Stacking Arch is the ultimate definition of 'open-ended play'. Is it a bridge? A tunnel? A cradle? A fence? Children discover endless configurations, triggering architectural thinking and spatial balance. Sawn from a single solid block of beechwood, ensuring matching grains and heavy, satisfying durability.",
    features: [
      "9 piece nesting arches from natural large-trunk oakwood",
      "Velvety matte milk-paint finish for optimal grip while stacking",
      "Large enough to form beautiful geometric bedroom displays",
      "Inherent natural antiseptic qualities of native wood fibers"
    ],
    price: 45.00,
    category: "Wooden Toys",
    rating: 5.0,
    image: "/src/assets/images/wooden_rainbow_stack_1779445040487.png",
    images: [
      "/src/assets/images/wooden_rainbow_stack_1779445040487.png",
      "https://images.unsplash.com/photo-1545558014-868513582683?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545558014-c1a6cf03c22b?q=80&w=600&auto=format&fit=crop"
    ],
    stock: 450,
    dimensions: "12.2 x 2.8 w x 6.1 inches",
    materials: "Solid Single-Timber European Beech",
    recommendedAge: "18 Months+",
    isFeatured: true,
    reviews: [
      {
        id: "r4",
        userName: "Clara S.",
        rating: 5,
        comment: "I am amazed by the grip! The matte finish keeps the arches from sliding off when stacked in weird balancing poses. My 4-year-old builds crazy towers with this.",
        date: "2026-05-10"
      },
      {
        id: "r5",
        userName: "Aris P.",
        rating: 5,
        comment: "This is a sculpture! When my kids aren't playing, Google guests compliment us on this beautiful arch resting on our oak table. Timeless design.",
        date: "2026-05-18"
      }
    ]
  },
  {
    id: "castle-blocks-04",
    name: "Artisan Castle Building Blocks",
    description: "A premium 32-piece set of geometric solid wood building blocks finished in warm complementary pastel tones.",
    longDescription: "Designed to help children represent complex 3D structures, this castle block set includes cylinders, towers, arches, prisms, and triangular spires. Sized using precise mathematical modular units, these blocks help kids naturally discover concepts of fractions, balance, weight distribution, and architectural stability.",
    features: [
      "32 individual blocks stored beautifully in a heavy wooden display tray",
      "Tactile felt bottom lining on key pieces to prevent slipping",
      "Classic architectural shapes designed for stacking and balancing",
      "Eco-friendly natural timber aroma and beeswax polish coat"
    ],
    price: 49.00,
    category: "Wooden Toys",
    rating: 4.9,
    image: "/src/assets/images/wooden_castle_blocks_1779445058445.png",
    images: [
      "/src/assets/images/wooden_castle_blocks_1779445058445.png",
      "https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=600&auto=format&fit=crop"
    ],
    stock: 250,
    dimensions: "10.0 x 10.0 w x 3.0 inches (tray)",
    materials: "Solid White Oak and Hard Maple",
    recommendedAge: "3 Years+",
    isFeatured: true,
    reviews: [
      {
        id: "r6",
        userName: "Julian V.",
        rating: 4.8,
        comment: "Our kids spend hours designing tiny castles with real drawbridges. Best block set on the market. Sturdy and extremely solid.",
        date: "2026-04-30"
      }
    ]
  },
  {
    id: "metal-clock-05",
    name: "Precision Mechanical Brass & Metal Gear Learning Clock",
    description: "An educational, interactive heavy-duty alloy and brass gear learning toy for hours, counting, and alignment.",
    longDescription: "Constructed using high-density polished alloy sheets and mechanical brass gears, this learning clock helps kids explore physical math. Children turn the crank and watch real physical spur gears rotate sequentially, providing rich auditory clicks and mechanical tactile feedback that makes understanding analog time, fractions, and gear ratios deeply satisfying.",
    features: [
      "Real functional mechanical gears in smooth polished copper and brass alloys",
      "Heavy weighted sturdy base preventing sliding on desks or play mats",
      "Shatter-proof transparent glass-free window cover for maximum nursery safety",
      "Fully self-correcting alignment marks to teach hour-minute correlation"
    ],
    price: 34.50,
    category: "Metal Toys",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600&auto=format&fit=crop"
    ],
    stock: 600,
    dimensions: "8.5 x 8.5 w x 2.2 inches",
    materials: "Polished Lead-Free Brass, Copper, and Powder-Coated Alloys",
    recommendedAge: "3 Years+",
    reviews: [
      {
        id: "clock-rev-1",
        userName: "Keval S.",
        rating: 5,
        comment: "Excellent metal gear clock! Highly educational and the gears spin together like a dream. Kids are mesmerized.",
        date: "2026-05-15"
      }
    ]
  },
  {
    id: "plastic-boat-06",
    name: "Eco-Friendly Recycled Plastic Sand & Bath Boat Admiral Set",
    description: "A resilient, heavy-grade recycled marine plastic cruiser and sand molds for tactile water and beach play.",
    longDescription: "Our Sand & Bath Boat Set is designed to tackle backyards, pools, and salty beach waves with absolute ease. Formed strictly using heavy recycled HDPE marine plastic ropes and bottles, this incredibly rugged set stands up to physical wear and the most intensive summer UV sun exposure without fading or releasing volatile micro-plastics.",
    features: [
      "Crafted with 100% recycled beach-gathered polymers",
      "Excellent density and salt-water resistant structure",
      "Includes mini admiral ship, pouring cups, and sand sifting shovel",
      "No small loose parts, completely hypoallergenic and dishwasher-safe"
    ],
    price: 21.00,
    category: "Plastic Toys",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545558014-868513582683?q=80&w=600&auto=format&fit=crop"
    ],
    stock: 200,
    dimensions: "11.0 x 6.5 w x 5.0 inches",
    materials: "100% Recycled Marine HDPE High-Impact Polymers",
    recommendedAge: "12 Months+",
    reviews: [
      {
        id: "r7",
        userName: "Victoria D.",
        rating: 5,
        comment: "This has been a massive hit during bath-time and trips to the park sandbox! It's solid, doesn't scratch, clean of any odors.",
        date: "2026-05-14"
      }
    ]
  },
  {
    id: "wood-car-07",
    name: "Classic Timber Toy Roadster",
    description: "A solid walnut and ash wood miniature sports car with fluid-free rolling axle wheels.",
    longDescription: "This vintage-inspired roadster features beautiful, sleek styling that makes it just as handsome on an executive's desk as it is in a nursery sandbox. Crafted by laminating contrasting dark Walnut and gold Ash hardwoods together. Fits comfortable in small toddler-sized hands for smooth speed sliding.",
    features: [
      "Completely metal-free design utilizing tight interlocking joinery",
      "Natural premium contrasting hardwoods without artificial color dyes",
      "Silent rolling wheels that will never screech or damage floor surfaces",
      "Odorless finish derived from cold-pressed walnut oil"
    ],
    price: 24.50,
    category: "Wooden Toys",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=600&auto=format&fit=crop",
      "/src/assets/images/wooden_train_set_1779445000065.png"
    ],
    stock: 400,
    dimensions: "6.5 x 2.8 w x 2.2 inches",
    materials: "Premium Black Walnut and Golden Ash Wood",
    recommendedAge: "12 Months+",
    reviews: []
  },
  {
    id: "metal-rattle-08",
    name: "Vintage Rust-Free Fine Silver Baby Rattle & Bell Shaker",
    description: "A gorgeous, hand-polished silver alloy baby rattle utilizing internal bell clappers for soothing chimes.",
    longDescription: "Classic elegance for acoustic nursery stimulation. Hand-sanded to a gorgeous liquid mirror shine, this alloy rattle features fully encapsulated clappers that produce clean, soothing wind-chime acoustic sounds. Completely rust-proof, scratch-resistant, and chemically passive, this beautiful item represents a stunning heirloom accessory.",
    features: [
      "Encapsulated sound chambers—zero loose chime bits",
      "Hand-polished lead-free and nickel-free heavy-duty metal alloy",
      "Smooth round contours that are gentle on physical contact and grasp training",
      "Packaged inside a beautiful premium velvet carrying bag"
    ],
    price: 19.90,
    category: "Metal Toys",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop",
      "/src/assets/images/teddy_plush_bear_1779445021922.png",
      "/src/assets/images/wooden_rainbow_stack_1779445040487.png"
    ],
    stock: 800,
    dimensions: "5.5 x 1.8 w x 1.8 inches",
    materials: "Polished Safe Rust-Free Zinc-Silver Alloy",
    recommendedAge: "3 Months+",
    reviews: [
      {
        id: "r8",
        userName: "Becca F.",
        rating: 5,
        comment: "This is beautiful. The chime is a lovely soft sound instead of the typical loud harsh plastic rattle. Our newborn turns her head toward the sound immediately.",
        date: "2026-05-19"
      }
    ]
  }
];
