export interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface Step {
  title: string;
  description: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Idea {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  gradient: string;
  accentColor: string;
  iconName: string;
  steps: Step[];
  features: Feature[];
  pricing: PricingTier[];
  testimonials: Testimonial[];
}

export const ideas: Idea[] = [
  {
    id: "datashield",
    name: "DataShield",
    tagline: "Your personal data doesn't belong to brokers.",
    description: "Automated personal data broker monitoring and removal. We continuously scan hundreds of data brokers and submit removal requests on your behalf.",
    problem: "Your name, address, phone number, and personal details are sold by hundreds of data brokers without your consent. Manually finding and removing yourself takes 100+ hours per year — and they re-list you within months.",
    gradient: "from-blue-600 to-indigo-700",
    accentColor: "blue",
    iconName: "Shield",
    steps: [
      { title: "Connect", description: "Enter your name and basic info. We scan 400+ data broker databases." },
      { title: "Remove", description: "We automatically submit opt-out and removal requests on your behalf." },
      { title: "Monitor", description: "Continuous monitoring catches re-listings and new exposures." },
    ],
    features: [
      { icon: "Search", title: "400+ Broker Scans", description: "We monitor the largest data broker networks across the internet." },
      { icon: "Trash2", title: "Automated Removal", description: "CCPA/GDPR-compliant removal requests filed automatically." },
      { icon: "Bell", title: "Re-listing Alerts", description: "Get notified instantly when a broker re-lists your information." },
      { icon: "BarChart3", title: "Exposure Dashboard", description: "See exactly where your data exists and track removal progress." },
    ],
    pricing: [
      { name: "Personal", price: "$9", period: "/mo", features: ["1 identity profile", "Quarterly scans", "Email removal requests", "Basic dashboard"], cta: "Start Free Trial" },
      { name: "Pro", price: "$19", period: "/mo", features: ["Up to 3 profiles", "Monthly scans", "Automated removal", "Priority processing", "Re-listing alerts"], highlighted: true, cta: "Start Free Trial" },
      { name: "Family", price: "$39", period: "/mo", features: ["Up to 8 profiles", "Weekly scans", "Legal escalation", "Dedicated support", "Annual exposure report"], cta: "Contact Sales" },
    ],
    testimonials: [
      { quote: "I found my home address on 47 different sites. DataShield removed me from all of them in under a month.", name: "Sarah K.", role: "Marketing Director" },
      { quote: "After a stalking incident, DataShield gave me peace of mind I couldn't get anywhere else.", name: "James R.", role: "Software Engineer" },
    ],
  },
  {
    id: "mealsync",
    name: "MealSync",
    tagline: "Eat well without the mental load.",
    description: "AI-generated weekly meal plans with auto-generated grocery lists, tailored to your dietary needs, household size, and budget.",
    problem: "The average household spends 5+ hours per week deciding what to eat, shopping inefficiently, and wasting food. Decision fatigue around meals leads to unhealthy choices and overspending.",
    gradient: "from-orange-500 to-red-500",
    accentColor: "orange",
    iconName: "UtensilsCrossed",
    steps: [
      { title: "Set Preferences", description: "Tell us your dietary needs, allergies, budget, and household size." },
      { title: "Get Your Plan", description: "Receive a personalized weekly meal plan every Sunday evening." },
      { title: "Shop & Cook", description: "One-tap grocery list organized by store aisle. Recipes included." },
    ],
    features: [
      { icon: "Leaf", title: "Diet-Aware", description: "Supports keto, vegan, paleo, FODMAP, allergen-free, and 30+ dietary profiles." },
      { icon: "DollarSign", title: "Budget Control", description: "Set a weekly food budget and we'll optimize meals to stay under it." },
      { icon: "Repeat", title: "Zero Waste", description: "Ingredients carry across meals — nothing rots in your fridge." },
      { icon: "ShoppingCart", title: "Smart Lists", description: "Grocery lists auto-organized by store section with quantity optimization." },
    ],
    pricing: [
      { name: "Solo", price: "$6", period: "/mo", features: ["1-2 person plans", "3 meals/day", "Basic grocery lists", "Swap suggestions"], cta: "Try Free for 14 Days" },
      { name: "Family", price: "$12", period: "/mo", features: ["2-6 person plans", "Custom meal count", "Aisle-organized lists", "Nutrition tracking", "Leftover recipes"], highlighted: true, cta: "Try Free for 14 Days" },
      { name: "Premium", price: "$20", period: "/mo", features: ["Unlimited household size", "Instacart integration", "Macro targets", "Chef-level recipes", "Dietitian review"], cta: "Try Free for 14 Days" },
    ],
    testimonials: [
      { quote: "We cut our grocery bill by 30% and stopped throwing food away. The meal plans actually taste great.", name: "Maria L.", role: "Mother of Three" },
      { quote: "As someone with celiac, having a system that truly understands cross-contamination risks is life-changing.", name: "David P.", role: "Teacher" },
    ],
  },
  {
    id: "micromentor",
    name: "MicroMentor",
    tagline: "5 minutes a day. Career-defining skills.",
    description: "Daily micro-lessons for high-value professional skills — negotiation, persuasive writing, data literacy, leadership, and more.",
    problem: "Most professionals know they should be upskilling but can't commit to hour-long courses. Traditional learning platforms have 90%+ dropout rates because they demand too much time and lack practical application.",
    gradient: "from-violet-600 to-purple-700",
    accentColor: "violet",
    iconName: "GraduationCap",
    steps: [
      { title: "Choose Skills", description: "Pick from 40+ skill tracks spanning leadership, technical, and creative domains." },
      { title: "Learn Daily", description: "5-minute lessons with real-world scenarios delivered at your preferred time." },
      { title: "Apply & Grow", description: "Weekly challenges and spaced repetition lock in what you've learned." },
    ],
    features: [
      { icon: "Clock", title: "5-Minute Format", description: "Designed for busy professionals. Learn during your commute or coffee break." },
      { icon: "Target", title: "Scenario-Based", description: "Every lesson includes a real-world scenario you can apply immediately." },
      { icon: "Brain", title: "Spaced Repetition", description: "AI schedules reviews at optimal intervals for long-term retention." },
      { icon: "Award", title: "Skill Certificates", description: "Earn verifiable certificates after completing skill tracks." },
    ],
    pricing: [
      { name: "Starter", price: "$7", period: "/mo", features: ["2 skill tracks", "Daily lessons", "Progress tracking", "Mobile app"], cta: "Start Learning" },
      { name: "Professional", price: "$15", period: "/mo", features: ["Unlimited tracks", "Weekly challenges", "Spaced repetition", "Certificates", "Team leaderboards"], highlighted: true, cta: "Start Learning" },
      { name: "Enterprise", price: "$8", period: "/user/mo", features: ["Admin dashboard", "Custom tracks", "Analytics", "SSO integration", "Priority support"], cta: "Contact Sales" },
    ],
    testimonials: [
      { quote: "The negotiation track literally paid for itself when I used the BATNA framework in my salary review.", name: "Alex T.", role: "Product Manager" },
      { quote: "I've tried Coursera, Udemy, and LinkedIn Learning. MicroMentor is the only one I actually finish.", name: "Priya S.", role: "Data Analyst" },
    ],
  },
  {
    id: "greenthumb-ai",
    name: "GreenThumb AI",
    tagline: "Never kill another houseplant.",
    description: "Smart plant care schedules and disease detection from phone photos. Personalized to your plants, light conditions, and climate zone.",
    problem: "80% of houseplant owners have killed a plant from overwatering, underwatering, or misdiagnosis. Generic care guides don't account for your specific light, humidity, and seasonal conditions.",
    gradient: "from-green-500 to-emerald-600",
    accentColor: "green",
    iconName: "Sprout",
    steps: [
      { title: "Snap & Add", description: "Photograph your plant — we identify the species and log it to your garden." },
      { title: "Get Schedules", description: "Receive watering, feeding, and repotting reminders tuned to your environment." },
      { title: "Diagnose Issues", description: "Snap a photo of brown leaves or spots — get an instant AI diagnosis." },
    ],
    features: [
      { icon: "Camera", title: "Photo ID", description: "Identify any plant from a photo. Covers 10,000+ species." },
      { icon: "Droplets", title: "Smart Watering", description: "Schedules adjust based on season, humidity, and pot size." },
      { icon: "Bug", title: "Disease Detection", description: "AI vision detects pests, fungal infections, and nutrient deficiencies." },
      { icon: "Sun", title: "Light Mapping", description: "Analyze your window light to recommend optimal plant placement." },
    ],
    pricing: [
      { name: "Seedling", price: "$4", period: "/mo", features: ["Up to 10 plants", "Watering reminders", "Plant ID (5/mo)", "Basic care guides"], cta: "Plant Your Garden" },
      { name: "Gardener", price: "$9", period: "/mo", features: ["Unlimited plants", "Disease detection", "Unlimited plant ID", "Light analysis", "Seasonal guides"], highlighted: true, cta: "Plant Your Garden" },
      { name: "Greenhouse", price: "$18", period: "/mo", features: ["Everything in Gardener", "IoT sensor integration", "Growth timelapse", "Expert consultations", "Multi-location"], cta: "Plant Your Garden" },
    ],
    testimonials: [
      { quote: "My monstera was dying and I thought it needed more water. GreenThumb diagnosed root rot instantly. Saved it.", name: "Lin W.", role: "Interior Designer" },
      { quote: "I now have 30+ plants thriving in my apartment. The light mapping feature is genius.", name: "Carlos M.", role: "Remote Worker" },
    ],
  },
  {
    id: "contractguard",
    name: "ContractGuard",
    tagline: "Read the fine print. Automatically.",
    description: "AI-powered contract and Terms of Service scanner that flags risky clauses, hidden fees, and unfavorable terms before you sign.",
    problem: "The average person agrees to 150+ Terms of Service per year without reading them. Buried in that legalese are data selling clauses, auto-renewal traps, arbitration waivers, and liability shifts that cost real money.",
    gradient: "from-amber-500 to-orange-600",
    accentColor: "amber",
    iconName: "FileSearch",
    steps: [
      { title: "Upload or Paste", description: "Drop in a contract, paste a ToS URL, or use our browser extension." },
      { title: "Instant Analysis", description: "AI highlights risky clauses with plain-English explanations and severity ratings." },
      { title: "Negotiate Better", description: "Get suggested counter-language and negotiation points for flagged terms." },
    ],
    features: [
      { icon: "AlertTriangle", title: "Risk Scoring", description: "Every clause gets a risk score from green (standard) to red (dangerous)." },
      { icon: "Globe", title: "Browser Extension", description: "Auto-scan Terms of Service on any website before you click 'Agree'." },
      { icon: "Scale", title: "Counter-Language", description: "AI generates professional counter-proposals for unfavorable clauses." },
      { icon: "History", title: "Change Tracking", description: "Get alerts when companies quietly update their terms." },
    ],
    pricing: [
      { name: "Personal", price: "$8", period: "/mo", features: ["5 scans/month", "ToS scanning", "Risk highlighting", "Browser extension"], cta: "Scan Your First Contract" },
      { name: "Professional", price: "$24", period: "/mo", features: ["Unlimited scans", "Counter-language", "Change tracking", "Lease & employment contracts", "Export reports"], highlighted: true, cta: "Scan Your First Contract" },
      { name: "Legal Team", price: "$49", period: "/mo", features: ["Everything in Pro", "Team sharing", "Custom risk rules", "API access", "Compliance templates"], cta: "Contact Sales" },
    ],
    testimonials: [
      { quote: "ContractGuard caught a non-compete clause in a freelance contract that would have locked me out of my industry for 2 years.", name: "Rachel N.", role: "Freelance Designer" },
      { quote: "We run every vendor contract through it now. Saved us $40K in hidden fee clauses last quarter.", name: "Tom H.", role: "Procurement Lead" },
    ],
  },
  {
    id: "fitloop",
    name: "FitLoop",
    tagline: "Workouts that adapt. Results that compound.",
    description: "Adaptive workout programs that auto-adjust based on your recovery, sleep quality, stress levels, and training progress.",
    problem: "Static workout plans don't account for how your body actually feels day-to-day. Training too hard when under-recovered causes injury; training too light wastes time. Most people lack the coaching expertise to auto-regulate properly.",
    gradient: "from-rose-500 to-pink-600",
    accentColor: "rose",
    iconName: "Dumbbell",
    steps: [
      { title: "Set Goals", description: "Strength, endurance, body composition, or sport-specific — tell us your target." },
      { title: "Check In Daily", description: "30-second daily readiness survey adjusts today's workout intensity." },
      { title: "Train Smart", description: "Follow your personalized session. Weights, reps, and rest auto-calibrated." },
    ],
    features: [
      { icon: "Activity", title: "Readiness Score", description: "Combines sleep, stress, soreness, and HRV into a daily training readiness score." },
      { icon: "TrendingUp", title: "Progressive Overload", description: "AI manages load progression so you build strength without plateaus." },
      { icon: "Heart", title: "Wearable Sync", description: "Integrates with Apple Watch, Garmin, Whoop, and Oura for biometric data." },
      { icon: "RefreshCw", title: "Deload Intelligence", description: "Automatically programs recovery weeks when fatigue accumulates." },
    ],
    pricing: [
      { name: "Basic", price: "$10", period: "/mo", features: ["Adaptive workouts", "Daily readiness", "Exercise library", "Progress photos"], cta: "Start Training" },
      { name: "Performance", price: "$20", period: "/mo", features: ["Wearable integration", "Nutrition guidance", "Video form checks", "Deload management", "Multiple programs"], highlighted: true, cta: "Start Training" },
      { name: "Coached", price: "$60", period: "/mo", features: ["Everything in Performance", "Monthly coach check-in", "Custom programming", "Competition prep", "Injury management"], cta: "Get Coached" },
    ],
    testimonials: [
      { quote: "I was overtraining and didn't know it. FitLoop's readiness score showed me I needed 2 rest days, and my deadlift jumped 30lbs the next week.", name: "Mike D.", role: "Amateur Powerlifter" },
      { quote: "Finally a fitness app that doesn't just give me a static plan and ghost me.", name: "Nina C.", role: "Busy Professional" },
    ],
  },
  {
    id: "inboxzero-pro",
    name: "InboxZero Pro",
    tagline: "Your inbox, on autopilot.",
    description: "AI email triage that auto-categorizes, drafts replies, and surfaces what actually matters — so you spend minutes, not hours, in email.",
    problem: "The average professional spends 28% of their workweek on email. Most of it is noise: newsletters, notifications, CC chains, and low-priority requests. Without ruthless triage, important messages get buried.",
    gradient: "from-cyan-500 to-blue-600",
    accentColor: "cyan",
    iconName: "Mail",
    steps: [
      { title: "Connect", description: "Link your Gmail or Outlook. We never store email content — processing happens in-memory." },
      { title: "Train", description: "Spend 5 minutes teaching the AI your priorities. It learns fast from a few examples." },
      { title: "Breathe", description: "Wake up to a prioritized inbox with draft replies ready for one-click send." },
    ],
    features: [
      { icon: "Layers", title: "Smart Categories", description: "Auto-sorts into Action Required, FYI, Waiting On, and Delegatable." },
      { icon: "Zap", title: "Draft Replies", description: "AI drafts context-aware replies in your writing style. Edit and send." },
      { icon: "BellOff", title: "Noise Filter", description: "Newsletters, notifications, and cold outreach auto-archived." },
      { icon: "Clock", title: "Send Later", description: "Schedule emails for optimal delivery time based on recipient behavior." },
    ],
    pricing: [
      { name: "Personal", price: "$8", period: "/mo", features: ["1 email account", "Smart categories", "Noise filtering", "Daily digest"], cta: "Tame Your Inbox" },
      { name: "Professional", price: "$18", period: "/mo", features: ["3 accounts", "Draft replies", "Send scheduling", "Follow-up reminders", "Analytics"], highlighted: true, cta: "Tame Your Inbox" },
      { name: "Team", price: "$14", period: "/user/mo", features: ["Shared inboxes", "Delegation routing", "SLA tracking", "Admin controls", "Priority support"], cta: "Contact Sales" },
    ],
    testimonials: [
      { quote: "I went from 3 hours of email per day to 20 minutes. The draft replies are eerily good — I just tweak and send.", name: "Vanessa M.", role: "VP of Sales" },
      { quote: "The noise filter alone is worth the subscription. I didn't realize 60% of my inbox was junk.", name: "Derek L.", role: "Startup Founder" },
    ],
  },
  {
    id: "homekeeper",
    name: "HomeKeeper",
    tagline: "Your home's maintenance calendar.",
    description: "Seasonal home maintenance reminders with vetted local vendor matching. Never forget to clean your gutters, service your HVAC, or winterize your pipes again.",
    problem: "Homeowners forget preventive maintenance until something breaks — and emergency repairs cost 3-10x more than scheduled upkeep. The average homeowner faces $3,000+ in preventable repair costs annually.",
    gradient: "from-teal-500 to-green-600",
    accentColor: "teal",
    iconName: "Home",
    steps: [
      { title: "Profile Your Home", description: "Enter your home's age, type, systems, and location. Takes 5 minutes." },
      { title: "Get Your Calendar", description: "Receive a customized year-round maintenance schedule with seasonal tasks." },
      { title: "Book or DIY", description: "One-tap booking with vetted local pros, or follow our DIY guides." },
    ],
    features: [
      { icon: "Calendar", title: "Smart Scheduling", description: "Tasks timed to your climate zone, home age, and equipment warranty cycles." },
      { icon: "Wrench", title: "Vendor Matching", description: "Pre-vetted, insured local contractors with transparent pricing." },
      { icon: "BookOpen", title: "DIY Guides", description: "Step-by-step video guides for tasks you want to handle yourself." },
      { icon: "PiggyBank", title: "Cost Tracking", description: "Track maintenance spending and see how much you're saving vs. emergency repairs." },
    ],
    pricing: [
      { name: "Starter", price: "$5", period: "/mo", features: ["1 property", "Seasonal reminders", "DIY guides", "Basic scheduling"], cta: "Protect Your Home" },
      { name: "Homeowner", price: "$12", period: "/mo", features: ["1 property", "Vendor matching", "Priority booking", "Cost tracking", "Appliance warranties"], highlighted: true, cta: "Protect Your Home" },
      { name: "Landlord", price: "$25", period: "/mo", features: ["Up to 5 properties", "Tenant coordination", "Expense reporting", "Vendor management", "Tax-ready records"], cta: "Protect Your Home" },
    ],
    testimonials: [
      { quote: "HomeKeeper reminded me to flush my water heater. My plumber said the sediment buildup would have killed it within a year — that's a $1,500 replacement avoided.", name: "Greg P.", role: "First-Time Homeowner" },
      { quote: "Managing 3 rental properties used to be chaos. Now I get a single dashboard with every task scheduled.", name: "Angela B.", role: "Real Estate Investor" },
    ],
  },
  {
    id: "petpulse",
    name: "PetPulse",
    tagline: "Know your pet better than they know themselves.",
    description: "Pet health and behavior tracking with vet-grade insights and early warning alerts. Catch health issues before they become emergencies.",
    problem: "Pets can't tell you when something is wrong. By the time symptoms are visible, conditions are often advanced and expensive to treat. 60% of pet owners miss early signs of illness because they don't know what to look for.",
    gradient: "from-yellow-500 to-amber-600",
    accentColor: "yellow",
    iconName: "Cat",
    steps: [
      { title: "Add Your Pet", description: "Enter breed, age, weight, and medical history. Import vet records if available." },
      { title: "Log Daily", description: "Quick daily check-ins: eating, energy, bathroom, mood. Takes 30 seconds." },
      { title: "Get Insights", description: "AI spots trends and flags anomalies before they become emergencies." },
    ],
    features: [
      { icon: "Activity", title: "Trend Detection", description: "AI analyzes patterns in eating, activity, and behavior to catch early warning signs." },
      { icon: "Stethoscope", title: "Symptom Checker", description: "Describe symptoms and get breed-specific guidance on urgency level." },
      { icon: "Pill", title: "Med Reminders", description: "Never miss a dose — medication and vaccine schedule management." },
      { icon: "FileText", title: "Vet Reports", description: "Generate shareable health reports for vet visits with all logged data." },
    ],
    pricing: [
      { name: "Single Pet", price: "$5", period: "/mo", features: ["1 pet profile", "Daily logging", "Med reminders", "Basic insights"], cta: "Start Tracking" },
      { name: "Multi-Pet", price: "$10", period: "/mo", features: ["Up to 4 pets", "Trend detection", "Symptom checker", "Vet reports", "Food tracking"], highlighted: true, cta: "Start Tracking" },
      { name: "Breeder", price: "$30", period: "/mo", features: ["Unlimited pets", "Litter tracking", "Health certificates", "Lineage records", "Multi-user access"], cta: "Contact Sales" },
    ],
    testimonials: [
      { quote: "PetPulse flagged that my dog's water intake had doubled over two weeks. Turned out to be early-stage kidney disease — caught it in time.", name: "Emily R.", role: "Dog Owner" },
      { quote: "The vet report feature saves me from fumbling through texts trying to remember when symptoms started.", name: "Jordan K.", role: "Cat Parent" },
    ],
  },
  {
    id: "wardrobeiq",
    name: "WardrobeIQ",
    tagline: "Style yourself with what you already own.",
    description: "AI stylist that builds daily outfits from the clothes you already own, factoring in weather, calendar events, and your personal style.",
    problem: "The average person wears only 20% of their wardrobe. People buy new clothes out of outfit paralysis — not lack of options. Meanwhile, decision fatigue over what to wear wastes 15+ minutes daily.",
    gradient: "from-fuchsia-500 to-pink-600",
    accentColor: "fuchsia",
    iconName: "Shirt",
    steps: [
      { title: "Photograph Wardrobe", description: "Snap photos of your clothes. AI categorizes and tags each piece automatically." },
      { title: "Get Daily Outfits", description: "Wake up to outfit suggestions based on weather, calendar, and style preferences." },
      { title: "Discover Gaps", description: "See what versatile pieces would unlock the most new outfit combinations." },
    ],
    features: [
      { icon: "Camera", title: "Auto-Cataloging", description: "Photograph your clothes and AI categorizes color, season, formality, and style." },
      { icon: "CloudSun", title: "Weather-Aware", description: "Outfit suggestions account for today's temperature, rain, and humidity." },
      { icon: "CalendarDays", title: "Calendar Sync", description: "Dresses you for meetings, dates, casual Fridays, and workouts." },
      { icon: "Sparkles", title: "Style Learning", description: "The more you rate outfits, the better it understands your aesthetic." },
    ],
    pricing: [
      { name: "Basic", price: "$6", period: "/mo", features: ["50-item wardrobe", "Daily suggestions", "Weather integration", "Style quiz"], cta: "Style Yourself" },
      { name: "Stylist", price: "$14", period: "/mo", features: ["Unlimited wardrobe", "Calendar sync", "Gap analysis", "Occasion planning", "Color analysis"], highlighted: true, cta: "Style Yourself" },
      { name: "Luxe", price: "$29", period: "/mo", features: ["Everything in Stylist", "Personal stylist chat", "Brand recommendations", "Capsule wardrobe builder", "Seasonal refresh"], cta: "Style Yourself" },
    ],
    testimonials: [
      { quote: "I 'had nothing to wear' with a full closet. WardrobeIQ showed me 200+ outfit combinations I'd never considered.", name: "Olivia S.", role: "Attorney" },
      { quote: "The gap analysis told me one navy blazer would unlock 40 new outfits. Best $80 I've spent.", name: "Marcus T.", role: "Consultant" },
    ],
  },
  {
    id: "dreamlog",
    name: "DreamLog",
    tagline: "Decode the stories your mind tells at night.",
    description: "AI dream journaling with voice-to-text logging, pattern analysis, recurring theme detection, and lucid dreaming coaching.",
    problem: "We forget 95% of our dreams within 5 minutes of waking. Dreams contain valuable signals about stress, unresolved emotions, and creative insights — but capturing and analyzing them requires tools that match the half-asleep state of a just-waking mind.",
    gradient: "from-indigo-600 to-blue-800",
    accentColor: "indigo",
    iconName: "Moon",
    steps: [
      { title: "Wake & Record", description: "Mumble your dream into the app. Voice-to-text captures everything while you're still groggy." },
      { title: "AI Structures", description: "Raw narration gets organized into scenes, characters, emotions, and symbols." },
      { title: "Find Patterns", description: "Over time, AI reveals recurring themes, emotional arcs, and symbolic patterns." },
    ],
    features: [
      { icon: "Mic", title: "Voice Capture", description: "Optimized for sleepy mumbling. Records and transcribes with high accuracy." },
      { icon: "Tags", title: "Auto-Tagging", description: "AI tags people, places, emotions, and symbols across all your dreams." },
      { icon: "TrendingUp", title: "Pattern Analysis", description: "Discover recurring themes correlated with life events and stress levels." },
      { icon: "Sparkles", title: "Lucid Training", description: "Reality check reminders and MILD/WBTB technique coaching." },
    ],
    pricing: [
      { name: "Dreamer", price: "$5", period: "/mo", features: ["Voice & text logging", "Auto-tagging", "Dream timeline", "Basic patterns"], cta: "Start Dreaming" },
      { name: "Explorer", price: "$12", period: "/mo", features: ["Advanced analysis", "Theme tracking", "Emotional mapping", "Lucid dream coaching", "Export journal"], highlighted: true, cta: "Start Dreaming" },
      { name: "Researcher", price: "$25", period: "/mo", features: ["Everything in Explorer", "API access", "Data export", "Sleep stage correlation", "Group studies"], cta: "Contact Us" },
    ],
    testimonials: [
      { quote: "I discovered I dream about water every time I'm anxious about deadlines. That self-awareness alone was worth it.", name: "Julia F.", role: "Therapist" },
      { quote: "Achieved my first lucid dream after 3 weeks with the MILD technique coaching. Incredible experience.", name: "Ryan W.", role: "Grad Student" },
    ],
  },
  {
    id: "sidehustle-radar",
    name: "SideHustle Radar",
    tagline: "Opportunities that match your skills, not your desperation.",
    description: "Weekly curated gig and freelance opportunities matched to your skills, availability, and income goals — filtered from 50+ platforms so you don't have to scroll.",
    problem: "Finding quality freelance work means checking Upwork, Fiverr, Toptal, job boards, and dozens of niche platforms daily. 90% of gig listings are low-paying noise. The search itself becomes an unpaid job.",
    gradient: "from-emerald-500 to-teal-600",
    accentColor: "emerald",
    iconName: "Radar",
    steps: [
      { title: "Build Your Profile", description: "Enter your skills, hourly rate floor, hours available, and work preferences." },
      { title: "Get Matches", description: "Weekly digest of curated opportunities from 50+ platforms, pre-filtered to your criteria." },
      { title: "Apply Fast", description: "One-click applications with auto-generated cover letters tailored to each gig." },
    ],
    features: [
      { icon: "Filter", title: "Quality Filter", description: "AI scores opportunities by pay rate, client history, and project clarity." },
      { icon: "Globe", title: "50+ Platforms", description: "We aggregate from Upwork, Toptal, Contra, We Work Remotely, and more." },
      { icon: "FileText", title: "Auto Cover Letters", description: "AI generates personalized applications based on your profile and the gig." },
      { icon: "TrendingUp", title: "Rate Intelligence", description: "See what your skills are worth and when rates are trending up." },
    ],
    pricing: [
      { name: "Scout", price: "$9", period: "/mo", features: ["Weekly digest", "3 skill categories", "Quality filtering", "Rate benchmarks"], cta: "Find Opportunities" },
      { name: "Hunter", price: "$19", period: "/mo", features: ["Daily alerts", "Unlimited skills", "Auto cover letters", "Client scoring", "Application tracking"], highlighted: true, cta: "Find Opportunities" },
      { name: "Agency", price: "$39", period: "/mo", features: ["Team profiles", "Lead distribution", "Pipeline management", "Revenue forecasting", "White-label proposals"], cta: "Contact Sales" },
    ],
    testimonials: [
      { quote: "SideHustle Radar found me a $5K/month retainer client on a platform I'd never heard of. ROI was immediate.", name: "Aiden G.", role: "Freelance Developer" },
      { quote: "I stopped wasting 10 hours a week scrolling job boards. Now the good opportunities come to me.", name: "Sophie L.", role: "UX Designer" },
    ],
  },
  {
    id: "calmcycle",
    name: "CalmCycle",
    tagline: "Burnout prevention, not burnout recovery.",
    description: "Personalized stress and burnout prevention using biometric data, behavioral signals, and evidence-based micro-interventions delivered at the right moment.",
    problem: "Burnout costs U.S. employers $125-190 billion in healthcare annually — and the individual toll is devastating. Most people don't recognize burnout until they're already in crisis. Prevention requires catching the early signals.",
    gradient: "from-sky-400 to-blue-500",
    accentColor: "sky",
    iconName: "HeartPulse",
    steps: [
      { title: "Baseline", description: "Connect wearables and complete a brief assessment. We establish your personal baseline." },
      { title: "Monitor", description: "Continuous tracking of HRV, sleep, screen time, and self-reported mood." },
      { title: "Intervene", description: "When stress builds, receive timely micro-interventions: breathing, walks, boundaries." },
    ],
    features: [
      { icon: "Activity", title: "Burnout Score", description: "Proprietary score combining physiological and behavioral markers of chronic stress." },
      { icon: "Wind", title: "Breathing Exercises", description: "Guided breathing sessions triggered when your stress metrics spike." },
      { icon: "Calendar", title: "Calendar Defense", description: "Flags over-scheduled days and suggests protected recovery blocks." },
      { icon: "LineChart", title: "Trend Reports", description: "Weekly and monthly reports showing your stress trajectory and interventions." },
    ],
    pricing: [
      { name: "Self-Care", price: "$8", period: "/mo", features: ["Burnout score", "Daily check-ins", "Breathing exercises", "Sleep tracking"], cta: "Protect Your Energy" },
      { name: "Resilience", price: "$16", period: "/mo", features: ["Wearable sync", "Calendar defense", "Micro-interventions", "Trend reports", "Therapist sharing"], highlighted: true, cta: "Protect Your Energy" },
      { name: "Workplace", price: "$10", period: "/user/mo", features: ["Team dashboards", "Anonymous insights", "Manager alerts", "EAP integration", "ROI reporting"], cta: "Contact Sales" },
    ],
    testimonials: [
      { quote: "CalmCycle's calendar defense feature showed me I had zero recovery blocks in a 60-hour work week. That visualization was the wake-up call I needed.", name: "Diana P.", role: "Engineering Manager" },
      { quote: "The breathing exercises hit at exactly the right time — right before my stress spills into meetings.", name: "Raj M.", role: "Startup CTO" },
    ],
  },
  {
    id: "apibundle",
    name: "APIBundle",
    tagline: "One subscription. Every API you need.",
    description: "Bundled API credits for indie developers and small teams. Access dozens of AI, data, and infrastructure APIs through a single account and billing relationship.",
    problem: "Indie developers juggle 10+ API subscriptions with different billing cycles, rate limits, auth methods, and documentation formats. Each one requires a separate account, credit card, and mental overhead. The friction kills experimentation.",
    gradient: "from-slate-600 to-gray-800",
    accentColor: "slate",
    iconName: "Code",
    steps: [
      { title: "Subscribe", description: "Pick a credit tier. Credits work across all bundled APIs." },
      { title: "Integrate", description: "One SDK, one API key, unified documentation. Swap between providers in one line." },
      { title: "Scale", description: "Upgrade tiers as you grow. No per-API commitments or minimum spends." },
    ],
    features: [
      { icon: "Package", title: "40+ APIs", description: "AI models, email delivery, payments, maps, storage, analytics — one key." },
      { icon: "Key", title: "Unified Auth", description: "Single API key and SDK. No more juggling credentials across services." },
      { icon: "BarChart3", title: "Usage Dashboard", description: "Real-time credit usage across all APIs with cost forecasting." },
      { icon: "ArrowLeftRight", title: "Provider Swap", description: "Switch between equivalent providers (e.g., SendGrid ↔ Postmark) in one line." },
    ],
    pricing: [
      { name: "Hacker", price: "$19", period: "/mo", features: ["$25 in API credits", "10 APIs included", "Basic dashboard", "Community support"], cta: "Start Building" },
      { name: "Builder", price: "$49", period: "/mo", features: ["$75 in API credits", "All 40+ APIs", "Team access", "Priority support", "Usage alerts"], highlighted: true, cta: "Start Building" },
      { name: "Studio", price: "$149", period: "/mo", features: ["$250 in API credits", "Volume discounts", "SLA guarantees", "Dedicated support", "Custom integrations"], cta: "Talk to Us" },
    ],
    testimonials: [
      { quote: "I prototyped an app using 6 different APIs in a weekend. One SDK, one bill. This is how APIs should work.", name: "Kevin Z.", role: "Indie Developer" },
      { quote: "We switched from managing 12 API subscriptions to one APIBundle account. Saved our ops team hours every month.", name: "Lisa T.", role: "CTO, 5-Person Startup" },
    ],
  },
];
