import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Info, Plane, Train, Bus, Car } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
const places = [
  {
    id: 1,
    name: "Taj Mahal",
    location: "Agra",
    state: "Uttar Pradesh",
    description: "An ivory-white marble mausoleum commissioned by Mughal emperor Shah Jahan for his beloved wife Mumtaz Mahal. It is considered one of the finest examples of Mughal architecture and a symbol of eternal love.",
    detailedInfo: "The Taj Mahal stands as the ultimate monument of love, built by Emperor Shah Jahan in memory of his third wife, Mumtaz Mahal, who died during childbirth in 1631. Construction began in 1632 and took approximately 22 years to complete, employing over 20,000 artisans and craftsmen from across India and Central Asia. The complex includes a main gateway, gardens, mosque, guest house, and the iconic mausoleum with its stunning white marble dome that appears to change color throughout the day. The intricate inlay work features precious and semi-precious stones including jade, crystal, lapis lazuli, amethyst, and turquoise formed into elaborate floral designs. Recognized as a UNESCO World Heritage Site in 1983, it attracts 7-8 million visitors annually and is widely considered the jewel of Muslim art in India.",
    yearBuilt: "1632-1653",
    unescoCite: true,
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
    coordinates: { x: 52, y: 42 },
    transport: [
      { type: "flight", available: true, details: "Agra Airport (Kheria)", nearestHub: "13 km from city center" },
      { type: "train", available: true, details: "Agra Cantt Railway Station", nearestHub: "Major junction, 6 km from Taj Mahal" },
      { type: "bus", available: true, details: "Regular buses from Delhi, Jaipur", nearestHub: "ISBT Agra, 7 km away" },
      { type: "auto", available: true, details: "Auto-rickshaws & taxis readily available", nearestHub: "Throughout the city" }
    ],
    bestTimeToVisit: "October to March",
    entryFee: "\u20B950 for Indians, \u20B91100 for foreigners",
    timings: "6:00 AM - 6:30 PM (Closed on Fridays)"
  },
  {
    id: 2,
    name: "Red Fort",
    location: "Delhi",
    state: "Delhi",
    description: "A historic fort and palace complex that served as the main residence of Mughal emperors for nearly 200 years. Built with red sandstone, it represents the peak of Mughal creativity.",
    detailedInfo: "The Red Fort, or Lal Qila, was the main residence of Mughal emperors for nearly 200 years until 1857. Constructed by Emperor Shah Jahan when he decided to shift his capital from Agra to Delhi, the fort took 10 years to complete (1638-1648). The massive structure is octagonal in shape, spanning 254 acres, and is enclosed by 2.4 km of defensive walls ranging from 16-33 meters in height. The fort contains several palaces including Diwan-i-Aam (Hall of Public Audience), Diwan-i-Khas (Hall of Private Audience), and the Rang Mahal (Palace of Colors). The famous Peacock Throne, studded with precious gems, once stood here before being looted. The Prime Minister of India hoists the national flag here every Independence Day, making it a symbol of India's sovereignty and pride.",
    yearBuilt: "1638-1648",
    unescoCite: true,
    imageUrl: "https://images.unsplash.com/photo-1713729991304-d0b6c328560e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBmb3J0JTIwZGVsaGl8ZW58MXx8fHwxNzYyMTY3ODMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    coordinates: { x: 50, y: 39 },
    transport: [
      { type: "flight", available: true, details: "IGI Airport Delhi", nearestHub: "22 km from Red Fort" },
      { type: "train", available: true, details: "New Delhi Railway Station", nearestHub: "4 km away" },
      { type: "bus", available: true, details: "DTC buses, metro bus service", nearestHub: "Multiple routes available" },
      { type: "auto", available: true, details: "Metro: Lal Qila Station (Violet Line)", nearestHub: "Direct metro access" }
    ],
    bestTimeToVisit: "October to March",
    entryFee: "\u20B935 for Indians, \u20B9500 for foreigners",
    timings: "9:30 AM - 4:30 PM (Closed on Mondays)"
  },
  {
    id: 3,
    name: "Qutub Minar",
    location: "Delhi",
    state: "Delhi",
    description: "A towering 73-meter tall minaret built of red sandstone and marble. It's the tallest brick minaret in the world and an outstanding example of Indo-Islamic architecture.",
    detailedInfo: "Qutub Minar is a soaring 73-meter (240 feet) tower of victory that began construction in 1192 under Qutb-ud-din Aibak, the first Muslim ruler of Delhi. The tower has five distinct stories, each marked by a projecting balcony with intricate carvings and verses from the Quran. The first three stories are made of red sandstone while the fourth and fifth stories are of marble and sandstone. The tapering tower has a base diameter of 14.3 meters which reduces to 2.7 meters at the top. The complex also includes the famous Iron Pillar of Delhi (4th century CE) which has never rusted, the Quwwat-ul-Islam Mosque, and several other historically significant structures. The site represents the beginning of Muslim rule in India and showcases the synthesis of Hindu and Islamic architectural elements.",
    yearBuilt: "1192-1220",
    unescoCite: true,
    imageUrl: "https://images.unsplash.com/photo-1667849521021-86eec155bfac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdXR1YiUyMG1pbmFyJTIwZGVsaGl8ZW58MXx8fHwxNzYyMjcxODAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    coordinates: { x: 50, y: 40 },
    transport: [
      { type: "flight", available: true, details: "IGI Airport Delhi", nearestHub: "15 km from Qutub Minar" },
      { type: "train", available: true, details: "Nearest: Hazrat Nizamuddin", nearestHub: "15 km away" },
      { type: "bus", available: true, details: "DTC bus routes available", nearestHub: "Bus stop nearby" },
      { type: "auto", available: true, details: "Metro: Qutub Minar Station (Yellow Line)", nearestHub: "Walking distance from metro" }
    ],
    bestTimeToVisit: "October to March",
    entryFee: "\u20B935 for Indians, \u20B9500 for foreigners",
    timings: "7:00 AM - 5:00 PM (Open all days)"
  },
  {
    id: 4,
    name: "Hawa Mahal",
    location: "Jaipur",
    state: "Rajasthan",
    description: "The 'Palace of Winds' features a stunning five-story facade with 953 small windows called jharokhas. It was built to allow royal women to observe street festivals while remaining unseen.",
    detailedInfo: "Hawa Mahal, or the Palace of Winds, is an architectural marvel built in 1799 by Maharaja Sawai Pratap Singh. The unique five-story structure features 953 intricately carved jharokhas (small windows) made from red and pink sandstone. Designed by architect Lal Chand Ustad in the form of Krishna's crown, the palace was constructed to allow royal women to observe everyday life and festivals on the street below while maintaining purdah (face cover). The honeycomb design allows cool air to ventilate through the palace, keeping it cool during hot summers - hence the name 'Palace of Winds'. Despite its grand facade, the palace has no stairs but rather a series of ramps leading to the upper floors. The palace offers stunning views of the City Palace, Jantar Mantar, and the bustling markets of Jaipur.",
    yearBuilt: "1799",
    imageUrl: "https://images.unsplash.com/photo-1650530777057-3a7dbc24bf6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXdhJTIwbWFoYWwlMjBqYWlwdXJ8ZW58MXx8fHwxNzYyMTY3ODMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    coordinates: { x: 46, y: 43 },
    transport: [
      { type: "flight", available: true, details: "Jaipur International Airport", nearestHub: "12 km from city center" },
      { type: "train", available: true, details: "Jaipur Railway Station", nearestHub: "3 km from Hawa Mahal" },
      { type: "bus", available: true, details: "Rajasthan Roadways buses", nearestHub: "Sindhi Camp Bus Stand, 2 km" },
      { type: "auto", available: true, details: "Auto-rickshaws, taxis, app cabs", nearestHub: "Widely available" }
    ],
    bestTimeToVisit: "November to February",
    entryFee: "\u20B950 for Indians, \u20B9200 for foreigners",
    timings: "9:00 AM - 5:00 PM (Open all days)"
  },
  {
    id: 5,
    name: "Amber Fort",
    location: "Jaipur",
    state: "Rajasthan",
    description: "A magnificent hilltop fort palace complex known for its artistic Hindu elements and breathtaking views. Built with red sandstone and marble, it showcases a blend of Mughal and Rajput architecture.",
    detailedInfo: "Amber Fort, also known as Amer Fort, sits majestically on a hilltop overlooking Maota Lake. Built in 1592 by Raja Man Singh I, the fort served as the capital of the Kachwaha Rajputs for several centuries. The fort is divided into four main sections, each with its own courtyard. Key attractions include the Sheesh Mahal (Mirror Palace) where a single candle can illuminate the entire chamber through thousands of tiny mirrors, Diwan-i-Aam (Hall of Public Audience), Diwan-i-Khas (Hall of Private Audience), and the stunning Ganesh Pol gateway adorned with frescoes and mosaics. Visitors can reach the fort on elephant back, following an ancient tradition. The fort is part of a UNESCO World Heritage Site along with five other forts of Rajasthan. The sound and light show in the evening brings the fort's history to life.",
    yearBuilt: "1592",
    unescoCite: true,
    imageUrl: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWJlciUyMGZvcnQlMjBqYWlwdXJ8ZW58MXx8fHwxNzYyMTc5NTc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    coordinates: { x: 46, y: 42 },
    transport: [
      { type: "flight", available: true, details: "Jaipur International Airport", nearestHub: "25 km from Amber Fort" },
      { type: "train", available: true, details: "Jaipur Railway Station", nearestHub: "11 km from fort" },
      { type: "bus", available: true, details: "Local buses to Amber", nearestHub: "30 min from city center" },
      { type: "auto", available: true, details: "Taxis, autos, elephant rides", nearestHub: "Available at fort entrance" }
    ],
    bestTimeToVisit: "October to March",
    entryFee: "\u20B9100 for Indians, \u20B9500 for foreigners",
    timings: "8:00 AM - 5:30 PM (Open all days)"
  },
  {
    id: 6,
    name: "Gateway of India",
    location: "Mumbai",
    state: "Maharashtra",
    description: "An iconic arch-monument built during the British Raj to commemorate the landing of King George V and Queen Mary. It has become a symbol of Mumbai and India's maritime history.",
    detailedInfo: "The Gateway of India is Mumbai's most iconic monument, standing at the waterfront in Apollo Bunder. Built in 1924, it was constructed to commemorate the visit of King George V and Queen Mary to Mumbai in 1911. Designed by Scottish architect George Wittet, the structure combines Hindu and Muslim architectural styles with a central dome 26 meters in diameter. The monument is built from yellow basalt and reinforced concrete in Indo-Saracenic style. Ironically, the last British troops to leave India after independence marched through this gateway in 1948, symbolizing the end of British rule. Today, it serves as the starting point for most tourists exploring Mumbai and offers stunning views of the Arabian Sea. The nearby Taj Mahal Palace Hotel adds to the grandeur of the location. Boat rides to Elephanta Caves depart from here.",
    yearBuilt: "1924",
    imageUrl: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXRld2F5JTIwb2YlMjBpbmRpYSUyMG11bWJhaXxlbnwxfHx8fDE3NjIxNzQ0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    coordinates: { x: 42, y: 55 },
    transport: [
      { type: "flight", available: true, details: "Chhatrapati Shivaji Maharaj International Airport", nearestHub: "30 km from Gateway" },
      { type: "train", available: true, details: "Chhatrapati Shivaji Terminus", nearestHub: "4 km from Gateway" },
      { type: "bus", available: true, details: "BEST buses throughout Mumbai", nearestHub: "Multiple routes available" },
      { type: "auto", available: true, details: "Local trains, taxis, auto-rickshaws", nearestHub: "Churchgate Station nearby" }
    ],
    bestTimeToVisit: "November to February",
    entryFee: "Free entry",
    timings: "Open 24/7"
  },
  {
    id: 7,
    name: "Ajanta Caves",
    location: "Aurangabad",
    state: "Maharashtra",
    description: "Ancient Buddhist cave monuments featuring rock-cut caves dating from 2nd century BCE. Famous for their exquisite paintings and sculptures that depict Buddhist religious art.",
    detailedInfo: "The Ajanta Caves are a collection of 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE. Discovered accidentally in 1819 by a British officer during a hunting party, these caves remained hidden for nearly 1300 years. The caves contain some of the finest surviving examples of ancient Indian art, particularly expressive paintings depicting the Jataka tales (stories of Buddha's previous lives). The caves are divided into two phases: the earlier Hinayana phase (2nd century BCE to 1st century CE) and the later Mahayana phase (5th century CE). Cave 1 contains the famous Padmapani (lotus-bearing) Bodhisattva painting. The sophistication of the paintings, with their use of perspective, shading, and vibrant mineral colors that have lasted for over 1500 years, demonstrates the high level of artistic achievement in ancient India.",
    yearBuilt: "2nd Century BCE",
    unescoCite: true,
    imageUrl: "https://images.unsplash.com/photo-1626331915556-c4f817fbcc5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhamFudGElMjBjYXZlcyUyMG1haGFyYXNodHJhfGVufDF8fHx8MTc2MjI3MTgwNHww&ixlib=rb-4.1.0&q=80&w=1080",
    coordinates: { x: 45, y: 53 },
    transport: [
      { type: "flight", available: true, details: "Aurangabad Airport", nearestHub: "100 km from Ajanta Caves" },
      { type: "train", available: true, details: "Jalgaon Railway Station", nearestHub: "60 km from caves" },
      { type: "bus", available: true, details: "Maharashtra State Transport buses", nearestHub: "Regular buses from Aurangabad" },
      { type: "auto", available: false, details: "Hire taxi/cab from Aurangabad", nearestHub: "2 hour drive required" }
    ],
    bestTimeToVisit: "November to March",
    entryFee: "\u20B940 for Indians, \u20B9600 for foreigners",
    timings: "9:00 AM - 5:30 PM (Closed on Mondays)"
  },
  {
    id: 8,
    name: "Ellora Caves",
    location: "Aurangabad",
    state: "Maharashtra",
    description: "A remarkable archaeological site featuring 34 monasteries and temples carved into the mountainside. It represents Hindu, Buddhist, and Jain monuments built between 600-1000 CE.",
    detailedInfo: "Ellora is a unique archaeological site featuring 34 caves representing three different religions - Buddhism, Hinduism, and Jainism - all carved adjacent to each other, symbolizing the religious harmony prevalent during this period. The caves were built between 600-1000 CE. The centerpiece is Cave 16, the magnificent Kailasa temple, the largest single monolithic rock excavation in the world. This massive structure was carved from top to bottom out of a single rock and is dedicated to Lord Shiva. It's estimated that 200,000 tons of rock were excavated over 150 years to create this architectural marvel. The Hindu caves (13-29) contain some of the finest rock-cut sculptures depicting various deities. The Buddhist caves (1-12) include monasteries and prayer halls, while the Jain caves (30-34) showcase detailed carvings of Jain tirthankaras. The site demonstrates the evolution of Indian rock-cut architecture.",
    yearBuilt: "600-1000 CE",
    unescoCite: true,
    imageUrl: "https://images.unsplash.com/photo-1709739322415-87135f0d34bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGxvcmElMjBjYXZlcyUyMG1haGFyYXNodHJhfGVufDF8fHx8MTc2MjI3MTgwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    coordinates: { x: 45, y: 54 },
    transport: [
      { type: "flight", available: true, details: "Aurangabad Airport", nearestHub: "30 km from Ellora" },
      { type: "train", available: true, details: "Aurangabad Railway Station", nearestHub: "30 km from caves" },
      { type: "bus", available: true, details: "State transport buses", nearestHub: "Regular service from Aurangabad" },
      { type: "auto", available: true, details: "Taxis and autos from city", nearestHub: "45 min drive from Aurangabad" }
    ],
    bestTimeToVisit: "November to March",
    entryFee: "\u20B940 for Indians, \u20B9600 for foreigners",
    timings: "6:00 AM - 6:00 PM (Closed on Tuesdays)"
  },
  {
    id: 9,
    name: "Golden Temple",
    location: "Amritsar",
    state: "Punjab",
    description: "The holiest Gurdwara of Sikhism, also known as Harmandir Sahib. Its stunning golden facade and serene sarovar (holy pool) attract millions of pilgrims and visitors annually.",
    detailedInfo: "The Golden Temple, or Harmandir Sahib, is the holiest shrine in Sikhism. The foundation was laid by Guru Ramdas Ji in 1577, and the temple was completed in 1604 by Guru Arjan Dev Ji. The temple gets its name from its breathtaking gold-plated exterior, which was added in the early 19th century by Maharaja Ranjit Singh. The temple sits in the middle of a sacred pool (Amrit Sarovar) and is accessible via a causeway. Unlike most religious places, the Golden Temple has four entrances, symbolizing that people from all walks of life are welcome. The temple houses the Guru Granth Sahib (holy scripture) and operates the world's largest free community kitchen (langar), serving over 100,000 people daily regardless of religion, caste, or creed. The reflection of the golden structure in the pool creates a mesmerizing sight, especially during sunrise and sunset. The temple complex never closes and welcomes visitors 24/7.",
    yearBuilt: "1604",
    imageUrl: "https://images.unsplash.com/photo-1623059508779-2542c6e83753?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjB0ZW1wbGUlMjBhbXJpdHNhcnxlbnwxfHx8fDE3NjIyNDAyODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    coordinates: { x: 45, y: 33 },
    transport: [
      { type: "flight", available: true, details: "Sri Guru Ram Dass Jee International Airport", nearestHub: "11 km from Golden Temple" },
      { type: "train", available: true, details: "Amritsar Junction Railway Station", nearestHub: "2 km from temple" },
      { type: "bus", available: true, details: "Punjab Roadways buses", nearestHub: "Regular buses from major cities" },
      { type: "auto", available: true, details: "Auto-rickshaws, cycle-rickshaws", nearestHub: "Walking distance from station" }
    ],
    bestTimeToVisit: "November to March",
    entryFee: "Free entry",
    timings: "Open 24/7"
  },
  {
    id: 10,
    name: "Mysore Palace",
    location: "Mysore",
    state: "Karnataka",
    description: "A historical palace and royal residence featuring Indo-Saracenic architecture. Known for its grand Durbar Hall and illumination of 100,000 light bulbs during festivals.",
    detailedInfo: "Mysore Palace, officially known as Amba Vilas Palace, is a magnificent example of Indo-Saracenic architecture and the official residence of the Wadiyar dynasty. The current structure, completed in 1912, is the fourth palace built on this site. The previous palace was destroyed by fire in 1897. Designed by British architect Henry Irwin, the palace blends Hindu, Muslim, Rajput, and Gothic styles. The palace features carved wooden doors, mosaic floors, stained glass ceilings, and intricately designed pillars. The main attraction is the ornate Durbar Hall with its sculpted pillars and a magnificent ceiling decorated with elaborate paintings. The palace houses a vast collection of paintings, jewelry, royal costumes, and artifacts. Every Sunday evening and during the 10-day Dasara festival, the palace is illuminated with nearly 100,000 light bulbs, creating a spectacular sight. It's one of India's most visited tourist attractions.",
    yearBuilt: "1912",
    imageUrl: "https://images.unsplash.com/photo-1662904262200-0ad31952df8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXNvcmUlMjBwYWxhY2UlMjBpbmRpYXxlbnwxfHx8fDE3NjIyNjIxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    coordinates: { x: 47, y: 70 },
    transport: [
      { type: "flight", available: true, details: "Mysore Airport (limited flights)", nearestHub: "Bangalore Airport 170 km" },
      { type: "train", available: true, details: "Mysore Railway Station", nearestHub: "2 km from palace" },
      { type: "bus", available: true, details: "Karnataka State Road Transport", nearestHub: "Excellent bus connectivity" },
      { type: "auto", available: true, details: "Auto-rickshaws, app cabs", nearestHub: "Widely available in city" }
    ],
    bestTimeToVisit: "October to February (Dasara festival in September/October)",
    entryFee: "\u20B970 for Indians, \u20B9200 for foreigners",
    timings: "10:00 AM - 5:30 PM (Open all days)"
  },
  {
    id: 11,
    name: "Hampi",
    location: "Hampi",
    state: "Karnataka",
    description: "The ruins of Vijayanagara Empire featuring magnificent temples, royal structures, and ancient market streets. This UNESCO site showcases the grandeur of medieval Hindu architecture.",
    detailedInfo: "Hampi, the former capital of the Vijayanagara Empire (1336-1565 CE), is one of India's largest and most fascinating archaeological sites, spanning over 4,100 hectares. At its peak in the 16th century, Hampi was one of the richest and largest cities in the world, with a population exceeding 500,000. The city was described by travelers as magnificent, surpassing even Rome. The site contains over 1,600 surviving monuments including temples, palaces, royal pavilions, bastions, treasury buildings, and water structures. Key attractions include the Virupaksha Temple (still an active place of worship), the iconic Stone Chariot at Vittala Temple, the stepped Pushkarani (stepped water tank), the elephant stables, and the Lotus Mahal. The entire landscape is dotted with massive boulders and ruins that create a surreal atmosphere. The site was devastated by Muslim sultanates in 1565 but remains an architectural marvel showcasing Dravidian temple architecture.",
    yearBuilt: "14th Century",
    unescoCite: true,
    imageUrl: "https://images.unsplash.com/photo-1631986683754-7d511e03864d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1waSUyMHJ1aW5zJTIwa2FybmF0YWthfGVufDF8fHx8MTc2MjI3MTgwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    coordinates: { x: 47, y: 65 },
    transport: [
      { type: "flight", available: true, details: "Nearest airports: Hubli (144 km), Belgaum (190 km)", nearestHub: "Bangalore 350 km" },
      { type: "train", available: true, details: "Hospet Railway Station", nearestHub: "13 km from Hampi" },
      { type: "bus", available: true, details: "Buses from Hospet, Bangalore, Goa", nearestHub: "Regular overnight buses" },
      { type: "auto", available: true, details: "Auto-rickshaws, rented bikes/scooters", nearestHub: "Popular way to explore ruins" }
    ],
    bestTimeToVisit: "October to February (Hampi Festival in November)",
    entryFee: "\u20B940 for Indians, \u20B9600 for foreigners (per monument)",
    timings: "6:00 AM - 6:00 PM (Open all days)"
  },
  {
    id: 12,
    name: "Konark Sun Temple",
    location: "Konark",
    state: "Odisha",
    description: "A 13th-century temple dedicated to the Sun god, designed as a massive chariot with 24 wheels. It's renowned for its intricate stone carvings and architectural brilliance.",
    detailedInfo: "The Konark Sun Temple, built in the 13th century (1250 CE) by King Narasimhadeva I of the Eastern Ganga Dynasty, is a monumental representation of the Sun God Surya's chariot. The temple is designed as a massive 100-foot high chariot with 24 elaborately carved stone wheels (each about 12 feet in diameter) pulled by seven horses. The wheels are not just decorative - they function as sundials, accurately calculating time to the minute based on the shadow cast by spokes. The temple's walls are covered with exquisite carvings depicting gods, celestial beings, animals, musicians, dancers, and scenes from daily life, showcasing the pinnacle of Kalinga architecture. The erotic sculptures rival those of Khajuraho. Originally, the temple had a 229-foot high main sanctuary, but it collapsed in the 19th century. The temple was designed so that the first rays of the sun would illuminate the main deity. The name Konark derives from 'Kona' (corner) and 'Arka' (sun), literally meaning 'Sun of the Corner'.",
    yearBuilt: "1250",
    unescoCite: true,
    imageUrl: "https://images.unsplash.com/photo-1677211352662-30e7775c7ce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb25hcmslMjBzdW4lMjB0ZW1wbGV8ZW58MXx8fHwxNzYyMjcxODA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    coordinates: { x: 60, y: 52 },
    transport: [
      { type: "flight", available: true, details: "Biju Patnaik International Airport, Bhubaneswar", nearestHub: "65 km from Konark" },
      { type: "train", available: true, details: "Puri Railway Station", nearestHub: "35 km from temple" },
      { type: "bus", available: true, details: "State transport buses from Puri, Bhubaneswar", nearestHub: "Regular bus service" },
      { type: "auto", available: true, details: "Taxis, auto-rickshaws from Puri", nearestHub: "1 hour drive from Puri" }
    ],
    bestTimeToVisit: "October to March (Konark Dance Festival in December)",
    entryFee: "\u20B940 for Indians, \u20B9600 for foreigners",
    timings: "6:00 AM - 8:00 PM (Open all days)"
  },
  {
    id: 13,
    name: "Charminar",
    location: "Hyderabad",
    state: "Telangana",
    description: "An iconic monument and mosque built in 1591, featuring four grand arches facing the cardinal directions. It has become the global symbol of Hyderabad and its rich cultural heritage.",
    detailedInfo: "Charminar, meaning 'Four Minarets', is the most iconic symbol of Hyderabad, built in 1591 by Muhammad Quli Qutb Shah, the fifth ruler of the Qutb Shahi dynasty. Legend states it was built either to commemorate the end of a deadly plague or to mark the spot where the Sultan first glimpsed his future queen, Bhagmati (after whom the city was originally named Bhagnagar before being renamed Hyderabad). The monument stands 56 meters tall and 30 meters wide, with four grand arches facing the four cardinal directions. Each of the four corners has a minaret that rises to 48.7 meters, featuring a spiral staircase of 149 steps. The top floor houses a mosque, making it one of the oldest mosques in Hyderabad still in use. The structure showcases Indo-Islamic architecture with Persian influences. The monument stands at the heart of the old city, surrounded by the famous Laad Bazaar known for traditional bangles and pearls.",
    yearBuilt: "1591",
    imageUrl: "https://images.unsplash.com/photo-1648644719956-2594a709a512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFybWluYXIlMjBoeWRlcmFiYWQlMjBpbmRpYXxlbnwxfHx8fDE3NjIyNzE4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    coordinates: { x: 49, y: 58 },
    transport: [
      { type: "flight", available: true, details: "Rajiv Gandhi International Airport", nearestHub: "25 km from Charminar" },
      { type: "train", available: true, details: "Hyderabad Deccan Station (Nampally)", nearestHub: "3 km from monument" },
      { type: "bus", available: true, details: "TSRTC city buses", nearestHub: "Multiple routes available" },
      { type: "auto", available: true, details: "Metro, autos, app cabs", nearestHub: "Charminar Metro Station" }
    ],
    bestTimeToVisit: "October to March",
    entryFee: "\u20B925 for Indians, \u20B9300 for foreigners",
    timings: "9:00 AM - 5:30 PM (Open all days)"
  },
  {
    id: 14,
    name: "Victoria Memorial",
    location: "Kolkata",
    state: "West Bengal",
    description: "A majestic marble building dedicated to Queen Victoria, combining British and Mughal architectural elements. It now serves as a museum showcasing India's colonial history.",
    detailedInfo: "Victoria Memorial is a magnificent white marble monument dedicated to Queen Victoria, Empress of India. Conceived by Lord Curzon, then Viceroy of India, after Victoria's death in 1901, the foundation was laid in 1906 and the building was completed in 1921. Designed by British architect William Emerson, the monument blends British, Mughal, and Indian architectural styles. The structure stands 184 feet high and is crowned by a 16-foot tall bronze statue of the Angel of Victory that rotates with the wind. The memorial sits in 64 acres of landscaped gardens featuring ornamental plants, trees, and a large pond. Today it functions as a museum housing an extensive collection of artifacts from the Victorian era, including paintings, sculptures, weapons, coins, and rare books. The galleries contain over 28,000 artifacts including paintings by European and Indian artists. The evening sound and light show depicts Kolkata's history from its founding to India's independence. The memorial's reflection in the pond during sunset creates a breathtaking view.",
    yearBuilt: "1921",
    imageUrl: "https://images.unsplash.com/photo-1697817665440-f988c6d5080f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWN0b3JpYSUyMG1lbW9yaWFsJTIwa29sa2F0YXxlbnwxfHx8fDE3NjIyNzE4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    coordinates: { x: 62, y: 45 },
    transport: [
      { type: "flight", available: true, details: "Netaji Subhas Chandra Bose International Airport", nearestHub: "20 km from memorial" },
      { type: "train", available: true, details: "Howrah and Sealdah Railway Stations", nearestHub: "4-5 km away" },
      { type: "bus", available: true, details: "Kolkata city buses", nearestHub: "Excellent bus connectivity" },
      { type: "auto", available: true, details: "Metro, trams, taxis, app cabs", nearestHub: "Maidan Metro Station 1 km" }
    ],
    bestTimeToVisit: "October to March",
    entryFee: "\u20B930 for Indians, \u20B9500 for foreigners",
    timings: "10:00 AM - 5:00 PM (Closed on Mondays)"
  },
  {
    id: 15,
    name: "Khajuraho Temples",
    location: "Khajuraho",
    state: "Madhya Pradesh",
    description: "A group of Hindu and Jain temples famous for their nagara-style architectural symbolism and erotic sculptures. These temples represent the artistic peak of medieval Indian architecture.",
    detailedInfo: "The Khajuraho Group of Monuments consists of Hindu and Jain temples built by the Chandela dynasty between 950-1050 CE. Originally there were 85 temples spread over 20 square kilometers; today only about 25 survive in a good state of preservation. These temples are famous for their nagara-style architectural symbolism and their erotic sculptures, which represent only about 10% of the carvings - the rest depict gods, goddesses, warriors, musicians, and scenes from daily life. The temples follow the architectural principle of depicting all aspects of human life, including kama (desire) which is considered one of the four goals of life in Hinduism. The most famous temple is Kandariya Mahadeva, dedicated to Lord Shiva, featuring 872 statues on its exterior. The temples were lost to the world for centuries, hidden by dense forests, until rediscovered by British engineer T.S. Burt in 1838. The sculptures demonstrate extraordinary craftsmanship with intricate details. The site represents the pinnacle of temple architecture in Central India and showcases the Chandela dynasty's artistic achievements.",
    yearBuilt: "950-1050 CE",
    unescoCite: true,
    imageUrl: "https://images.unsplash.com/photo-1681181753651-315b07b2b2de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraGFqdXJhaG8lMjB0ZW1wbGUlMjBpbmRpYXxlbnwxfHx8fDE3NjIyNjYxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    coordinates: { x: 50, y: 47 },
    transport: [
      { type: "flight", available: true, details: "Khajuraho Airport", nearestHub: "5 km from temples" },
      { type: "train", available: true, details: "Khajuraho Railway Station", nearestHub: "5 km from temple complex" },
      { type: "bus", available: true, details: "MP State Transport buses", nearestHub: "Buses from major cities" },
      { type: "auto", available: true, details: "Auto-rickshaws, cycle-rickshaws, taxis", nearestHub: "Easily accessible" }
    ],
    bestTimeToVisit: "October to February (Dance Festival in February)",
    entryFee: "\u20B940 for Indians, \u20B9600 for foreigners",
    timings: "Sunrise to Sunset (Open all days)"
  }
];
function PlacesGallery({ onSelectPlace }) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    if (onSelectPlace) {
      onSelectPlace(place);
    }
  };
  const getTransportIcon = (type) => {
    switch (type) {
      case "flight":
        return /* @__PURE__ */ jsx(Plane, { className: "w-4 h-4" });
      case "train":
        return /* @__PURE__ */ jsx(Train, { className: "w-4 h-4" });
      case "bus":
        return /* @__PURE__ */ jsx(Bus, { className: "w-4 h-4" });
      case "auto":
        return /* @__PURE__ */ jsx(Car, { className: "w-4 h-4" });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: places.map((place) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "overflow-hidden cursor-pointer group bg-slate-900/50 border-2 border-amber-400 rounded-2xl shadow-xl",
        onClick: () => handlePlaceClick(place),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative h-48 overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              ImageWithFallback,
              {
                src: place.imageUrl,
                alt: place.name,
                className: "w-full h-full object-cover transition-transform duration-300"
              }
            ),
            place.unescoCite && /* @__PURE__ */ jsx(Badge, { className: "absolute top-3 right-3 bg-blue-600", children: "UNESCO Site" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-1", children: place.name }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center text-gray-600 mb-2 gap-1", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
                place.location,
                ", ",
                place.state
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-3 line-clamp-2", children: place.description }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500", children: [
                "Built: ",
                place.yearBuilt
              ] }),
              /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", className: "gap-1", children: [
                /* @__PURE__ */ jsx(Info, { className: "w-4 h-4" }),
                "Details"
              ] })
            ] })
          ] })
        ]
      },
      place.id
    )) }),
    /* @__PURE__ */ jsx(Dialog, { open: !!selectedPlace, onOpenChange: () => setSelectedPlace(null), children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: selectedPlace && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2 text-2xl", children: [
          selectedPlace.name,
          selectedPlace.unescoCite && /* @__PURE__ */ jsx(Badge, { className: "bg-blue-600", children: "UNESCO World Heritage Site" })
        ] }),
        /* @__PURE__ */ jsxs(DialogDescription, { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4" }),
          selectedPlace.location,
          ", ",
          selectedPlace.state
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Tabs, { defaultValue: "overview", className: "w-full", children: [
        /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [
          /* @__PURE__ */ jsx(TabsTrigger, { value: "overview", children: "Overview" }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "details", children: "Detailed Info" }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "transport", children: "How to Reach" })
        ] }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "overview", className: "space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "relative h-64 rounded-lg overflow-hidden", children: /* @__PURE__ */ jsx(
            ImageWithFallback,
            {
              src: selectedPlace.imageUrl,
              alt: selectedPlace.name,
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h4", { className: "mb-2", children: [
              "About ",
              selectedPlace.name
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: selectedPlace.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-3 rounded-lg", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Year Built" }),
              /* @__PURE__ */ jsx("p", { children: selectedPlace.yearBuilt })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-purple-50 p-3 rounded-lg", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Best Time" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: selectedPlace.bestTimeToVisit })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-green-50 p-3 rounded-lg", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Entry Fee" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: selectedPlace.entryFee })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-orange-50 p-4 rounded-lg", children: [
            /* @__PURE__ */ jsx("h4", { className: "mb-2 text-sm", children: "Visiting Hours" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700", children: selectedPlace.timings })
          ] })
        ] }),
        /* @__PURE__ */ jsx(TabsContent, { value: "details", className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "prose prose-sm max-w-none", children: [
          /* @__PURE__ */ jsx("h4", { className: "mb-3", children: "Detailed History & Information" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed whitespace-pre-line", children: selectedPlace.detailedInfo })
        ] }) }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "transport", className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "mb-4", children: "Transportation Options" }),
            /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: selectedPlace.transport.map((option, index) => /* @__PURE__ */ jsx(
              "div",
              {
                className: `p-4 rounded-lg border-2 ${option.available ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 opacity-60"}`,
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: `p-2 rounded-lg ${option.available ? "bg-green-100" : "bg-gray-200"}`, children: getTransportIcon(option.type) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                      /* @__PURE__ */ jsx("h4", { className: "capitalize", children: option.type }),
                      /* @__PURE__ */ jsx(Badge, { variant: option.available ? "default" : "secondary", className: "text-xs", children: option.available ? "Available" : "Not Available" })
                    ] }),
                    option.available && /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 mb-1", children: option.details }),
                      option.nearestHub && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-600", children: [
                        /* @__PURE__ */ jsx(MapPin, { className: "w-3 h-3 inline mr-1" }),
                        option.nearestHub
                      ] })
                    ] }),
                    !option.available && option.details && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: option.details })
                  ] })
                ] })
              },
              index
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-4 rounded-lg border border-blue-200", children: [
            /* @__PURE__ */ jsxs("h4", { className: "mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Info, { className: "w-4 h-4" }),
              "Travel Tips"
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "text-sm text-gray-700 space-y-1 list-disc list-inside", children: [
              /* @__PURE__ */ jsx("li", { children: "Book tickets in advance during peak season" }),
              /* @__PURE__ */ jsx("li", { children: "Wear comfortable walking shoes" }),
              /* @__PURE__ */ jsx("li", { children: "Carry water and sun protection" }),
              /* @__PURE__ */ jsx("li", { children: "Respect local customs and dress codes" }),
              /* @__PURE__ */ jsx("li", { children: "Photography may have additional charges" })
            ] })
          ] })
        ] })
      ] })
    ] }) }) })
  ] });
}
export {
  PlacesGallery,
  places
};
