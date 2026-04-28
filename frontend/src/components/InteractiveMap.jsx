import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Navigation, Plane, Train, Bus, Car, ZoomIn, ZoomOut, Info } from "lucide-react";
import { places } from "./PlacesGallery";
import { ImageWithFallback } from "./figma/ImageWithFallback";
function InteractiveMap({ selectedPlace, onPlaceSelect }) {
  const [hoveredPlace, setHoveredPlace] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const getTransportIcon = (type) => {
    switch (type) {
      case "flight":
        return /* @__PURE__ */ jsx(Plane, { className: "w-3 h-3" });
      case "train":
        return /* @__PURE__ */ jsx(Train, { className: "w-3 h-3" });
      case "bus":
        return /* @__PURE__ */ jsx(Bus, { className: "w-3 h-3" });
      case "auto":
        return /* @__PURE__ */ jsx(Car, { className: "w-3 h-3" });
      default:
        return null;
    }
  };
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2));
  };
  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.8));
  };
  return /* @__PURE__ */ jsxs(Card, { className: "w-full", children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Navigation, { className: "w-5 h-5" }),
        "Interactive Gallery Map of India"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: handleZoomOut, children: /* @__PURE__ */ jsx(ZoomOut, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: handleZoomIn, children: /* @__PURE__ */ jsx(ZoomIn, { className: "w-4 h-4" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-full aspect-[3/4] rounded-lg border-2 border-gray-300 overflow-hidden shadow-lg", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute inset-0 w-full h-full",
            style: {
              transform: `scale(${zoomLevel})`,
              transition: "transform 0.3s ease",
              transformOrigin: "center center"
            },
            children: [
              /* @__PURE__ */ jsx(
                ImageWithFallback,
                {
                  src: "https://images.unsplash.com/photo-1546833998-07256bcc76ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMG1hcCUyMGdlb2dyYXBoaWNhbHxlbnwxfHx8fDE3NjIyNzMxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
                  alt: "India Map",
                  className: "w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white/20" })
            ]
          }
        ),
        selectedPlace && /* @__PURE__ */ jsx(
          "svg",
          {
            viewBox: "0 0 100 120",
            className: "absolute inset-0 w-full h-full pointer-events-none",
            preserveAspectRatio: "xMidYMid meet",
            style: {
              transform: `scale(${zoomLevel})`,
              transition: "transform 0.3s ease",
              transformOrigin: "center center",
              zIndex: 5
            },
            children: places.map((place) => {
              if (place.id === selectedPlace.id) return null;
              const distance = Math.sqrt(
                Math.pow(place.coordinates.x - selectedPlace.coordinates.x, 2) + Math.pow(place.coordinates.y - selectedPlace.coordinates.y, 2)
              );
              if (distance < 30) {
                return /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx(
                  "line",
                  {
                    x1: selectedPlace.coordinates.x,
                    y1: selectedPlace.coordinates.y,
                    x2: place.coordinates.x,
                    y2: place.coordinates.y,
                    stroke: "#F59E0B",
                    strokeWidth: "0.8",
                    strokeDasharray: "3,3",
                    opacity: "0.8"
                  }
                ) }, `route-${place.id}`);
              }
              return null;
            })
          }
        ),
        places.map((place) => {
          const isSelected = selectedPlace?.id === place.id;
          const isHovered = hoveredPlace?.id === place.id;
          const isActive = isSelected || isHovered;
          return /* @__PURE__ */ jsx(
            "button",
            {
              className: "absolute group transition-all duration-200",
              style: {
                left: `${place.coordinates.x}%`,
                top: `${place.coordinates.y}%`,
                transform: `translate(-50%, -50%) scale(${zoomLevel})`,
                zIndex: isActive ? 30 : 10
              },
              onClick: () => onPlaceSelect?.(place),
              onMouseEnter: () => setHoveredPlace(place),
              onMouseLeave: () => setHoveredPlace(null),
              children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                isSelected && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 w-10 h-10 -translate-x-1 -translate-y-1", children: /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" }) }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `
                      relative w-8 h-8 rounded-full flex items-center justify-center
                      transition-all duration-200 shadow-lg
                      ${isSelected ? "bg-red-600 scale-150 ring-4 ring-red-300 animate-bounce" : isHovered ? "bg-orange-500 scale-125 ring-3 ring-orange-200" : "bg-blue-600 hover:bg-blue-700 hover:scale-110 ring-2 ring-blue-200"}
                    `,
                    children: /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-white" })
                  }
                ),
                place.unescoCite && /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-xs", children: "\u2605" }) }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `
                      absolute bottom-full left-1/2 -translate-x-1/2 mb-3
                      transition-all duration-200 pointer-events-none
                      ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                    `,
                    children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 text-white px-4 py-3 rounded-lg shadow-2xl whitespace-nowrap min-w-[200px]", children: [
                      /* @__PURE__ */ jsx("div", { className: "mb-1", children: place.name }),
                      /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-300 mb-2", children: [
                        /* @__PURE__ */ jsx(MapPin, { className: "w-3 h-3 inline mr-1" }),
                        place.location,
                        ", ",
                        place.state
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center border-t border-gray-700 pt-2", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Transport:" }),
                        place.transport.filter((t) => t.available).map((transport, idx) => /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "bg-gray-800 p-1 rounded",
                            title: transport.type,
                            children: getTransportIcon(transport.type)
                          },
                          idx
                        ))
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-gray-900" })
                    ] })
                  }
                ),
                isSelected && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-full shadow-lg border-2 border-red-500 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: "text-sm", children: place.name }) })
              ] })
            },
            place.id
          );
        }),
        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-gray-200", children: [
          /* @__PURE__ */ jsx("h4", { className: "mb-3 text-sm", children: "Map Legend" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-xs", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(MapPin, { className: "w-3 h-3 text-white" }) }),
              /* @__PURE__ */ jsx("span", { children: "Heritage Site" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-5 h-5 bg-red-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(MapPin, { className: "w-3 h-3 text-white" }) }),
              /* @__PURE__ */ jsx("span", { children: "Selected Site" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-yellow-400 rounded-full border border-white flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-xs", children: "\u2605" }) }),
              /* @__PURE__ */ jsx("span", { children: "UNESCO Site" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-0.5 bg-orange-500 border-dashed border-t-2 border-orange-500" }),
              /* @__PURE__ */ jsx("span", { children: "Route" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-gray-200", children: [
          /* @__PURE__ */ jsx("h4", { className: "mb-3 text-sm", children: "Quick Stats" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-xs", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-4", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Total Sites:" }),
              /* @__PURE__ */ jsx("span", { children: places.length })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-4", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "UNESCO Sites:" }),
              /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: places.filter((p) => p.unescoCite).length })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-4", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "States Covered:" }),
              /* @__PURE__ */ jsx("span", { className: "text-green-600", children: new Set(places.map((p) => p.state)).size })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-gray-200", children: [
          /* @__PURE__ */ jsx("h4", { className: "mb-2 text-xs", children: "Transport" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Plane, { className: "w-3 h-3 text-blue-600" }),
              /* @__PURE__ */ jsx("span", { children: "Flight" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Train, { className: "w-3 h-3 text-green-600" }),
              /* @__PURE__ */ jsx("span", { children: "Train" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Bus, { className: "w-3 h-3 text-orange-600" }),
              /* @__PURE__ */ jsx("span", { children: "Bus" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Car, { className: "w-3 h-3 text-purple-600" }),
              /* @__PURE__ */ jsx("span", { children: "Auto/Taxi" })
            ] })
          ] })
        ] })
      ] }),
      selectedPlace && /* @__PURE__ */ jsxs("div", { className: "mt-6 p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-lg border-2 border-blue-200 shadow-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 rounded-lg overflow-hidden shadow-md", children: /* @__PURE__ */ jsx(
          ImageWithFallback,
          {
            src: selectedPlace.imageUrl,
            alt: selectedPlace.name,
            className: "w-full h-64 object-cover"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between gap-4 mb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsx("h3", { children: selectedPlace.name }),
            selectedPlace.unescoCite && /* @__PURE__ */ jsx(Badge, { className: "bg-blue-600 text-xs", children: "UNESCO World Heritage" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mb-1", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 inline mr-1" }),
            selectedPlace.location,
            ", ",
            selectedPlace.state
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mb-3", children: [
            "Built: ",
            selectedPlace.yearBuilt
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4 p-4 bg-white rounded-lg border border-gray-200", children: [
          /* @__PURE__ */ jsxs("h4", { className: "mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Info, { className: "w-4 h-4" }),
            "About ",
            selectedPlace.name
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 leading-relaxed", children: selectedPlace.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-300 pt-4", children: [
          /* @__PURE__ */ jsxs("h4", { className: "mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Navigation, { className: "w-4 h-4" }),
            "How to Reach"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: selectedPlace.transport.map((transport, idx) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: `p-3 rounded-lg border-2 ${transport.available ? "bg-green-50 border-green-300" : "bg-gray-100 border-gray-300 opacity-50"}`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsx("div", { className: `p-1.5 rounded ${transport.available ? "bg-green-200" : "bg-gray-300"}`, children: getTransportIcon(transport.type) }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm capitalize", children: transport.type })
                ] }),
                /* @__PURE__ */ jsx(
                  Badge,
                  {
                    variant: transport.available ? "default" : "secondary",
                    className: "text-xs",
                    children: transport.available ? "Available" : "N/A"
                  }
                ),
                transport.available && transport.nearestHub && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 mt-1", children: transport.nearestHub })
              ]
            },
            idx
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 border-t border-gray-300 pt-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-3 rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600", children: "Best Time to Visit" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: selectedPlace.bestTimeToVisit })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-3 rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600", children: "Entry Fee" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: selectedPlace.entryFee })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-3 rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600", children: "Timings" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: selectedPlace.timings })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-2 md:grid-cols-5 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl mb-1", children: places.filter((p) => p.state === "Delhi").length }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-600", children: "Delhi" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl mb-1", children: places.filter((p) => p.state === "Rajasthan").length }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-600", children: "Rajasthan" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl mb-1", children: places.filter((p) => p.state === "Maharashtra").length }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-600", children: "Maharashtra" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl mb-1", children: places.filter((p) => p.state === "Karnataka").length }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-600", children: "Karnataka" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border border-pink-200", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl mb-1", children: places.filter((p) => ["Uttar Pradesh", "Punjab", "West Bengal", "Odisha", "Telangana", "Madhya Pradesh"].includes(p.state)).length }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-600", children: "Others" })
        ] })
      ] })
    ] })
  ] });
}
export {
  InteractiveMap
};
